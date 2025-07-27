import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI || 'mongodb+srv://matsiems:vSdX6isu929fNbZL@cluster0.5oob9.mongodb.net/';
const client = new MongoClient(uri);

async function connectToDb() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

app.get('/api/mongo', async (req, res) => {
  try {
    const db = client.db('AIDB');
    const collections = await db.listCollections().toArray();
    const dailyCollection = db.collection('DAILY');
    const latestDoc = await dailyCollection.find().sort({ _id: -1 }).limit(1).toArray();
    res.status(200).json({ collections, latestDoc });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: (e as Error).message });
  }
});

app.post('/api/lists', async (req, res) => {
  try {
    const db = client.db('AIDB');
    const dailyCollection = db.collection('DAILY');
    const listData = req.body;
    const result = await dailyCollection.insertOne(listData);
    res.status(201).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: (e as Error).message });
  }
});

connectToDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
