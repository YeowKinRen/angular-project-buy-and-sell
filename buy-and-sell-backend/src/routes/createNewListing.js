import { v4 as uuid } from 'uuid';
import { db } from "../database";
import * as admin from 'firebase-admin';

export const createNewListingRoute = {
    method: 'POST',
    path: '/api/listings',
    handler: async (req, h) => {
        try {
            const token = req.headers.authtoken;
            const user = await admin.auth().verifyIdToken(token)
            const id = uuid();
            const userId = user.uid;

            const { name = '', description = '', price = 0, imageUrl = '' } = req.payload;
            const views = 0;
            await db.query(
                `INSERT INTO listings (id, name, description, price, user_id, views, image_url) VALUES
                (?,?,?,?,?,?,?)`,
                [id, name, description, price, userId, views, imageUrl],
            );
            return { id, name, description, price, user_id: userId, views, image_url: imageUrl };

        } catch (error) {
            console.error(error);
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
}
