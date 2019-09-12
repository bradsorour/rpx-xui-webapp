export default {
    logging: 'debug',
    protocol: 'http',
    proxy: {
        host: '172.16.0.7',
        port: 8080,
    },
    secureCookie: false,
    services: {
        ccd: {
            componentApi: 'https://ccd-api-gateway-web-aat.service.core-compute-aat.internal',
            dataApi: 'https://ccd-data-store-api-aat.service.core-compute-aat.internal',
        },
        documents: {
            api: 'https://dm-store-aat.service.core-compute-aat.internal',
        },
        idam: {
            idamApiUrl: 'https://idam-api.ithc.platform.hmcts.net',
            idamClientID: 'xuiwebapp',
            idamLoginUrl: 'https://idam-web-public.ithc.platform.hmcts.net',
            indexUrl: '/',
            oauthCallbackUrl: 'oauth2/callback',
        },
    },
    sessionSecret: 'secretSauce',
}
