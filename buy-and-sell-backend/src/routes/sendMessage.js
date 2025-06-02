import { v4 as uuid } from 'uuid';
import { db } from "../database";
import * as admin from 'firebase-admin';

export const sendMessageRoute = {
    method: 'POST',
    path: '/api/messages/send',
    handler: async (req, h) => {
        const { listingId = '', recipientEmail = '', senderEmail='', message = ''} = req.payload;
        const token = req.headers.authtoken;
        const user = await admin.auth().verifyIdToken(token)
        const id = uuid();
        const userId = user.uid;
const timestamp = new Date(); 
        await db.query(`
      INSERT INTO messages (id, listing_id, sender_email, recipient_email, message)
      VALUES (?, ?, ?, ?, ?)`,
            [id, listingId, senderEmail, recipientEmail, message]
        );
        return {
            id,
            listingId,
            senderEmail,
            recipientEmail,
            message,
        };
    }
};
