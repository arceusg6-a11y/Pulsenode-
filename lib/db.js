import { MongoClient } from 'mongodb';

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || 'pulse_node_db';

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db(DB_NAME);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function trackUser(walletAddress, ipAddress) {
  try {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');

    await usersCollection.updateOne(
      { walletAddress },
      {
        $set: {
          walletAddress,
          ipAddress,
          lastActive: new Date(),
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    return true;
  } catch (error) {
    console.error('Error tracking user:', error);
    return false;
  }
}

export async function getTotalUsers() {
  try {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');
    const count = await usersCollection.countDocuments();
    return count;
  } catch (error) {
    console.error('Error getting total users:', error);
    return 0;
  }
}

export async function getActiveUsers() {
  try {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');
    
    // Users active in the last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    
    const count = await usersCollection.countDocuments({
      lastActive: { $gte: fiveMinutesAgo },
    });
    
    return count;
  } catch (error) {
    console.error('Error getting active users:', error);
    return 0;
  }
}
