import { MongoClient } from 'mongodb';
import { NextApiRequest } from 'next';

// Example MongoDB URI
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri as string);

export async function saveProfile(req: NextApiRequest) {
  console.log("Connecting to client...");
  await client.connect();
  console.log("Connected to client, accessing database...");
  const database = client.db("test");
  const profiles = database.collection("profileinfos");

  // Extract data from request body
  const { username, displayName, bio, email, coverUrl, avatarUrl, upiId } = req.body;
  console.log("Received data:", req.body);

  try {
    console.log("Checking for existing profile...");
    const existingProfile = await profiles.findOne({ email });

    if (existingProfile) {
      console.log("Existing profile found, updating...");
      await profiles.updateOne({ email }, { $set: { username, displayName, bio, coverUrl, avatarUrl, upiId } });
      console.log("Profile updated.");
    } else {
      console.log("No existing profile, creating new one...");
      await profiles.insertOne({ username, displayName, bio, email, coverUrl, avatarUrl, upiId });
      console.log("New profile created.");
    }

    
  return { message: "Profile saved successfully!" };
} catch (error) {
  console.error("Error in saveProfile:", error);
  throw new Error('Failed to save profile: ' + (error instanceof Error ? error.stack : 'An unknown error occurred'));
} finally {
  console.log("Closing client connection...");
  await client.close();
  console.log("Client connection closed.");
}
}

