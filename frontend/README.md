# APS Simple Viewer Frontend

This is a web application that lets you view and interact with 3D models using Autodesk's platform (APS). Think of it like a YouTube player, but for 3D models instead of videos!

## Current Structure vs Recommended Structure

### Current Structure
```
frontend/
├── src/                    # Source files
│   ├── main.js            # Main application code
│   ├── viewer.js          # Viewer functionality
│   └── main.css           # All styles
├── index.html             # Main HTML file
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies
```

### Recommended Modern Structure
```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ModelList/    # Model list component
│   │   │   ├── index.js
│   │   │   └── style.css
│   │   └── Viewer/       # 3D viewer component
│   │       ├── index.js
│   │       └── style.css
│   ├── services/         # API and external services
│   │   ├── api.js       # Backend API calls
│   │   └── viewer.js    # APS viewer service
│   ├── styles/          # Global styles
│   │   ├── main.css
│   │   └── variables.css
│   ├── utils/           # Helper functions
│   │   └── error-handler.js
│   └── main.js          # Application entry point
├── public/              # Static files
│   └── favicon.ico
├── index.html
├── vite.config.js
└── package.json
```

## Why This Structure Is Better

1. **Components**: 
   - Each UI piece gets its own folder
   - Keeps related code together
   - Makes it easier to find and fix things

2. **Services**:
   - Separates API calls from UI code
   - Makes it easier to change how we talk to the server
   - Keeps viewer code organized

3. **Styles**:
   - Global styles are separate from component styles
   - CSS variables for consistent colors and sizes
   - Easier to maintain a consistent look

4. **Utils**:
   - Common functions in one place
   - Reduces repeated code
   - Easy to share helper functions

## How to Use It (for Developers)

1. Install all the needed tools:
```bash
npm install
```

2. Start the development mode (like a preview):
```bash
npm run dev
```

3. Make it ready for real users:
```bash
npm run build
```

## How It's Built

- Uses a tool called Vite to make development easier
- Talks to a backend server to get and save models
- Uses Autodesk's special tools to show 3D models
- Uses modern JavaScript to keep code organized

## How It Talks to the Server

The app needs to talk to a server (backend) to:
- Get the list of models: GET `/api/data`
- Upload new models: POST `/api/data`
- Check if a model is ready: GET `/api/data/:urn/status`

(Think of these like special web addresses that do different things)

## Important Settings

- The server (backend) runs on port 8080 (like a special radio channel)
- The development version runs on port 5173 (another channel)
- They talk to each other automatically!

## Suggested Improvements

1. **Component Organization**:
   - Break the UI into smaller, reusable pieces
   - Each component handles one specific thing
   - Makes the code easier to understand and test

2. **Style Management**:
   - Use CSS modules or a styling system
   - Keep styles close to their components
   - Use variables for consistent theming

3. **Error Handling**:
   - Central place for handling errors
   - Consistent error messages
   - Better user experience

4. **Code Splitting**:
   - Load code only when needed
   - Faster initial page load
   - Better performance

Would you like me to help implement these changes? 