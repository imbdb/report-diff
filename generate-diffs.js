const {readdirChronoSorted, getDiffImageNameForTopic} = require('./utils')
const {diff} = require('./diff')
const path = require('path');

async function generate() {
    const files = (await readdirChronoSorted('./images/sa/', -1)).filter(file => file.endsWith('.png'));

    for (let i = 0; i < files.length - 2; i++) {
        console.log(files[i], files[i + 1]);
        const image1 = path.join(__dirname, 'images', 'sa', files[i]);
        const image2 = path.join(__dirname, 'images', 'sa', files[i + 1]);
        await diff(image1, image2, await getDiffImageNameForTopic('sa', image1, image2));
    }
}
generate();