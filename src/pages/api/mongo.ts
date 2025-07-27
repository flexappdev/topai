import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db('AIDB');

    const collections = await db.listCollections().toArray();
    const dailyCollection = db.collection('DAILY');
    const latestDoc = await dailyCollection.find().sort({ _id: -1 }).limit(1).toArray();

    res.status(200).json({ collections, latestDoc });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
