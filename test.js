const {readdirChronoSorted} = require('./utils')

async function test() {
    const files = await readdirChronoSorted('./images/agile', 1);
    console.log(files);
}
test();
