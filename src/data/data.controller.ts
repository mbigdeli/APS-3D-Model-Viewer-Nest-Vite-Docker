import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataService } from './data.service';

@Controller('api/data')
export class DataController {
    constructor(private readonly dataService: DataService) { }

    @Get()
    async getDesigns() {
        return this.dataService.listObjects();
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadDesign(@UploadedFile() file: Express.Multer.File) {
        const obj = await this.dataService.uploadObject(file.originalname, file.path);
        const urn = this.dataService.urnify(obj.objectId);
        await this.dataService.translateObject(urn);
        return { name: obj.objectKey, urn };
    }

    @Get(':urn/status')
    async getTranslationStatus(@Param('urn') urn: string) {
        try {
            const manifest = await this.dataService.getTranslationStatus(urn);
            let messages = [];
            if (manifest?.derivatives) {
                for (const derivative of manifest.derivatives) {
                    messages = messages.concat(derivative.messages || []);
                    if (derivative.children) {
                        for (const child of derivative.children) {
                            messages.concat(child.messages || []);
                        }
                    }
                }
            }
            return { status: manifest.status, progress: manifest.progress, messages };
        } catch (err) {
            return { status: 'n/a' };
        }
    }
}
