import { NextResponse } from "next/server"
import { auth } from "@/auth"
import connectDB from "@/lib/db"
import { User } from "@/lib/models/auth.model"
import { ObjectId } from "mongodb"

export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 })
    }

    await connectDB()

    // Convert string ID to ObjectId
    const userObjectId = new ObjectId(userId)

    // Log the current user lookup
    console.log("Looking for user with ID:", userId)

    // Get the current user's genres
    const currentUser = await User.findById(userObjectId)
    
    console.log("Current user:", currentUser)

    if (!currentUser) {
      return new NextResponse("User not found", { status: 404 })
    }

    // Log the genres we're matching against
    console.log("Matching genres:", currentUser.musicalGenres)

    // Find users with similar genres using aggregation for better matching
    const similarUsers = await User.aggregate([
      // Exclude current user
      { 
        $match: { 
          _id: { $ne: userObjectId },
          musicalGenres: { $exists: true, $ne: [] }
        } 
      },
      
      // Calculate similarity score
      {
        $addFields: {
          commonGenres: {
            $size: {
              $setIntersection: ["$musicalGenres", currentUser.musicalGenres]
            }
          }
        }
      },
      
      // Only include users with at least one common genre
      { $match: { commonGenres: { $gt: 0 } } },
      
      // Sort by number of common genres
      { $sort: { commonGenres: -1 } },
      
      // Limit results
      { $limit: 20 },
      
      // Project only needed fields
      {
        $project: {
          _id: 1,
          name: 1,
          musicalGenres: 1,
          instagramUsername: 1,
          discordUsername: 1,
          commonGenres: 1
        }
      }
    ])

    // Log the results
    console.log("Found similar users:", similarUsers.length)

    return NextResponse.json(similarUsers)
  } catch (error) {
    console.error("[SIMILAR_USERS]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 