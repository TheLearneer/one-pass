# One pass

> Open source cross platform software to manage 2FA tokens from the comform of your desktop!

## Tech Stack & Technologies

The software uses the following tech stacks:

- [Electron](https://www.electronjs.org/): To develope cross platform desktop application
  - [Electron Store](https://www.npmjs.com/package/electron-store): Storing and retreival of persistent data (_i.e. saving of tokens_)
- [Vue.js](https://v3.vuejs.org/): Frontend javascript framework
- [Vite](https://vitejs.dev/): Frontend tooling
- [Otplib](https://www.npmjs.com/package/otplib): Core for handling 2FA regarding chores
- [Keytar](https://atom.github.io/node-keytar/): Securely storing and retreiving user's password

## Features

- **Open source**
- Completely secure (_all the secrets and password are stored on your local machine_)
- Free and unlimited

## TODO

The project is currently in very early stage of development (_yet already usable_). But there are stuffs to be done before it is production ready.

- [ ] Properly setup to build and publish the software for the supported platform through github releases
- [ ] Add support for export/import of secrets (_encrypted backup for usage across multiple devices_)
- [ ] Configure eslint
- [ ] And lot more possibilities
