import { writeFileSync } from "fs"

export default () => {
    const baseConfig = JSON.stringify({
        "os": process.platform == 'win32' ? "windows" : "linux",
        "windows": {
            "cc": "gcc",
            "cxx": "g++"
        },
        "linux": {
            "cc": "gcc",
            "cxx": "g++"
        },
        "webhooks_discord_notifications": {
            "compiler_checker": "",
            "create_plugin": ""
        }
    }, null, 4)

    try {
        writeFileSync("config.json", baseConfig);
        console.log(`[Swiftly] [Configuration] The configuration file has been succesfully written on the disk.`);
    } catch (err) {
        console.log(`[Swiftly] [Configuration] Couldn't write the configuration file on the disk.\nErorr: ${err}`);
    }
}