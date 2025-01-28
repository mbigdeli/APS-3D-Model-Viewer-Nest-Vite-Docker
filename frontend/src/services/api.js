/**
 * API Service
 * Handles all communication with the backend server
 */

// API endpoint configuration
const API_ENDPOINTS = {
    MODELS: '/api/data',
    MODEL_STATUS: (urn) => `/api/data/${urn}/status`,
    AUTH_TOKEN: '/api/auth/token'
};

/**
 * Generic API request handler
 * @private
 * @param {string} url - API endpoint URL
 * @param {Object} [options] - Fetch options
 * @returns {Promise<any>} Response data
 * @throws {Error} If request fails
 */
async function apiRequest(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(await response.text());
    }
    return response.json();
}

/**
 * Get list of all models
 * @returns {Promise<Array<{name: string, urn: string}>>} List of models
 * @throws {Error} If request fails
 */
export function getModels() {
    return apiRequest(API_ENDPOINTS.MODELS);
}

/**
 * Upload a new model
 * @param {File} file - The model file to upload
 * @returns {Promise<{name: string, urn: string}>} Uploaded model info
 * @throws {Error} If upload fails
 */
export function uploadModel(file) {
    const data = new FormData();
    data.append('file', file);
    
    return apiRequest(API_ENDPOINTS.MODELS, {
        method: 'POST',
        body: data
    });
}

/**
 * Get authentication token for APS viewer
 * @returns {Promise<{access_token: string, expires_in: number}>} Token info
 * @throws {Error} If authentication fails
 */
export function getAuthToken() {
    return apiRequest(API_ENDPOINTS.AUTH_TOKEN);
} 