import { db } from "../database";
import * as admin from 'firebase-admin'; 


export const getUserListingsRoute = {
    method: 'GET', 
    path: '/api/users/{userId}/listings',
    handler: async (req, h) => {
        const token = req.headers.authtoken;
        const user = await admin.auth().verifyIdToken(token);
        const userId = req.params.userId;

        if (user.user_id !== userId) throw Boom.unauthorised('Users can only access their own listing!')

        const { results } = await db.query(
            'SELECT * FROM listings WHERE user_id=?',
            [userId],
        );
        return results.map(dbRow => ({
            id: dbRow.id,
            name: dbRow.name,
            description: dbRow.description,
            price: dbRow.price,
            userId: dbRow.user_id,
            views: dbRow.views,
            imageUrl: dbRow.image_url,
        }));
    }
}