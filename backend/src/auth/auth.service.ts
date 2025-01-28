import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthenticationClient, Scopes } from '@aps_sdk/authentication';

@Injectable()
export class AuthService {
    public readonly clientId: string;
    private readonly clientSecret: string;
    private readonly authenticationClient: AuthenticationClient = new AuthenticationClient();

    constructor(private readonly configService: ConfigService) {
        this.clientId = process.env.APS_CLIENT_ID as string;
        this.clientSecret = process.env.APS_CLIENT_SECRET as string;
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
