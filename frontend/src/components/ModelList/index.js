/**
 * ModelList Component
 * Handles the model list and upload functionality
 */

import './style.css';
import { uploadModel } from '../../services/api';

/**
 * @typedef {Object} Model
 * @property {string} name - Model name
 * @property {string} urn - Model URN
 */

export class ModelList {
    /**
     * Create a ModelList component
     * @param {HTMLElement} container - Container element
     * @param {function(string)} onModelSelect - Callback when model is selected
     */
    constructor(container, onModelSelect) {
        this.container = container;
        this.onModelSelect = onModelSelect;
        this.container.className = 'model-list';
        this.setupUI();
    }

    /**
     * Set up UI elements
     * @private
     */
    setupUI() {
        this.createSelectElement();
        this.createUploadButton();
        this.createFileInput();
        this.attachEventListeners();
        this.appendElements();
    }

    /**
     * Create model select element
     * @private
     */
    createSelectElement() {
        this.select = document.createElement('select');
        this.select.id = 'models';
        this.select.setAttribute('aria-label', 'Select Model');
    }

    /**
     * Create upload button
     * @private
     */
    createUploadButton() {
        this.uploadButton = document.createElement('button');
        this.uploadButton.id = 'upload';
        this.uploadButton.title = 'Upload New Model';
        this.uploadButton.textContent = 'Upload';
    }

    /**
     * Create file input
     * @private
     */
    createFileInput() {
        this.fileInput = document.createElement('input');
        this.fileInput.type = 'file';
        this.fileInput.id = 'input';
        this.fileInput.style.display = 'none';
        this.fileInput.accept = '.rvt,.rfa,.ifc,.dwg,.nwd,.3dm';  // Supported file types
    }

    /**
     * Attach event listeners
     * @private
     */
    attachEventListeners() {
        this.select.addEventListener('change', () => {
            if (this.select.value) {
                this.onModelSelect(this.select.value);
            }
        });

        this.uploadButton.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', () => this.handleFileUpload());
    }

    /**
     * Append elements to container
     * @private
     */
    appendElements() {
        this.container.appendChild(this.select);
        this.container.appendChild(this.uploadButton);
        this.container.appendChild(this.fileInput);
    }

    /**
     * Handle file upload
     * @private
     * @async
     */
    async handleFileUpload() {
        const file = this.fileInput.files[0];
        if (!file) return;

        this.setUploadingState(true);
        try {
            await uploadModel(file);
            this.onModelSelect('refresh');
        } catch (err) {
            this.showError('Could not upload model: ' + err.message);
        } finally {
            this.setUploadingState(false);
        }
    }

    /**
     * Set uploading state
     * @private
     * @param {boolean} isUploading - Whether file is being uploaded
     */
    setUploadingState(isUploading) {
        this.uploadButton.disabled = isUploading;
        this.select.disabled = isUploading;
        if (!isUploading) {
            this.fileInput.value = '';
        }
    }

    /**
     * Show error message
     * @private
     * @param {string} message - Error message
     */
    showError(message) {
        alert(message);  // Could be replaced with a more sophisticated error display
    }

    /**
     * Update model list
     * @param {Model[]} models - List of models
     * @param {Model} [selected] - Selected model
     */
    updateModelList(models, selected) {
        this.select.innerHTML = '';
        this.addEmptyOption();
        
        models.forEach(model => {
            const option = this.createModelOption(model, selected);
            this.select.appendChild(option);
        });
    }

    /**
     * Add empty option to select
     * @private
     */
    addEmptyOption() {
        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = '-- Select Model --';
        this.select.appendChild(emptyOption);
    }

    /**
     * Create model option element
     * @private
     * @param {Model} model - Model data
     * @param {Model} [selected] - Selected model
     * @returns {HTMLOptionElement} Option element
     */
    createModelOption(model, selected) {
        const option = document.createElement('option');
        option.value = model.urn;
        option.textContent = model.name;
        if (selected && model.urn === selected.urn) {
            option.selected = true;
        }
        return option;
    }
} 