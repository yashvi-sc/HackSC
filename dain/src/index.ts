import {z} from 'zod';
import axios from 'axios';
import {defineDAINService, ToolConfig} from '@dainprotocol/service-sdk';

const apiToTableConfig: ToolConfig = {
    id: 'spotify-songs-to-table',
    name: 'Spotify Songs to Table',
    description:
        'Fetches Spotify song data from an API and displays it as a table',
    input: z.object({
        mood: z.string().describe('Query string to send to the API'),
    }),
    output: z.object({
        tableData: z.array(
            z.object({
                name: z.string(),
                artist: z.string(),
                url: z.string(),
            })
        ),
    }),
    pricing: {pricePerUse: 0, currency: 'USD'},
    handler: async ({mood}, agentInfo) => {
        console.log(
            `Agent ${agentInfo.id} requested Spotify song data for mood: ${mood}`
        );

        try {
            // Make API request
            const response = await axios.post(
                'http://localhost:3001/get-song',
                {
                    mood: mood,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const songs = response.data.songs; // Access the songs array from the response

            // Prepare table data
            const tableData = {
                columns: [
                    {key: 'name', header: 'Song', type: 'text' as const},
                    {key: 'artist', header: 'Artist', type: 'text' as const},
                    {key: 'url', header: 'Spotify Link', type: 'link' as const},
                ],
                rows: songs.map((song) => ({
                    name: song.name,
                    artist: song.artist,
                    url: {
                        text: 'Open in Spotify',
                        url: song.url,
                    },
                })),
            };

            return {
                text: `Generated table with ${songs.length} Spotify songs`,
                data: {tableData: songs},
                ui: {
                    type: 'table',
                    uiData: JSON.stringify(tableData),
                },
            };
        } catch (error) {
            console.error('Error fetching Spotify song data:', error);
            return {
                text: 'Error occurred while fetching Spotify song data',
                data: {error: error.message},
                ui: {
                    type: 'alert',
                    uiData: JSON.stringify({
                        type: 'error',
                        title: 'API Error',
                        message:
                            'Failed to fetch Spotify song data. Please try again later.',
                    }),
                },
            };
        }
    },
};

const dainService = defineDAINService({
    metadata: {
        title: 'Spotify Songs Table Service',
        description:
            'A service that fetches Spotify song data and displays it as a table',
        version: '1.0.0',
        author: 'HackSC Name',
        tags: ['spotify', 'song', 'table'],
    },
    identity: {
        apiKey: process.env.DAIN_API_KEY,
    },
    tools: [apiToTableConfig],
});

dainService.startNode({port: 2022}).then(() => {
    console.log('Spotify Songs Table Service is running on port 2022');
});
