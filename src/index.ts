import { Command } from 'commander';
import NewPlugin from './functions/NewPlugin';
import TestCompiler from './functions/TestCompiler';
import { Config } from './types/Config';
import { existsSync, readFileSync } from 'fs';
import GenerateConfig from './functions/GenerateConfig';

const program = new Command();

console.log(`
  █████████                   ███     ██████   █████    ████
 ███░░░░░███                 ░░░     ███░░███ ░░███    ░░███
░███    ░░░  █████ ███ █████ ████   ░███ ░░░  ███████   ░███  █████ ████
░░█████████ ░░███ ░███░░███ ░░███  ███████   ░░░███░    ░███ ░░███ ░███
 ░░░░░░░░███ ░███ ░███ ░███  ░███ ░░░███░      ░███     ░███  ░███ ░███
 ███    ░███ ░░███████████   ░███   ░███       ░███ ███ ░███  ░███ ░███
░░█████████   ░░████░████    █████  █████      ░░█████  █████ ░░███████
 ░░░░░░░░░     ░░░░ ░░░░    ░░░░░  ░░░░░        ░░░░░  ░░░░░   ░░░░░███
                                                               ███ ░███
                                                              ░░██████
                                                               ░░░░░░`)

program.version("1.0.0").nameFromFilename(process.argv[0]).description("CS2 Swiftly Plugin Utility").option("-n, --new <plugin_name>", "Creates a new plugin").option("-c, --check", "Check the settings for the compiler").option("-g, --genconfig", "Generate base configuration").parse(process.argv);

const options = program.opts();
const config: Config = JSON.parse(existsSync("config.json") ? readFileSync("config.json").toString() : "{}") as Config;

if (!config.os && !options.genconfig) {
    console.log(`[Swiftly] [Configuration] Please use "${process.argv[0]} --genconfig" to use the utility.`)
} else if (!process.argv.slice(2).length) {
    program.outputHelp();
} else {
    if (options.new) NewPlugin(config, options.new);
    else if (options.check) TestCompiler(config);
    else if (options.genconfig) GenerateConfig();
}