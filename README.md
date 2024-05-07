<p align="center">
  <a href="https://github.com/swiftly-solution/swiftly-plugins-utility">
    <img src="https://sttci.b-cdn.net/status.swiftlycs2.net/2105/logo.png" alt="Swiftly Private Message Logo" width="600" height="131">
  </a>

  <h3 align="center">[Swiftly] Plugins Utility</h3>

  <p align="center">
    Plugins Utility built for developers who want to use C++ for coding plugins in Swiftly.
    <br/>
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/github/downloads/swiftly-solution/swiftly-plugins-utility/total" alt="Downloads"> 
  <img src="https://img.shields.io/github/contributors/swiftly-solution/swiftly-plugins-utility?color=dark-green" alt="Contributors">
  <img src="https://img.shields.io/github/issues/swiftly-solution/swiftly-plugins-utility" alt="Issues">
  <img src="https://img.shields.io/github/license/swiftly-solution/swiftly-plugins-utility" alt="License">
</p>
<p align="center">
  <img src="https://github.com/swiftly-solution/swiftly-plugins-utility/actions/workflows/main.yml/badge.svg" alt="WorkFlow">
</p>

---

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

Well, the plugins are designed to be compiled using Github Actions, but you can also compile them using Docker.

## How to build plugins using Docker? (Plugins for Linux Verison)

You need to install [Docker for Windows](https://docs.docker.com/desktop/install/windows-install/) and use the following command in the Terminal opened in the folder of the plugin:

**(!)** Replace `PLUGIN_NAME` with your plugin name, for example: `swiftly_shop`

```
docker run --rm -it -e "FOLDER=PLUGIN_NAME" -v .:/tempfolder/PLUGIN_NAME ghcr.io/swiftly-solution/swiftly:plugin-cross-compiler
```

## How to build plugins using Docker? (Plugins for Windows Version)

You need to install [MSYS2](https://www.msys2.org/) and [Make for Windows](https://gnuwin32.sourceforge.net/packages/make.htm). After you install them and ensure that they're available via PATH, use the following command in the Terminal opened in the folder of the plugin:

```
make
```

## How to build plugins using Github Actions?

Simple, you just need to create a repository, upload your files on GitHub using [Git CLI](https://git-scm.com/downloads) and the instructions presented on the first page of the repository.

(!) If you upload the files via Web File Uploader your need to manually install the workflows file.

To simplify your work, you can use [Visual Studio Code](https://code.visualstudio.com/) which automatically has integrated an easy-to-use Github CLI interface.

---
