/**
 * Viewer Component
 * Handles the APS viewer display and interaction
 */

import './style.css';
import { initViewer, loadModel } from '../../services/viewer';

export class Viewer {
    constructor(container) {
        this.container = container;
        this.container.className = 'viewer-wrapper';
        this.initializationAttempts = 0;
        this.maxInitializationAttempts = 3;
        this.setupUI();
    }

    async setupUI() {
        // Create viewer container
        this.viewerContainer = document.createElement('div');
        this.viewerContainer.className = 'viewer-container';
        this.container.appendChild(this.viewerContainer);

        await this.initializeViewer();
    }

    async initializeViewer() {
        if (this.initializationAttempts >= this.maxInitializationAttempts) {
            this.showError('Failed to initialize viewer after multiple attempts');
            return;
        }

        this.initializationAttempts++;

        try {
            // Ensure container is ready
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Check if container is visible and has dimensions
            const rect = this.viewerContainer.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) {
                console.warn('Viewer container has no dimensions, retrying...');
                await new Promise(resolve => setTimeout(resolve, 500));
                return this.initializeViewer();
            }

            console.log('Initializing viewer, attempt:', this.initializationAttempts);
            this.viewer = await initViewer(this.viewerContainer);
            console.log('Viewer initialized successfully');
        } catch (err) {
            console.error('Failed to initialize viewer:', err);
            if (this.initializationAttempts < this.maxInitializationAttempts) {
                console.log('Retrying viewer initialization...');
                await new Promise(resolve => setTimeout(resolve, 1000));
                return this.initializeViewer();
            }
            this.showError('Could not initialize viewer');
        }
    }

    async loadModel(urn) {
        if (!this.viewer) {
            console.warn('Viewer not initialized yet');
            // Try to initialize viewer again if it failed
            await this.initializeViewer();
            if (!this.viewer) {
                this.showError('Viewer not available');
                return;
            }
        }

        try {
            console.log('Loading model:', urn);
            this.showLoading();
            await loadModel(this.viewer, urn);
            this.hideError();
            this.hideLoading();
            console.log('Model loaded successfully');
        } catch (err) {
            console.error('Failed to load model:', err);
            this.hideLoading();
            this.showError('Could not load model');
        }
    }

    showLoading() {
        if (!this.loadingContainer) {
            this.loadingContainer = document.createElement('div');
            this.loadingContainer.className = 'viewer-loading';
            this.loadingContainer.textContent = 'Loading model...';
            this.container.appendChild(this.loadingContainer);
        }
        this.loadingContainer.style.display = 'flex';
    }

    hideLoading() {
        if (this.loadingContainer) {
            this.loadingContainer.style.display = 'none';
        }
    }

    showError(message) {
        if (!this.errorContainer) {
            this.errorContainer = document.createElement('div');
            this.errorContainer.className = 'viewer-error';
            this.container.appendChild(this.errorContainer);
        }
        this.errorContainer.textContent = message;
        this.errorContainer.style.display = 'flex';
    }

    hideError() {
        if (this.errorContainer) {
            this.errorContainer.style.display = 'none';
        }
    }
} 