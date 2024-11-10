import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/login">
          <Card className="transition-transform duration-300 transform hover:scale-105 shadow-lg">
            <CardContent className="p-6 text-center bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">Card 1</h2>
              <p className="mt-2 text-gray-600">
                This is the description for card 1.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/login">
          <Card className="transition-transform duration-300 transform hover:scale-105 shadow-lg">
            <CardContent className="p-6 text-center bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">Card 2</h2>
              <p className="mt-2 text-gray-600">
                This is the description for card 2.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/login">
          <Card className="transition-transform duration-300 transform hover:scale-105 shadow-lg">
            <CardContent className="p-6 text-center bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">Card 3</h2>
              <p className="mt-2 text-gray-600">
                This is the description for card 3.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
