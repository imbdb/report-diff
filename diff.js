const looksSame = require('looks-same');
const { loadImage, createCanvas } = require('canvas');

async function diff(image1Path, image2Path, diffImagePath){
    const {
        equal, diffBounds, diffClusters
    } = await looksSame(image1Path, image2Path, {shouldCluster: true, clustersSize: 10});
    if (equal) {
        console.log('The images are equal.');
        return;
    }
    const image = await loadImage(image2Path);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    console.log("Differences:", diffClusters.length);
    // draw rectangles on image 1 using the cluster coordinates using canvas
    diffClusters.forEach(cluster => {
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 2;
        ctx.strokeRect(cluster.left,cluster.top, cluster.right-cluster.left, cluster.bottom-cluster.top);
    });
    // create a new canvas and draw image 1 and image 2 side by side
    const canvas2 = createCanvas(image.width * 2 + 10, image.height);
    const ctx2 = canvas2.getContext('2d');
    const image1 = await loadImage(image1Path);
    ctx2.drawImage(image1, 0, 0);
    ctx2.drawImage(canvas, image.width + 10, 0);
    // save the image with rectangles
    const fs = require('fs/promises');
    await fs.writeFile(diffImagePath, canvas2.toBuffer('image/png'));
    console.log('The diff image created.');
}

module.exports = {diff};