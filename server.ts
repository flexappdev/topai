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
    res.status(200).json({ collections });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: (e as Error).message });
  }
});

app.get('/api/mongo/:collectionName', async (req, res) => {
  try {
    const { collectionName } = req.params;
    const db = client.db('AIDB');
    const collection = db.collection(collectionName);
    
    // Get total count
    const count = await collection.countDocuments();
    
    // Get first document
    const firstDoc = await collection.findOne({}, { sort: { _id: 1 } });
    
    // Get latest document
    const latestDoc = await collection.findOne({}, { sort: { _id: -1 } });
    
    // Get a sample document
    const sampleDoc = await collection.aggregate([{ $sample: { size: 1 } }]).toArray();
    
    res.status(200).json({
      count,
      firstDoc,
      latestDoc,
      sampleDoc: sampleDoc[0] || null
    });
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

app.get('/api/daily', async (req, res) => {
  try {
    const db = client.db('AIDB');
    const dailyCollection = db.collection('DAILY');
    const documents = await dailyCollection.find({}).toArray();
    res.status(200).json(documents);
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
