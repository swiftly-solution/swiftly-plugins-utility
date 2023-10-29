export type OsType = "windows" | "linux";

export interface Config {
    os: OsType;
    linux: {
        cc: string;
        cxx: string;
    };
    windows: {
        cc: string;
        cxx: string;
    };
    webhooks_discord_notifications: {
        compiler_checker: string;
        create_plugin: string;
    };
}