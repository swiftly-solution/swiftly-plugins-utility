import { unlinkSync, writeFileSync } from "fs"
import { Config } from "../types/Config"
import { execSync } from "child_process"
import GenerateTasks from "../tasks/GenerateTasks"
import { TasksStatus } from "../types/TasksStatus"
import UpdateTask from "../tasks/UpdateTask"

export default async (config: Config) => {
    const task = await GenerateTasks(config.webhooks_discord_notifications.compiler_checker, "Testing Compiler");
    const tasks: TasksStatus = {
        "Testing C Compiler": {
            status: "waiting",
            startedTime: 0,
            endTime: 0
        },
        "Testing CXX Compiler": {
            status: "waiting",
            startedTime: 0,
            endTime: 0
        }
    }
    await UpdateTask(task, "Testing compiler", tasks);

    console.log(`[Swiftly] [Compiler] Testing C compiler using "${config[config.os].cc}"...`)

    tasks["Testing C Compiler"].startedTime = Date.now()
    tasks["Testing C Compiler"].status = "working";
    await UpdateTask(task, "Testing compiler", tasks);

    writeFileSync("compiler-test.c", `
    #include <stdio.h>
    #include <stdlib.h>
    
    int main()
    {
        #ifdef __clang__
            printf("clang\\n");
        #elif __GNUC__
            printf("gcc\\n");
        #elif _MSC_VER
            printf("msvc\\n");
        #else
            #error "Unrecognized compiler!"
        #endif

        printf("c");

        exit(0);
    }
    `)

    try {
        execSync(`${config[config.os].cc} compiler-test.c -o compiler_test_c`)
        tasks["Testing C Compiler"].endTime = Date.now()
        tasks["Testing C Compiler"].status = "done";
        await UpdateTask(task, "Testing compiler", tasks);
        console.log(`[Swiftly] [Compiler] C compiler testing passed. (${tasks["Testing C Compiler"].endTime - tasks["Testing C Compiler"].startedTime}ms)`)
    } catch (err: any) {
        tasks["Testing C Compiler"].endTime = Date.now()
        tasks["Testing C Compiler"].status = "failed";
        await UpdateTask(task, "Testing compiler", tasks);
        console.log(`[Swiftly] [Compiler] C compiler testing failed. (${tasks["Testing C Compiler"].endTime - tasks["Testing C Compiler"].startedTime}ms)\nError: ${err.stderr.toString()}`)
    }
    unlinkSync("compiler-test.c");
    try {
        unlinkSync("compiler_test_c.exe");
    } catch (err) { unlinkSync("compiler_test_c") }

    console.log(`[Swiftly] [Compiler] Testing CXX compiler using "${config[config.os].cxx}"...`)

    tasks["Testing CXX Compiler"].startedTime = Date.now()
    tasks["Testing CXX Compiler"].status = "working";
    await UpdateTask(task, "Testing compiler", tasks);

    writeFileSync("compiler-test.cpp", `
    #include <iostream>
    
    int main()
    {
        #ifdef __clang__
            printf("clang\\n");
        #elif __GNUC__
            printf("gcc\\n");
        #elif _MSC_VER
            printf("msvc\\n");
        #else
            #error "Unrecognized compiler!"
        #endif

        printf("cxx");

        return 0;
    }
    `)

    try {
        execSync(`${config[config.os].cxx} compiler-test.cpp -o compiler_test_cxx`)
        tasks["Testing CXX Compiler"].endTime = Date.now()
        tasks["Testing CXX Compiler"].status = "done";
        await UpdateTask(task, "Testing compiler", tasks);
        console.log(`[Swiftly] [Compiler] CXX compiler testing passed. (${tasks["Testing CXX Compiler"].endTime - tasks["Testing CXX Compiler"].startedTime}ms)`)
    } catch (err: any) {
        tasks["Testing CXX Compiler"].endTime = Date.now()
        tasks["Testing CXX Compiler"].status = "failed";
        await UpdateTask(task, "Testing compiler", tasks);
        console.log(`[Swiftly] [Compiler] CXX compiler testing failed. (${tasks["Testing CXX Compiler"].endTime - tasks["Testing CXX Compiler"].startedTime}ms)\nError: ${err.stderr.toString()}`)
    }
    unlinkSync("compiler-test.cpp");
    try {
        unlinkSync("compiler_test_cxx.exe");
    } catch (err) { unlinkSync("compiler_test_cxx") }
}