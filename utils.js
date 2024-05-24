const fs = require('fs/promises');
const path = require('path');

async function readdirChronoSorted(dirpath, order) {
  order = order || 1;
  const files = await fs.readdir(dirpath);
  const stats = await Promise.all(
    files.map((filename) =>
      fs.stat(path.join(dirpath, filename))
        .then((stat) => ({ filename, mtime: stat.mtime }))
    )
  );
  return stats.sort((a, b) =>
    order * (b.mtime.getTime() - a.mtime.getTime())
  ).map((stat) => stat.filename);
}

function randomString(length) {
    // return random string of length
    return Math.random().toString(36).substring(2, 2 + length);
}

function dateUniq(){
    // return formatted date hh-mm-ss-dd-mm-yyyy
    const date = new Date();
    return `${randomString(5)}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
}

async function getImageNameForTopic(topic){
    const dir = require('path').join(__dirname, 'images', topic);
    await fs.mkdir(dir, {recursive: true});
    return `${dir}/${topic}-${dateUniq()}.png`
}

async function getDiffImageNameForTopic(topic, image1, image2){
    const dir = require('path').join(__dirname, 'images', topic, 'diffs');
    await fs.mkdir(dir, {recursive: true});
    image1 = image1.split('/').pop().split('.').shift();
    image2 = image2.split('/').pop().split('.').shift();
    return `${dir}/${topic}-${image1}-${image2}.png`
}

async function getLastImageForTopic(topic){
    
    const path = require('path');
    const dir = path.join(__dirname, 'images', topic);
    const files = await readdirChronoSorted(dir);
    if (!files.length) return null;
    const lastImage = files.filter(file => file.endsWith('.png'))[0];
    return path.join(dir, lastImage);
}

module.exports = {
    getImageNameForTopic,
    getLastImageForTopic,
    getDiffImageNameForTopic,
    readdirChronoSorted
}