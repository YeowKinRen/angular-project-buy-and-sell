import { db } from '../database';
import { v4 as uuid } from 'uuid';

export const createMessageRoute = {
  method: 'POST',
  path: '/api/messages',
  handler: async (req, h) => {
    const { listingId, senderEmail, message } = req.payload;
    const id = uuid();
    
    await db.query(
      `INSERT INTO messages (id, listing_id, sender_email, message)
       VALUES (?, ?, ?, ?)`,
      [id, listingId, senderEmail, message]
    );

    return { id, listingId, senderEmail, message };
  }
};