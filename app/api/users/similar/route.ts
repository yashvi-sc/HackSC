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

    console.log("Current user ID:", session.user._id)

    await connectDB()
    const userObjectId = new ObjectId(session.user._id)

    // Get current user
    const currentUser = await User.findById(userObjectId)
    if (!currentUser) {
      return new NextResponse("User not found", { status: 404 })
    }

    // Find all users except current user
    const similarUsers = await User.aggregate([
      // Exclude current user
      {
        $match: {
          _id: { $ne: userObjectId },
          musicalGenres: { $ifNull: ['$musicalGenres', []] },
        },
      },

      // Add fields for matching (even if not used for filtering)
      // {
      //   $addFields: {
      //     matchingGenres: {
      //       $setIntersection: [
      //         { $ifNull: ["$musicalGenres", []] },
      //         { $ifNull: [currentUser.musicalGenres, []] }
      //       ]
      //     },
      //     totalGenres: {
      //       $size: { $ifNull: ["$musicalGenres", []] }
      //     }
      //   }
      // },

      // Calculate match score (optional for testing)
      // {
      //   $addFields: {
      //     matchScore: {
      //       $multiply: [
      //         {
      //           $divide: [
      //             { $size: "$matchingGenres" },
      //             { $add: ["$totalGenres", 0.1] }
      //           ]
      //         },
      //         100
      //       ]
      //     }
      //   }
      // },

      // Sort by name for consistent ordering
      {
        $sort: {
          name: 1,
        },
      },

      // Project needed fields
      {
        $project: {
          _id: 1,
          name: 1,
          musicalGenres: { $ifNull: ['$musicalGenres', []] },
          // matchingGenres: 1,
          // matchScore: 1,
          instagramUsername: 1,
          discordUsername: 1,
          phoneNumber: 1,
          email: 1, // Added for testing
        },
      },
    ]);

    console.log(`Found ${similarUsers.length} users`)

    // Log some sample data for debugging
    if (similarUsers.length > 0) {
      console.log("Sample user:", {
        name: similarUsers[0].name,
        genres: similarUsers[0].musicalGenres,
        matchingGenres: similarUsers[0].matchingGenres
      })
    }

    return NextResponse.json(similarUsers)
  } catch (error) {
    console.error("[SIMILAR_USERS]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 