const { screenshot } = require('./screenshot');
const { getLastImageForTopic, getImageNameForTopic, getDiffImageNameForTopic } = require('./utils');
const { diff } = require('./diff');

async function report() {
    const topics = [
        { url: 'URL', name: 'spm' },
        { url: 'URL', name: 'cc' },
        { url: 'URL', name: 'agile' },
        { url: 'URL', name: 'sa' },
    ]

    for (let topic of topics) {
        const { url, name } = topic;
        console.log("Processing topic", name)
        const lastImage = await getLastImageForTopic(name);
        console.log("Last image", lastImage);
        const newImage = await getImageNameForTopic(name);
        console.log("New image", newImage);
        if (!lastImage) {
            await screenshot(url, newImage);
        } else {
            await screenshot(url, newImage);
            await diff(lastImage, newImage, await getDiffImageNameForTopic(name, lastImage, newImage));
        }
    }
}
report();