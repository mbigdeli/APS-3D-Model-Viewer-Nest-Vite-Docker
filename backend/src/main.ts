import { join } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    
    // Enable CORS for development
    if (process.env.NODE_ENV !== 'production') {
        app.enableCors({
            origin: 'http://localhost:5173', // Vite's default port
            credentials: true,
        });
    }
    
    if (process.env.NODE_ENV === 'production') {
        app.useStaticAssets(join(__dirname, '..', '..', 'frontend', 'dist'));
    }
    
    await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
