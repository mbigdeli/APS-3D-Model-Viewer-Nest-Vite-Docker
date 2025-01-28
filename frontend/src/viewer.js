/**
 * This file handles showing 3D models in the web browser
 * Think of it like a special TV that can show 3D models instead of videos
 */

/// import * as Autodesk from "@types/forge-viewer";

/**
 * Gets permission to use Autodesk's 3D viewer
 * Think of it like getting a ticket to enter a movie theater
 * 
 * How it works:
 * 1. Asks our server for a special ticket (token)
 * 2. If successful, gives the ticket to Autodesk
 * 3. If something goes wrong, shows an error message
 */
async function getAccessToken(callback) {
    try {
        const resp = await fetch('/api/auth/token');
        if (!resp.ok) {
            throw new Error(await resp.text());
        }
        const { access_token, expires_in } = await resp.json();
        callback(access_token, expires_in);
    } catch (err) {
        alert('Could not get permission to use the viewer. Check the console for details.');
        console.error(err);
    }
}

/**
 * Sets up the 3D viewer in your web page
 * Think of it like setting up a TV in your room
 * 
 * How it works:
 * 1. Gets permission to use the viewer
 * 2. Creates a special viewing area
 * 3. Sets up all the buttons and controls
 * 4. Gets everything ready to show models
 */
export function initViewer(container) {
    return new Promise(function (resolve, reject) {
        // Start up the viewer with our permission ticket
        Autodesk.Viewing.Initializer({ env: 'AutodeskProduction', getAccessToken }, function () {
            const config = {
                extensions: ['Autodesk.DocumentBrowser'] // Add extra features
            };
            // Create the viewer and start it up
            const viewer = new Autodesk.Viewing.GuiViewer3D(container, config);
            viewer.start();
            viewer.setTheme('dark-theme');
            resolve(viewer);
        });
    });
}

/**
 * Shows a specific 3D model in the viewer
 * Think of it like playing a specific video on your TV
 * 
 * How it works:
 * 1. Takes the viewer we set up
 * 2. Takes the ID (URN) of the model we want to show
 * 3. Loads the model into the viewer
 * 4. Lets us know if something goes wrong
 */
export function loadModel(viewer, urn) {
    return new Promise(function (resolve, reject) {
        // What to do when the model loads successfully
        function onDocumentLoadSuccess(doc) {
            resolve(viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry()));
        }
        
        // What to do if something goes wrong
        function onDocumentLoadFailure(code, message, errors) {
            reject({ code, message, errors });
        }
        
        // Set up nice lighting
        viewer.setLightPreset(1);
        
        // Try to load the model
        Autodesk.Viewing.Document.load('urn:' + urn, onDocumentLoadSuccess, onDocumentLoadFailure);
    });
}
