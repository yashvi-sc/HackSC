'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import Link from 'next/link';

interface Song {
    name: string;
    artist: string;
    url: string;
}

export default function GenerateSongs() {
    const [mood, setMood] = useState<string>('');
    const [songs, setSongs] = useState<Song[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const getSongs = async () => {
        if (!mood.trim()) {
            setError('Please enter a mood');
            return;
        }

        try {
            setIsLoading(true);
            setError('');

            const response = await fetch('/api/get-song', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({mood}),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch songs');
            }

            setSongs(data.songs);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-8 w-full mt-16">
            <main className="mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Let&apos;s find the song that understands you 🎶
                </h1>

                <div className="mb-8 space-y-4">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="mood" className="text-2xl font-bold mb-4">
                            Tell me how you are feeling today
                        </label>
                        <input
                            type="text"
                            id="mood"
                            value={mood}
                            onChange={(e) => setMood(e.target.value)}
                            placeholder="e.g., happy, sad, excited, relaxed"
                            className="p-2 border rounded-md"
                        />
                    </div>

                    <Button
                        variant="default"
                        onClick={getSongs}
                        disabled={isLoading}
                        className="w-full text-white py-2 px-4 rounded-md"
                    >
                        {isLoading ? 'Loading...' : 'Play my VIBE 🎧'}
                    </Button>

                    {error && <p className="text-red-500">{error}</p>}
                </div>

                {songs.length > 0 && (
                    <div className="overflow-x-auto">
                        <h2 className="text-2xl font-bold mb-4">Songs:</h2>
                        <table className="w-full border-collapse border border-gray-200">
                            <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left border border-gray-200 text-lg font-bold">
                                    Song Name
                                </th>
                                <th className="p-3 text-left border border-gray-200 text-lg font-bold">
                                    Artist
                                </th>
                                <th className="p-3 text-left border border-gray-200 text-lg font-bold">
                                    Spotify Link
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white">
                            {songs.map((song, index) => (
                                <tr key={index}>
                                    <td className="p-3 border border-gray-200 text-base">
                                        {song.name}
                                    </td>
                                    <td className="p-3 border border-gray-200 text-base">
                                        {song.artist}
                                    </td>
                                    <td className="p-3 border border-gray-200 text-base">
                                        <Link
                                            href={song.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 hover:text-blue-500 text-blue-700"
                                        >
                                            <svg
                                                role="img"
                                                viewBox="0 0 24 24"
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                                            </svg>
                                            Listen on Spotify
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}
