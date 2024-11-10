import {NextResponse} from 'next/server';
import axios from 'axios';

interface Song {
    name: string;
    artist: string;
    url: string;
}

export async function POST(request: Request) {
    try {
        const {mood} = await request.json();

        console.log("Requesting songs for mood:", mood);

        // Call the external API
        const response = await axios.post('http://localhost:3001/get-song', {
            mood: mood
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("API Response:", response.data);

        // Return the songs from the external API
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error fetching songs:", error);
        return NextResponse.json(
            {error: 'Failed to fetch songs'},
            {status: 500}
        );
    }
}
