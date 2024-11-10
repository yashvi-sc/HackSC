import {NextResponse} from "next/server"
import {auth} from "@/auth"
import connectDB from "@/lib/db"
import {User} from "@/lib/models/auth.model"
import {ObjectId} from "mongodb"

export async function GET(req: Request) {
    try {
        const session = await auth()
        if (!session?.user) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        const searchParams = new URL(req.url).searchParams
        const userId = searchParams.get("userId")
        if (!userId) {
            return new NextResponse("User ID is required", {status: 400})
        }

        await connectDB()
        const userObjectId = new ObjectId(userId)

        // Get current user
        const currentUser = await User.findById(userObjectId)
            .select('name email musicalGenres')
            .lean()

        if (!currentUser) {
            return new NextResponse("User not found", {status: 404})
        }

        console.log("Current user:", currentUser)
        const currentUserGenres = Array.isArray(currentUser.musicalGenres)
            ? currentUser.musicalGenres
            : []

        // Find all users except current user
        const similarUsers = await User.aggregate([
            // Exclude current user
            {
                $match: {
                    _id: {$ne: userObjectId}
                }
            },

            // Add fields for matching
            {
                $addFields: {
                    safeGenres: {
                        $cond: {
                            if: {$isArray: "$musicalGenres"},
                            then: "$musicalGenres",
                            else: []
                        }
                    }
                }
            },

            // Calculate matching genres and counts
            {
                $addFields: {
                    matchingGenres: {
                        $setIntersection: ["$safeGenres", currentUserGenres]
                    },
                    totalGenres: {$size: "$safeGenres"}
                }
            },

            // Calculate match metrics
            {
                $addFields: {
                    matchCount: {$size: "$matchingGenres"},
                    matchScore: {
                        $cond: {
                            if: {$eq: ["$totalGenres", 0]},
                            then: 0,
                            else: {
                                $multiply: [
                                    {
                                        $divide: [
                                            {$size: "$matchingGenres"},
                                            "$totalGenres"
                                        ]
                                    },
                                    100
                                ]
                            }
                        }
                    }
                }
            },

            // Sort by match count and score
            {
                $sort: {
                    matchCount: -1,
                    matchScore: -1,
                    name: 1
                }
            },

            // Project final fields
            {
                $project: {
                    _id: 1,
                    name: 1,
                    musicalGenres: "$safeGenres",
                    matchingGenres: 1,
                    matchCount: 1,
                    matchScore: 1,
                    instagramUsername: 1,
                    discordUsername: 1,
                    phoneNumber: 1,
                    email: 1
                }
            }
        ])

        // Organize users by match status
        const organizedUsers = {
            matching: similarUsers.filter(user => user.matchCount > 0),
            noMatches: similarUsers.filter(user => user.matchCount === 0 && user.musicalGenres.length > 0),
            noGenres: similarUsers.filter(user => user.musicalGenres.length === 0)
        }

        console.log("Found users:", {
            total: similarUsers.length,
            matching: organizedUsers.matching.length,
            noMatches: organizedUsers.noMatches.length,
            noGenres: organizedUsers.noGenres.length
        })

        return NextResponse.json({
            currentUserGenres,
            users: organizedUsers,
            debug: {
                currentUser: {
                    id: currentUser._id,
                    name: currentUser.name,
                    genres: currentUserGenres
                }
            }
        })
    } catch (error) {
        console.error("[SIMILAR_USERS]", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}
