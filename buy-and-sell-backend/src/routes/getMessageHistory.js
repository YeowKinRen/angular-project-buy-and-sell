import { db } from '../database';


export const getMessageHistoryRoute = {
  method: 'GET',
  path: '/api/messages/history/{listingId}',
  handler: async (req, h) => {
    const listingId = req.params.listingId;
    const email = req.query.email;
    console.log(email)

    const { results } = await db.query(
      `SELECT * FROM messages
       WHERE listing_id = ?
       AND (sender_email = ? OR recipient_email = ?)
       ORDER BY timestamp ASC`,
      [listingId, email, email]
    );

    return results.map(row => ({
      id: row.id,
      listingId: row.listing_id,
      senderEmail: row.sender_email,
      recipientEmail: row.recipient_email,
      message: row.message,
      timestamp: row.timestamp,
    }));
  }
};
