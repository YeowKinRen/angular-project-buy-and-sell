import { getAllListingsRoute } from "./getAllListings";
import { getListingRoute } from "./getListing";
import { addViewToListingRoute } from "./addViewToListing";
import { getUserListingsRoute } from "./getUserListings";
import { createNewListingRoute } from "./createNewListing";
import { updateListingsRoute } from "./updateListing";
import { deleteListingsRoute } from "./deleteListings";
import { staticFilesRoute, fileRoutes } from "./files";
import { createMessageRoute } from "./createMessage";
import { getMessagesRoute } from "./getMessage";
import { getMessageHistoryRoute } from "./getMessageHistory";
import { sendMessageRoute } from "./sendMessage";


// Order matters: Angular routes BEFORE staticFilesRoute
export default [
   
    // API routes first
    getAllListingsRoute, getListingRoute, addViewToListingRoute, getUserListingsRoute, 
    createNewListingRoute, updateListingsRoute, deleteListingsRoute, createMessageRoute,
    getMessagesRoute,getMessageHistoryRoute,sendMessageRoute,
     // 1. Serve static assets
    staticFilesRoute,
    // Then Angular route paths that render index.html
    ...fileRoutes,
]