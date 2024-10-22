import { AuthConfig } from "angular-oauth2-oidc";

export const authConfig:AuthConfig={
    issuer:"https://accounts.google.com",
    redirectUri:window.location.origin,
    clientId:"",
    strictDiscoveryDocumentValidation:false,
    scope: 'openid profile email'
    //secret: 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
};