export declare enum EnvironmentType {
    Prod = "Prod",
    Staging = "Staging",
    Dev = "Dev"
}
export type CoreServiceConfig = {
    api: string;
};
export type ConsultServiceConfig = Pick<CoreServiceConfig, 'api'> & {
    socket: string;
    turnServer: string;
    stunServer: string;
    turnServerConfig: {
        username: string;
        credential: string;
    };
    whatsAppFirstAdviceNo: string;
};
export type ServiceConfig = {
    environment: EnvironmentType;
    core: CoreServiceConfig;
    consult: ConsultServiceConfig;
};
