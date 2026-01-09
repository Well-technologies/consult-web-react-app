import { EnvironmentType, ServiceConfig } from './config.types';

export const stagingServiceConfig: ServiceConfig = {
  environment: EnvironmentType.Staging,
  core: {
    api: 'https://admin-api-staging.flash.health/api/v1/',
  },
  consult: {
    api: 'https://api-staging.flash.health/consult/api/v1/',
    socket: 'https://api-staging.flash.health/init',
    turnServer: 'turn:turn-staging.flash.health',
    stunServer: 'stun:stun-staging.flash.health',
    turnServerConfig: {
      username: 'flash-stacging-client',
      credential: '0TUIqNBGvjotymnTHnHiZepqTSt2Qyr1',
    },
    whatsAppFirstAdviceNo: '15550256153',
  },
  };
