## Getting Started

To run the project in dev mode, use any of the following commands
```bash
yarn dev
# or
npx ts-node src/index.ts
```

## Installing the Cli
1. Build the project by running the following command:
```bash
npm run build
```
This will compile the TypeScript code to JavaScript and generate a dist directory containing the executable code.
Note: If you are using a Unix-like operating system (like Mac or Linux), you will have to grant the dist/index.js the file permission to be executed

```bash
chmod +x dist/index.js
```
2. Install the binary globally using the following command:
```bash
npm install -g .
```
This will install the yt-downloader command globally, so that you can run it from anywhere on your system.

3. Test the installation by running the following command:
```bash
yt-downloader --help
```

## Stay in touch

- Author - [Ikem Ezechukwu](ikem.ezechukwu@outlook.com)
- LinkedIn - [https://www.linkedin.com/in/ikem-ezechukwu-547261109/](https://www.linkedin.com/in/ikem-ezechukwu-547261109/)


## License

Nest is [MIT licensed](LICENSE).