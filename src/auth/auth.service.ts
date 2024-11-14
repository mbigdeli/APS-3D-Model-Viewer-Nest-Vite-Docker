import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthenticationClient, Scopes } from '@aps_sdk/authentication';

@Injectable()
export class AuthService {
    public readonly clientId: string;
    private readonly clientSecret: string;
    private readonly authenticationClient: AuthenticationClient = new AuthenticationClient();

    constructor(private readonly configService: ConfigService) {
        this.clientId = this.configService.getOrThrow<string>('APS_CLIENT_ID');
        this.clientSecret = this.configService.getOrThrow<string>('APS_CLIENT_SECRET');
    }

    async getPublicToken() {
        // TODO: cache
        return this.authenticationClient.getTwoLeggedToken(this.clientId, this.clientSecret, [Scopes.DataRead]);
    }

    async getInternalToken() {
        // TODO: cache
        return this.authenticationClient.getTwoLeggedToken(this.clientId, this.clientSecret, [Scopes.BucketRead, Scopes.BucketCreate, Scopes.DataRead, Scopes.DataWrite]);
    }
}
