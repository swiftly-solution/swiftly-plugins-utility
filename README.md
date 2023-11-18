# Swiftly Plugins Utility

![workflow](https://github.com/swiftly-solution/swiftly-plugins-utility/actions/workflows/main.yml/badge.svg)

This command line executable enables you to easily generate Swiftly Plugins within seconds.

# Requirements

## Windows

# Installation

First, you need to generate it's config file using `./swiftly_utility --genconfig`.

![](https://cdn.skuzzi.ro/924azujmuaew3fgeaatj7vpi7futnlmc.gif)

After succesfully creating the configuration, you can use `./swiftly_utility --new [PLUGIN_NAME]` to create a plugin.

![](https://cdn.skuzzi.ro/e0h61jzkvzw0mzxzzempnhmiyekmw6pq.gif)

# Usage

You can use `./swiftly_utility --help` to see the help menu of the executable.

```

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
                                                               ░░░░░░
Usage: swiftly_utility [options]

CS2 Swiftly Plugin Utility

Options:
  -V, --version            output the version number
  -n, --new <plugin_name>  Creates a new plugin
  -c, --check              Check the settings for the compiler
  -g, --genconfig          Generate base configuration
  -h, --help               display help for command
```

# How to compile plugins?

Well, the plugins are designed to be compiled using Github Actions. If you're a geek and you know what you're doing, you can install [MSYS2](https://www.msys2.org/) to compile plugins for Windows and [WSL Ubuntu 20.04](https://www.microsoft.com/store/productId/9MTTCL66CPXJ?ocid=pdpshare).

## How to build plugins using Github Actions?

Simple, you just need to create a repository, upload your files on GitHub using [Git CLI](https://git-scm.com/downloads) and the instructions presented on the first page of the repository.

(!) If you upload the files via Web File Uploader your need to manually install the workflows file.

To simplify your work, you can use [Visual Studio Code](https://code.visualstudio.com/) which automatically has integrated an easy-to-use Github CLI interface.
