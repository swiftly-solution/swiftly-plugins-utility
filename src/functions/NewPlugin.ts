import { mkdirSync, writeFileSync } from "fs"
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
		mkdirSync(`${plugin_name}`);
		mkdirSync(`${plugin_name}/src`, { recursive: true });
		mkdirSync(`${plugin_name}/includes`, { recursive: true });
		writeFileSync(`${plugin_name}/Makefile`, `CC_COMMAND = gcc
CXX_COMMAND = g++
PROJECT_NAME = TEST_PROJECT

CURRENT_PATH=$(realpath .)
SRC_DIR := src
BUILD_DIR := output
TEMP_DIR := temp
LIBS_DIR := lib
INCLUDES_FOLDER := $(CURRENT_PATH)/includes
LIB_FILES :=
ifeq ($(OS),Windows_NT)
	LIB_FILES += "$(CURRENT_PATH)../lib/swiftly.lib"
else
	LIB_FILES += "$(CURRENT_PATH)../lib/swiftly.a"
endif

CC_FLAGS = -I"$(INCLUDES_FOLDER)" -I"$(CURRENT_PATH)../includes/"
CXX_FLAGS = -I"$(INCLUDES_FOLDER)" -I"$(CURRENT_PATH)../includes/"

rwildcard=$(wildcard $1$2) $(foreach d,$(wildcard $1*),$(call rwildcard,$d/,$2))

SRC_FILES := $(call rwildcard,$(SRC_DIR),*.cpp)
TEMP_OBJS_FILES = $(subst /,_,$(patsubst %.cpp, %.o, $(SRC_FILES)))
OBJS_FILES = $(patsubst %o,$(TEMP_DIR)/%o,$(TEMP_OBJS_FILES))

define COMPILE_FILE
	$(CXX_COMMAND) $(CXX_FLAGS) -o $(TEMP_DIR)/$(subst /,_,$(subst .cpp,.o,$(1))) -c $(1)
endef

build:
ifeq ($(OS),Windows_NT)
	@rd /s /q $(BUILD_DIR) 2>NUL || (echo)
else
	@rm -rf $(BUILD_DIR)
endif
	mkdir $(TEMP_DIR)
	$(foreach src,$(SRC_FILES),$(call COMPILE_FILE,$(src)))
	mkdir $(BUILD_DIR)
	$(CXX_COMMAND) -shared $(CXX_FLAGS) -o $(BUILD_DIR)/$(PROJECT_NAME).dll $(OBJS_FILES)
ifeq ($(OS),Windows_NT)
	@rd /s /q $(TEMP_DIR) 2>NUL || (echo)
else
	@rm -rf $(TEMP_DIR)
endif`)
		writeFileSync(`${plugin_name}/src/main.cpp`, `
#include <main.h>

void OnPluginStart()
{
}

void OnPluginStop()
{
}
		`);
		writeFileSync(`${plugin_name}/includes/main.h`, `
#ifdef __cplusplus
extern "C"
{
#endif
	void OnPluginStart();
	void OnPluginStop();
#ifdef __cplusplus
}
#endif
		`);

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