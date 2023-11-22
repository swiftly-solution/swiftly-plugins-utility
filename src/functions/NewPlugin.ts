import { cpSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import { Config } from "../types/Config";
import { TasksStatus } from "../types/TasksStatus";
import GenerateTasks from "../tasks/GenerateTasks";
import UpdateTask from "../tasks/UpdateTask";

export default async (config: Config, plugin_name: string) => {
    const task = await GenerateTasks(config.webhooks_discord_notifications.create_plugin, "Create Plugin");
    const tasks: TasksStatus = {
        [`Creating Files for plugin "${plugin_name}"`]: {
            status: "waiting",
            startedTime: 0,
            endTime: 0
        }
    }
    await UpdateTask(task, "Create Plugin", tasks);

    console.log(`[Swiftly] [Plugins] Creating files for plugin "${plugin_name}"...`)

    tasks[`Creating Files for plugin "${plugin_name}"`].startedTime = Date.now();
    tasks[`Creating Files for plugin "${plugin_name}"`].status = "working";
    await UpdateTask(task, "Create Plugin", tasks);

    try {
        cpSync(`./template_plugin`, `./${plugin_name}`, { recursive: true });

        writeFileSync(`./${plugin_name}/Makefile`, readFileSync(`./${plugin_name}/Makefile`).toString().replace(/PLUGIN_NAME/g, plugin_name).replace(/CONFIG_CC_COMMAND/g, config[config.os].cc).replace(/CONFIG_CXX_COMMAND/g, config[config.os].cxx))
        writeFileSync(`./${plugin_name}/src/main.cpp`, readFileSync(`./${plugin_name}/src/main.cpp`).toString().replace(/PLUGIN_NAME/g, plugin_name))
        writeFileSync(`./${plugin_name}/.github/workflows/build.yml`, readFileSync(`./${plugin_name}/.github/workflows/build.yml`).toString().replace(/PLUGIN_NAME/g, plugin_name))

        tasks[`Creating Files for plugin "${plugin_name}"`].endTime = Date.now();
        tasks[`Creating Files for plugin "${plugin_name}"`].status = "done";
        await UpdateTask(task, "Create Plugin", tasks);

        console.log(`[Swiftly] [Plugins] All files has been succesfully created for "${plugin_name}". (${tasks[`Creating Files for plugin "${plugin_name}"`].endTime - tasks[`Creating Files for plugin "${plugin_name}"`].startedTime}ms)`)
    } catch (err) {
        tasks[`Creating Files for plugin "${plugin_name}"`].endTime = Date.now();
        tasks[`Creating Files for plugin "${plugin_name}"`].status = "failed";
        await UpdateTask(task, "Create Plugin", tasks);

        console.log(`[Swiftly] [Plugins] Couldn't create the files for plugin "${plugin_name}". (${tasks[`Creating Files for plugin "${plugin_name}"`].endTime - tasks[`Creating Files for plugin "${plugin_name}"`].startedTime}ms)\nError: ${err}`)
    }
}