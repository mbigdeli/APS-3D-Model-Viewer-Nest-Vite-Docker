/**
 * Main Application Entry Point
 */

import './styles/main.css';
import { getModels } from './services/api';
import { ModelList } from './components/ModelList';
import { Viewer } from './components/Viewer';

class App {
    constructor() {
        this.setupUI();
        this.initialize();
    }

    setupUI() {
        // Create main app structure
        document.body.innerHTML = `
            <div class="app">
                <header class="header">
                    <img class="logo" src="https://cdn.autodesk.io/logo/black/stacked.png" alt="Autodesk Platform Services">
                    <span class="title">Simple Viewer</span>
                    <div id="model-list"></div>
                </header>
                <main class="main">
                    <div id="viewer"></div>
                </main>
            </div>
        `;

        // Initialize components
        this.modelList = new ModelList(
            document.getElementById('model-list'),
            (urn) => this.onModelSelected(urn)
        );
        
        this.viewer = new Viewer(
            document.getElementById('viewer')
        );
    }

    async initialize() {
        try {
            const models = await getModels();
            this.modelList.updateModelList(models, models[0]);
            if (models[0]) {
                await this.viewer.loadModel(models[0].urn);
            }
        } catch (err) {
            console.error('Failed to initialize app:', err);
            alert('Could not initialize the application. See console for details.');
        }
    }

    async onModelSelected(urn) {
        if (urn === 'refresh') {
            // Refresh model list
            const models = await getModels();
            this.modelList.updateModelList(models, models[models.length - 1]);
            if (models.length > 0) {
                await this.viewer.loadModel(models[models.length - 1].urn);
            }
        } else {
            // Load selected model
            await this.viewer.loadModel(urn);
        }
    }
}

// Start the application
new App();
