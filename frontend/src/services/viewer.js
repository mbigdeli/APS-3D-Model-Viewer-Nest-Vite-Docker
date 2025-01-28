/**
 * Viewer Service
 * Handles APS (Autodesk Platform Services) viewer functionality
 */

import { getAuthToken } from './api';

// Viewer configuration constants
const VIEWER_CONFIG = {
    ENVIRONMENT: {
        env: 'AutodeskProduction',
        api: 'streamingV2'
    },
    EXTENSIONS: [
        'Autodesk.DefaultTools.NavTools',    // Navigation tools (orbit, pan, zoom)
        'Autodesk.ViewCubeUi',               // ViewCube (3D orientation cube)
        'Autodesk.BimWalk',                  // BIM walk navigation
        'Autodesk.ViewerBasics',             // Basic viewer functionality
        'Autodesk.Measure'                   // Measurement tools
    ],
    APPEARANCE: {
        theme: 'light-theme',
        backgroundColor: {
            top: [12, 21, 111],
            bottom: [128, 128, 128]
        },
        backgroundOpacity: 0.5,
        lightPreset: 1
    }
};

/**
 * Gets an access token for the viewer
 * @private
 * @param {Function} callback - Token callback function
 */
async function getAccessToken(callback) {
    try {
        const { access_token, expires_in } = await getAuthToken();
        callback(access_token, expires_in);
    } catch (err) {
        console.error('Failed to get access token:', err);
        throw new Error('Authentication failed');
    }
}

/**
 * Apply viewer configuration
 * @private
 * @param {Autodesk.Viewing.GuiViewer3D} viewer - The viewer instance
 */
function applyViewerConfig(viewer) {
    const { theme, backgroundColor, backgroundOpacity, lightPreset } = VIEWER_CONFIG.APPEARANCE;
    
    // Apply theme
    viewer.setTheme(theme);
    
    // Apply background
    const { top, bottom } = backgroundColor;
    viewer.setBackgroundColor(
        top[0]/255, top[1]/255, top[2]/255,
        bottom[0]/255, bottom[1]/255, bottom[2]/255
    );
    viewer.setBackgroundOpacity(1);
    
    // Apply lighting
    viewer.setLightPreset(2);
}

/**
 * Initialize the viewer
 * @param {HTMLElement} container - The container element
 * @returns {Promise<Autodesk.Viewing.GuiViewer3D>}
 */
export function initViewer(container) {
    return new Promise((resolve, reject) => {
        const options = {
            ...VIEWER_CONFIG.ENVIRONMENT,
            getAccessToken
        };

        Autodesk.Viewing.Initializer(options, () => {
            try {
                // Create viewer with extensions
                const viewer = new Autodesk.Viewing.GuiViewer3D(container, {
                    extensions: VIEWER_CONFIG.EXTENSIONS
                });

                // Start viewer and apply configuration
                const startPromise = viewer.start();
                if (startPromise) {
                    startPromise.then(() => {
                        applyViewerConfig(viewer);
                        resolve(viewer);
                    }).catch(reject);
                } else {
                    applyViewerConfig(viewer);
                    resolve(viewer);
                }
            } catch (error) {
                reject(error);
            }
        });
    });
}

/**
 * Load a model into the viewer
 * @param {Autodesk.Viewing.GuiViewer3D} viewer - The viewer instance
 * @param {string} urn - The model URN
 * @returns {Promise<void>}
 */
export function loadModel(viewer, urn) {
    return new Promise((resolve, reject) => {
        function onDocumentLoadSuccess(doc) {
            const viewables = doc.getRoot().getDefaultGeometry();
            if (!viewables) {
                reject(new Error('Document contains no viewables'));
                return;
            }

            viewer.loadDocumentNode(doc, viewables)
                .then(() => {
                    // Reapply configuration after model loads
                    applyViewerConfig(viewer);
                    resolve();
                })
                .catch(reject);
        }

        Autodesk.Viewing.Document.load('urn:' + urn, onDocumentLoadSuccess, reject);
    });
}

/**
 * Update viewer configuration
 * @param {Autodesk.Viewing.GuiViewer3D} viewer - The viewer instance
 * @param {Object} config - New configuration values
 */
export function updateViewerConfig(viewer, config) {
    // Update configuration
    if (config.theme) VIEWER_CONFIG.APPEARANCE.theme = config.theme;
    if (config.backgroundColor) VIEWER_CONFIG.APPEARANCE.backgroundColor = config.backgroundColor;
    if (config.backgroundOpacity) VIEWER_CONFIG.APPEARANCE.backgroundOpacity = config.backgroundOpacity;
    if (config.lightPreset) VIEWER_CONFIG.APPEARANCE.lightPreset = config.lightPreset;
    
    // Apply updated configuration
    applyViewerConfig(viewer);
} 