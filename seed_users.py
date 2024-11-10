from pymongo import MongoClient
from faker import Faker
import random
from datetime import datetime
import bcrypt

# Initialize Faker
fake = Faker()

# Musical genres list
MUSICAL_GENRES = [
    "Pop", "Rock", "Hip Hop", "R&B", "Jazz",
    "Classical", "Electronic", "Country", "Blues",
    "Metal", "Folk", "Indie", "K-pop", "Latin", "Reggae"
]

# MongoDB connection string
MONGODB_URI = "mongodb+srv://pangmingkai:b8cZn5Uo0YpyEpcY@cluster0.oszzk.mongodb.net/hacksc?retryWrites=true&w=majority&appName=Cluster0"

def create_fake_user():
    # Generate random number of genres (1-5)
    num_genres = random.randint(1, 5)
    genres = random.sample(MUSICAL_GENRES, num_genres)
    
    # Hash a default password
    password = "password123".encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password, salt)

    return {
        "name": fake.name(),
        "email": fake.email(domain="example.com"),
        "password": hashed_password,
        "emailVerified": fake.date_time_this_year(),
        "role": "USER",
        "provider": "credentials",
        "isTwoFactorEnabled": False,
        "musicalGenres": genres,
        "phoneNumber": fake.phone_number(),
        "instagramUsername": fake.user_name(),
        "discordUsername": fake.user_name(),
        "createdAt": datetime.now(),
        "updatedAt": datetime.now()
    }

def seed_users(num_users=50):
    try:
        # Connect to MongoDB
        client = MongoClient(MONGODB_URI)
        db = client.test  # Explicitly specify database name
        users_collection = db.users

        # Delete existing test users
        users_collection.delete_many({"email": {"$regex": "@example.com$"}})

        # Create fake users
        fake_users = [create_fake_user() for _ in range(num_users)]

        # Insert users
        result = users_collection.insert_many(fake_users)
        
        print(f"✅ Successfully inserted {len(result.inserted_ids)} users")

        # Print example users
        print("\nExample users:")
        for user in users_collection.find({"_id": {"$in": result.inserted_ids[:3]}}, {"password": 0}):
            print(f"""
Name: {user['name']}
Email: {user['email']}
Genres: {', '.join(user['musicalGenres'])}
Instagram: {user['instagramUsername']}
Discord: {user['discordUsername']}
            """)

    except Exception as e:
        print(f"❌ Error seeding users: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    seed_users()
