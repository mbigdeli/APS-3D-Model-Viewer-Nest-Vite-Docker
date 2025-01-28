import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { DataService } from './data/data.service';
import { DataController } from './data/data.controller';

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [AuthController, DataController],
    providers: [AuthService, DataService],
})
export class AppModule { }
