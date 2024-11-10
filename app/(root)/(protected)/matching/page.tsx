'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { UserCircle } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';

interface User {
  _id: string;
  name: string;
  musicalGenres: string[];
  instagramUsername?: string;
  discordUsername?: string;
}

export default function TeamMatchingPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchSimilarUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `/api/users/similar?userId=${session?.user?._id}`
        );
        setUsers(response.data);
      } catch (err) {
        setError('Failed to load similar users');
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user?._id) {
      fetchSimilarUsers();
    }
  }, [session?.user?._id]);

  if (error) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h1 className="text-3xl font-bold">Team Matching</h1>
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Team Matching</h1>
        <Badge variant="secondary">{users.length} potential matches</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Similar Music Enthusiasts</CardTitle>
          <CardDescription>
            Users who share your musical interests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <UserSkeleton key={i} />
                ))}
              </div>
            ) : users.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No users with similar musical interests found.
              </p>
            ) : (
              <div className="space-y-4">
                {users.map((user) => (
                  <UserCard key={user._id} user={user} />
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

function UserCard({ user }: { user: User }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <UserCircle className="h-12 w-12 text-muted-foreground" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{user.name}</h3>
              <div className="flex gap-2">
                {user.instagramUsername && (
                  <Badge variant="outline">Instagram</Badge>
                )}
                {user.discordUsername && (
                  <Badge variant="outline">Discord</Badge>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {user.musicalGenres.map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function UserSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-5 w-[100px]" />
              <Skeleton className="h-5 w-[80px]" />
              <Skeleton className="h-5 w-[120px]" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
