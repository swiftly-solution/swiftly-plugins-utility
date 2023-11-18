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
        mkdirSync(`${plugin_name}/lib`, { recursive: true });
        mkdirSync(`${plugin_name}/.github/workflows`, { recursive: true });
        writeFileSync(`${plugin_name}/Makefile`, `CC_COMMAND = ${config[config.os].cc}
CXX_COMMAND = ${config[config.os].cxx}
PROJECT_NAME = ${plugin_name}

CURRENT_PATH=$(realpath .)
BEHIND_PATH=$(realpath ..)
SRC_DIR := src
BUILD_DIR := output
TEMP_DIR := temp
LIBS_DIR := lib
INCLUDES_FOLDER := $(CURRENT_PATH)/includes

CC_FLAGS = -I"$(INCLUDES_FOLDER)" -I"$(BEHIND_PATH)/includes"
CXX_FLAGS := -I"$(INCLUDES_FOLDER)" -I"$(BEHIND_PATH)/includes" -lpthread

ifneq ($(OS),Windows_NT)
    CXX_FLAGS := $(CXX_FLAGS) -fPIC
endif

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
    @rd /s /q $(TEMP_DIR) 2>NUL || (echo)
else
    @rm -rf $(BUILD_DIR)
    @rm -rf $(TEMP_DIR)
endif
    mkdir $(TEMP_DIR)
    $(foreach src,$(SRC_FILES),$(call COMPILE_FILE,$(src)))
    mkdir $(BUILD_DIR)

ifeq ($(OS),Windows_NT)
    $(CXX_COMMAND) -shared $(CXX_FLAGS) -o $(BUILD_DIR)/$(PROJECT_NAME).dll $(OBJS_FILES)
else
    $(CXX_COMMAND) -shared $(CXX_FLAGS) -o $(BUILD_DIR)/$(PROJECT_NAME).so $(OBJS_FILES)
endif

ifeq ($(OS),Windows_NT)
    @rd /s /q $(TEMP_DIR) 2>NUL || (echo)
else
    @rm -rf $(TEMP_DIR)
endif`)
        writeFileSync(`${plugin_name}/src/main.cpp`, `#include <swiftly/swiftly.h>
#include <swiftly/server.h>
#include <swiftly/database.h>
#include <swiftly/commands.h>
#include <swiftly/configuration.h>
#include <swiftly/logger.h>

#include <main.h>

Server *server = nullptr;
PlayerManager *g_playerManager = nullptr;
Database *db = nullptr;
Commands *commands = nullptr;
Configuration *config = nullptr;
Logger *logger = nullptr;

void OnProgramLoad(const char *pluginName, const char *mainFilePath)
{
    Swiftly_Setup(pluginName, mainFilePath);

    server = new Server();
    g_playerManager = new PlayerManager();
    commands = new Commands(pluginName);
    config = new Configuration();
    logger = new Logger(mainFilePath, pluginName);
}

void OnPluginStart()
{
}

void OnPluginStop()
{
}

bool OnClientConnected(Player *player)
{
    return true;
}

bool OnClientConnect(Player *player)
{
    return true;
}

void OnPlayerSpawn(Player *player)
{
}

void OnGameTick(bool simulating, bool bFirstTick, bool bLastTick)
{
}

bool OnPlayerChat(Player *player, const char *text, bool teamonly)
{
    return true;
}

const char *GetPluginAuthor()
{
    return "";
}

const char *GetPluginVersion()
{
    return "1.0.0";
}

const char *GetPluginName()
{
    return "${plugin_name}";
}

const char *GetPluginWebsite()
{
    return "";
}`);

        writeFileSync(`${plugin_name}/includes/main.h`, `#ifndef _main_h
#define _main_h

#include <stdint.h>
#include <swiftly/swiftly.h>

void OnPluginStart();
void OnPluginStop();
void OnProgramLoad(const char *pluginName, const char *mainFilePath);
bool OnClientConnected(Player *player);
bool OnClientConnect(Player *player);
void OnPlayerSpawn(Player *player);
void OnGameTick(bool simulating, bool bFirstTick, bool bLastTick);
bool OnPlayerChat(Player *player, const char *text, bool teamonly);

extern "C"
{
    void Internal_OnPluginStart()
    {
        print("");
        OnPluginStart();
    }
    void Internal_OnPluginStop()
    {
        OnPluginStop();
    }
    void Internal_OnProgramLoad(const char *pluginName, const char *mainFilePath)
    {
        OnProgramLoad(pluginName, mainFilePath);
    }
    bool Internal_OnClientConnected(uint32_t slot)
    {
        Player *player = g_playerManager->GetPlayer(slot);
        if (player == nullptr)
            return false;

        return OnClientConnected(player);
    }
    bool Internal_OnClientConnect(uint32_t slot)
    {
        Player *player = g_playerManager->GetPlayer(slot);
        if (player == nullptr)
            return false;

        return OnClientConnect(player);
    }
    void Internal_OnPlayerSpawn(uint32_t slot)
    {
        Player *player = g_playerManager->GetPlayer(slot);
        if (player == nullptr)
            return;

        OnPlayerSpawn(player);

        if (player->IsFirstSpawn())
            player->SetFirstSpawn(true);
    }
    bool Internal_OnPlayerChat(uint32_t slot, const char *text, bool teamonly)
    {
        Player *player = g_playerManager->GetPlayer(slot);
        if (player == nullptr)
            return false;

        return OnPlayerChat(player, text, teamonly);
    }
    void Internal_RegisterPlayer(uint32_t slot, bool fakeClient)
    {
        g_playerManager->RegisterPlayer(new Player(slot, fakeClient));
    }
    void Internal_OnGameTick(bool simulating, bool bFirstTick, bool bLastTick)
    {
        OnGameTick(simulating, bFirstTick, bLastTick);
    }
    const char *GetPluginAuthor();
    const char *GetPluginVersion();
    const char *GetPluginName();
    const char *GetPluginWebsite();
}

#endif
        `);

        writeFileSync(`${plugin_name}/.github/workflows/build.yml`, `name: "dev_plugin Compiler"

on:
    push:
        branches:
            - "*"
    pull_request:

jobs:
    build:
        name: Build
        runs-on: \${{ matrix.os }}

        container: \${{ matrix.container }}
        strategy:
            fail-fast: false
            matrix:
                os: [ubuntu-latest, windows-latest]
                include:
                    - os: windows-latest
                    - os: ubuntu-latest
                        container: registry.gitlab.steamos.cloud/steamrt/sniper/sdk

        steps:
            - name: Checkout
                uses: actions/checkout@v4
                with:
                    path: ${plugin_name}
                    submodules: recursive

            - name: Checkout Swiftly
                uses: actions/checkout@v4
                with:
                    repository: swiftly-solution/swiftly
                    ref: master
                    path: swiftly

            - name: Installing Swiftly Scripting files
                run: |
                    cd swiftly; mv plugin_files/scripting/* ..; cd ..

            - name: Build
                working-directory: ${plugin_name}
                run: |
                    make

            - name: Upload Files - Linux
                if: matrix.os == 'ubuntu-latest'
                uses: actions/upload-artifact@v3
                with:
                    name: ${plugin_name} Plugin - Linux
                    path: \${{ github.workspace }}/${plugin_name}/output/${plugin_name}.so

            - name: Upload Files - Windows
                if: matrix.os == 'windows-latest'
                uses: actions/upload-artifact@v3
                with:
                    name: ${plugin_name} Plugin - Windows
                    path: \${{ github.workspace }}/${plugin_name}/output/${plugin_name}.dll
        `)

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