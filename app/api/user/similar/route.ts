import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import connectDB from '@/lib/db';
import { User } from '@/lib/models/auth.model';

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return new NextResponse('User ID is required', { status: 400 });
    }

    await connectDB();

    // Get the current user's genres
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Find users with similar genres
    const similarUsers = await User.find({
      _id: { $ne: userId },
      musicalGenres: { $in: currentUser.musicalGenres },
    })
      .select('name musicalGenres instagramUsername discordUsername')
      .limit(20)
      .lean();

    return NextResponse.json(similarUsers);
  } catch (error) {
    console.error('[SIMILAR_USERS]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
