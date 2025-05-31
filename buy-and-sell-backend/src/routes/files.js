
const angularRoutePaths = [
    '/','/listings','/contact/{id}','/edit-listing/{id}','/listings/{id}','/my-listings','/new-listing',
];

export const fileRoutes = angularRoutePaths.map(path => ({
    method: 'GET',
    path,
    handler: (req, h) => {
        return h.file('dist/buy-and-sell/browser/index.html')
    }
}));

export const staticFilesRoute = {
    method: 'GET',
    path: '/{params*}',
    handler: {
        directory: {
            path: 'dist/buy-and-sell/browser/',
            index: ['index.html'], // Try serving index.html
            listing: false,        // Don’t list files
            redirectToSlash: true,
        }
    }
}