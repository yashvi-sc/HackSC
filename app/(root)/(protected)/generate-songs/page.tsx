'use client';

import { useState } from 'react';
import styles from './page.module.css';

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
        body: JSON.stringify({ mood }),
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
          How are you feeling today? Let&apos;s find the song that understands
          you❤️
        </h1>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="mood" className="text-lg font-medium">
              Enter your current mood
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

          <button
            onClick={getSongs}
            disabled={isLoading}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:bg-purple-300 transition-colors"
          >
            {isLoading ? 'Loading...' : 'Play my VIBE🎧'}
          </button>

          {error && <p className="text-red-500">{error}</p>}
        </div>

        {songs.length > 0 && (
          <div className="overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4">Songs:</h2>
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left border border-gray-200">
                    Song Name
                  </th>
                  <th className="p-3 text-left border border-gray-200">
                    Artist
                  </th>
                  <th className="p-3 text-left border border-gray-200">
                    Spotify Link
                  </th>
                </tr>
              </thead>
              <tbody>
                {songs.map((song, index) => (
                  <tr key={index}>
                    <td className="p-3 border border-gray-200">{song.name}</td>
                    <td className="p-3 border border-gray-200">
                      {song.artist}
                    </td>
                    <td className="p-3 border border-gray-200">
                      <a
                        href={song.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-800"
                      >
                        Listen on Spotify
                      </a>
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
