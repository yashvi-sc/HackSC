require('dotenv').config(); // For environment variables
const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const app = express();
const PORT = 3001;

// Middleware to parse JSON
app.use(express.json());
app.use(express.static('public')); // Serve static files (e.g., HTML, CSS, JS)

// Define mood-based attributes
const moodAttributes = {
  happy: {
    genre: 'pop',
    energy: { min: 0.7, max: 1 },
    valence: { min: 0.7, max: 1 },
  },
  sad: {
    genre: 'indie',
    energy: { min: 0, max: 0.4 },
    valence: { min: 0, max: 0.4 },
  },
  excited: {
    genre: 'dance',
    energy: { min: 0.8, max: 1 },
    valence: { min: 0.6, max: 1 },
  },
  relaxed: {
    genre: 'chill',
    energy: { min: 0, max: 0.3 },
    valence: { min: 0.5, max: 1 },
  },
};

// Get Spotify access token using Client Credentials Flow
async function getSpotifyAccessToken() {
  const SPOTIFY_CLIENT_ID = 'a6f58883c21a4c3bb90c51e0e6aa4abd';
  const SPOTIFY_CLIENT_SECRET = '55394f2e5f894452a9005a9b35e22987';

  const auth = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const data = querystring.stringify({
    grant_type: 'client_credentials',
  });

  try {
    const response = await axios.post(tokenUrl, data, {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    return null;
  }
}

// Function to fetch random songs based on mood from Spotify
async function getRandomSpotifySongs(mood) {
  const accessToken = await getSpotifyAccessToken();

  if (!accessToken) {
    return null;
  }

  // Get attributes for the mood
  const attributes = moodAttributes[mood.toLowerCase()];

  if (!attributes) {
    return null;
  }

  const SPOTIFY_API_URL = `https://api.spotify.com/v1/recommendations?seed_genres=${attributes.genre}&min_energy=${attributes.energy.min}&max_energy=${attributes.energy.max}&min_valence=${attributes.valence.min}&max_valence=${attributes.valence.max}&limit=10`; // Increasing limit to get more songs

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.get(SPOTIFY_API_URL, { headers });

    // Randomize the order of songs
    const randomizedSongs = response.data.tracks.sort(() => Math.random() - 0.5); // Shuffling the array

    return randomizedSongs.map(track => ({
      name: track.name,
      artist: track.artists[0].name,
      url: track.external_urls.spotify,
    }));
  } catch (error) {
    console.error('Error fetching Spotify songs:', error);
    return [];
  }
}

// API endpoint to get songs based on mood
app.post('/get-song', async (req, res) => {
  const { mood } = req.body;

  if (!moodAttributes[mood.toLowerCase()]) {
    return res.status(400).json({ error: 'Invalid mood' });
  }

  const songs = await getRandomSpotifySongs(mood);

  if (!songs || songs.length === 0) {
    return res.status(500).json({ error: 'No songs found for this mood' });
  }

  // Respond with the songs in a tabular format
  res.json({ songs });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
