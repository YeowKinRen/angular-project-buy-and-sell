import { db } from "../database";

export const getAllListingsRoute = {
    method: 'GET',
    path: '/api/listings',
    handler: async (req, h) => {
        const { results } = await db.query(
            'SELECT * FROM listings'
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
