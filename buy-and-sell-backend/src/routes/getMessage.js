import { db } from '../database';

export const getMessagesRoute = {
  method: 'GET',
  path: '/api/messages/{listingId}',
  handler: async (req, h) => {
    const listingId = req.params.listingId;

    const { results } = await db.query(
      `SELECT * FROM messages WHERE listing_id = ? ORDER BY timestamp DESC`,
      [listingId]
    );
    // Convert all rows to camelCase keys
    const messages = results.map(row => ({
      id: row.id,
      listingId: row.listing_id,
      senderEmail: row.sender_email,
      recipientEmail: row.recipient_email,
      message: row.message,
      timestamp: row.timestamp,
    }));

    return messages;
  }
};
