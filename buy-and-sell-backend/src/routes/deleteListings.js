import { db } from "../database";
import * as admin from 'firebase-admin'; 

export const deleteListingsRoute = {
    method:'DELETE',
    path: '/api/listings/{id}',
    handler: async (req, h) => {
        const token = req.headers.authtoken;
        const user = await admin.auth().verifyIdToken(token);
        const userId = req.params.userId;
        const {id} = req.params;
        await db.query(
            `DELETE FROM listings WHERE
            id=? AND user_id=?
            `, [id, userId]
        );
        return {message: 'Success!'};
    }
}
