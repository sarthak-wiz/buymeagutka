import type { NextApiRequest, NextApiResponse } from 'next';
import { saveProfile } from '@/actions/ProfileInfoActions';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      // Assuming saveProfile is adapted to handle NextApiRequest
      // You might need to adjust how you extract data from req.body or req
      await saveProfile(req);
      res.status(200).json({ message: 'Profile saved successfully!' });
    } catch (error) {
        const message = (error instanceof Error) ? error.message : 'Unknown error';
        res.status(500).json({ message: 'Failed to save profile', error: message });
      }
    } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}