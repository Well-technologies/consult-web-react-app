import { EnvironmentType, ServiceConfig } from './config.types';

export const devServiceConfig: ServiceConfig = {
  environment: EnvironmentType.Dev,
  core: {
    api: 'https://admin-api-dev.flash.health/api/v1/',
  },
  consult: {
    api: 'https://api-dev.flash.health/consult/api/v1/',
    socket: 'https://api-dev.flash.health/init',
    turnServer: 'turn:turn-staging.flash.health',
    stunServer: 'stun:stun-staging.flash.health',
    turnServerConfig: {
      username: 'flash-stacging-client',
      credential: '0TUIqNBGvjotymnTHnHiZepqTSt2Qyr1',
    },
    whatsAppFirstAdviceNo: '15550256153',
  },
  
};
