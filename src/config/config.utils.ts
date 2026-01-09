import {
  devServiceConfig,
  prodServiceConfig,
  stagingServiceConfig,
} from '@/config';
import { EnvironmentType } from '@/config/config.types';

export const getDefaultEnvironmentByType = (
  environmentType: EnvironmentType
) => {
  switch (environmentType) {
    case EnvironmentType.Dev:
      return devServiceConfig;

    case EnvironmentType.Staging:
      return stagingServiceConfig;

    case EnvironmentType.Prod:
      return prodServiceConfig;

    default:
      return stagingServiceConfig;
  }
};
