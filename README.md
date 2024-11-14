# aps-simple-viewer-nestjs

Experimental port of https://github.com/autodesk-platform-services/aps-simple-viewer-nodejs to [NestJS](https://nestjs.com/).

## Setup

- Install dependencies: `npm install`
- Create a _.env_ file with your APS credentials and (optional) bucket name

```
APS_CLIENT_ID="your client ID"
APS_CLIENT_SECRET="your client secret"
APS_BUCKET="your bucket name"
```

- Run the app: `npm start`
- Go to http://localhost:8080