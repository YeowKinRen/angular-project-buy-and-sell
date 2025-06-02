import Boom from '@hapi/boom';
import { db } from '../database';

export const getListingRoute = {
    method: 'GET',
    path: '/api/listings/{id}',
    handler: async (req, h) => {
        const id = req.params.id;
        const { results }  = await db.query(
            'SELECT * FROM listings WHERE id = ?', [id]
        );
        if (!results.length) {
            throw Boom.notFound(`Listing does not exist with id ${id}`);
        }

        const dbRow = results[0];

        // Manually map snake_case keys to camelCase keys
        const listing = {
        id: dbRow.id,
        name: dbRow.name,
        description: dbRow.description,
        price: dbRow.price,
        userId: dbRow.user_id,
        views: dbRow.views,
        imageUrl: dbRow.image_url,
        };

        return listing; // Return the full row as the listing

    }
}