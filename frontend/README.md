# APS Simple Viewer Frontend

A modern, component-based frontend for the APS Simple Viewer application. This frontend is built with modern JavaScript practices and provides a clean, intuitive interface for viewing 3D models.

## Architecture

### Component Structure
```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ModelList/    # Model selection and upload
│   │   │   ├── index.js
│   │   │   └── style.css
│   │   └── Viewer/       # 3D viewer component
│   │       ├── index.js
│   │       └── style.css
│   ├── services/         # API and external services
│   │   ├── api.js        # Backend API communication
│   │   └── viewer.js     # APS viewer service
│   ├── styles/           # Global styles
│   │   ├── main.css      # Main application styles
│   │   └── variables.css # CSS variables and theming
│   └── main.js          # Application entry point
├── public/              # Static assets
├── index.html          # HTML entry point
├── vite.config.js      # Build configuration
└── package.json        # Dependencies and scripts
```

## Features

### Components
- **ModelList**: Handles model selection and file uploads
- **Viewer**: Manages the 3D viewer display and interaction

### Services
- **API Service**: Manages all backend communication
- **Viewer Service**: Handles APS viewer initialization and configuration

### Styling
- CSS variables for consistent theming
- Component-scoped styles
- Responsive design
- Modern animations and transitions

## Development

### Prerequisites
- Node.js 16.x or later
- npm 7.x or later
- Modern web browser

### Setup
1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Access the application at `http://localhost:5173`

### Build
```bash
npm run build
```

The build output will be in the `dist` directory.

## Configuration

### Viewer Settings
The viewer can be configured in `services/viewer.js`:

```javascript
const VIEWER_CONFIG = {
    ENVIRONMENT: {
        env: 'AutodeskProduction',
        api: 'streamingV2'
    },
    EXTENSIONS: [
        'Autodesk.DefaultTools.NavTools',
        'Autodesk.ViewCubeUi',
        // ... other extensions
    ],
    APPEARANCE: {
        theme: 'light-theme',
        backgroundColor: {
            top: [240, 240, 240],
            bottom: [181, 181, 181]
        },
        backgroundOpacity: 0.5,
        lightPreset: 1
    }
};
```

### Theme Customization
Global theme variables can be modified in `styles/variables.css`:

```css
:root {
    --primary-color: #0696d7;
    --primary-color-hover: #0587c3;
    --border-color: #d3d3d3;
    /* ... other variables */
}
```

## Best Practices

1. **Component Organization**
   - Each component in its own directory
   - Component-specific styles alongside component code
   - Clear separation of concerns

2. **State Management**
   - Clean component initialization
   - Proper error handling
   - Loading states for better UX

3. **Code Style**
   - ES6+ features
   - Clear documentation
   - Consistent naming conventions

4. **Performance**
   - Efficient DOM manipulation
   - Optimized viewer initialization
   - Smart error recovery

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow the existing code structure
2. Maintain consistent styling
3. Document new features
4. Test thoroughly before submitting PRs

## Troubleshooting

### Common Issues

1. **Viewer Not Loading**
   - Check network connectivity
   - Verify APS credentials
   - Check browser console for errors

2. **Model Upload Issues**
   - Verify file format support
   - Check file size limits
   - Ensure proper CORS configuration

3. **Styling Issues**
   - Clear browser cache
   - Check CSS variable definitions
   - Verify component-specific styles

## Resources

- [APS Documentation](https://aps.autodesk.com/developer/documentation)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Modern JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) 