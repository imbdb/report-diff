# Visually Compare web pages

# Usage

## Installation

```shell
npm i
```
_Canvas might cause some installation issues on windows,WSL recommended_

Read this wiki if getting `ERR_DLOPEN` error, It has installation guide.

https://github.com/Automattic/node-canvas/wiki

## Add URLs to the index.js file

Open `index.js` and add your urls in the topics object.

then run the script using

```shell
node index.js
```

This will open puppeteer for taking screenshots of the page and then it can also create diff of those images if you run it next time.

All images will be stored in `images` directory.
