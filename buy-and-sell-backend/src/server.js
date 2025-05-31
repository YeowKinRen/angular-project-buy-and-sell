import dotenv from 'dotenv';
dotenv.config();
import Hapi from '@hapi/hapi';
import routes from './routes';
import { db } from './database';
import * as admin from 'firebase-admin'; 
import credentials from '../credentials.json';
import inert from '@hapi/inert';

admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

let server;

const start = async () => {
    server = Hapi.server({
        port: process.env.PORT || 8000,
        host: '0.0.0.0',
    });

    // Register Inert to enable file handling
    await server.register(inert);

    // Add Angular and API routes here
    routes.forEach(route => server.route(route));

    db.connect();


    await server.start();
    console.log(`Server is listening on ${server.info.uri}`);

}

process.on('unhandledRejection', err=> {
    console.log(err);
    process.exit(1);
});

process.on('SIGINT', async () => {
    console.log('Stopping server...');

    await server.stop({timeout: 10000});

    db.end();

    console.log('Server stopped');
    process.exit(0);
});

start();
