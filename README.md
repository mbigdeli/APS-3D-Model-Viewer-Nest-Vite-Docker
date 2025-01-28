# APS-3D-Model-Viewer-Nest-Vite-Docker

A modern implementation of the Autodesk Platform Services (APS) Simple Viewer using NestJS and modern frontend practices. This project demonstrates how to create a web application that can view and interact with 3D models using Autodesk's viewer technology.

## Features

- 🌐 Modern web architecture with NestJS backend and Vite frontend
- 🎨 Clean, modular code structure with best practices
- 🔄 Real-time model loading and viewing
- 📤 Model upload functionality
- 🎯 Responsive design with modern UI/UX
- 🛠️ Configurable viewer settings (themes, colors, etc.)

## Project Structure

```
project/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── main.ts         # Application entry point
│   │   └── ...            # Other backend files
│   └── package.json
│
├── frontend/               # Vite frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── services/     # API and viewer services
│   │   ├── styles/       # Global styles
│   │   └── main.js       # Frontend entry point
│   └── package.json
```

## Prerequisites

- Node.js 16.x or later
- npm 7.x or later
- An Autodesk Platform Services (APS) account
- APS application credentials

## Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd APS-3D-Model-Viewer-Nest-Vite-Docker
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Configure environment variables:
Create a `.env` file in the backend directory:
```env
APS_CLIENT_ID="your-client-id"
APS_CLIENT_SECRET="your-client-secret"
APS_BUCKET="your-bucket-name"
PORT=8080
```

## Development

1. Start the backend server:
```bash
cd backend
npm run start:dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to:
- Frontend: http://localhost:5173
- Backend: http://localhost:8080

## Production Build

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Build the backend:
```bash
cd backend
npm run build
```

3. Start the production server:
```bash
npm run start:prod
```

## Configuration

### Viewer Configuration
The viewer can be configured in `frontend/src/services/viewer.js`:
- Theme (light/dark)
- Background colors
- Extensions
- Light presets

### Backend Configuration
Backend settings can be adjusted in:
- `.env` file for environment variables
- `backend/src/config` for application configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Based on the [original APS Simple Viewer](https://github.com/autodesk-platform-services/aps-simple-viewer-nodejs)
- Built with [NestJS](https://nestjs.com/)
- Frontend powered by [Vite](https://vitejs.dev/)
