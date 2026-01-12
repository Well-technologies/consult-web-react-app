import { EnvironmentType, ServiceConfig } from './config.types';

export const stagingServiceConfig: ServiceConfig = {
  environment: EnvironmentType.Staging,
  core: {
    api: process.env.REACT_FLASH_ADMIN_API_ENDPOINT || '',
  },
  consult: {
    api: process.env.REACT_CONSULT_API_ENDPOINT || '',
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
