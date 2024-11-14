import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OssClient } from '@aps_sdk/oss';
import { AuthService } from '../auth/auth.service';
import { ModelDerivativeClient, OutputType, View } from '@aps_sdk/model-derivative';

@Injectable()
export class DataService {
    private readonly bucketKey: string;
    private readonly ossClient: OssClient = new OssClient();
    private readonly modelDerivativeClient: ModelDerivativeClient = new ModelDerivativeClient();

    constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {
        this.bucketKey = this.configService.get<string>('APS_BUCKET', `${authService.clientId}-basic-app`);
        // TODO: ensure bucket exists
    }

    async listObjects() {
        const { access_token: accessToken } = await this.authService.getInternalToken();
        let resp = await this.ossClient.getObjects(this.bucketKey, { limit: 64, accessToken });
        let objects = resp.items;
        while (resp.next) {
            const startAt = new URL(resp.next).searchParams.get('startAt');
            resp = await this.ossClient.getObjects(this.bucketKey, { limit: 64, startAt, accessToken });
            objects = objects.concat(resp.items);
        }
        return objects.map(o => ({
            name: o.objectKey,
            urn: this.urnify(o.objectId)
        }));
    }

    async uploadObject(objectKey: string, sourceFilePath: string) {
        const { access_token: accessToken } = await this.authService.getInternalToken();
        return this.ossClient.upload(this.bucketKey, objectKey, sourceFilePath, { accessToken });
    }

    async translateObject(urn: string) {
        const { access_token: accessToken } = await this.authService.getInternalToken();
        const job = await this.modelDerivativeClient.startJob({
            input: { // TODO: support zip files
                urn
            },
            output: {
                formats: [{
                    views: [View._2d, View._3d],
                    type: OutputType.Svf2
                }]
            }
        }, { accessToken });
        return job.result;
    }

    async getTranslationStatus(urn: string) {
        const { access_token: accessToken } = await this.authService.getInternalToken();
        return this.modelDerivativeClient.getManifest(urn, { accessToken });
    }

    urnify(objectId: string) {
        return Buffer.from(objectId).toString('base64').replace(/=/g, '');
    }
}
