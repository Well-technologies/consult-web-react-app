import { EnvironmentType, ServiceConfig } from './config.types';

export const prodServiceConfig: ServiceConfig = {
  environment: EnvironmentType.Prod,
  core: {
    api: 'https://admin-api.flash.health/api/v1/',
  },
  consult: {
    api: 'https://api.flash.health/consult/api/v1/',
    socket: 'https://api.flash.health/init',
    turnServer: 'turn:turn.flash.health',
    stunServer: 'stun:stun.flash.health',
    turnServerConfig: {
      username: 'flash-prod-client',
      credential: '3dMRlCrpXDSo5ib1JeYWooOLjp4lOnFx',
    },
    whatsAppFirstAdviceNo: '94769033847',
  },
};
