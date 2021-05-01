#!/usr/bin/env node

const Spritesmith = require('spritesmith');
const globby = require('globby');
const { promisify } = require('util');
const fs = require('fs');
const { dirname, join, basename } = require('path');

const OUTPUT_FILE = '../spritesheets/characters.png';

const processCoordinates = (coords) =>
    Object.fromEntries(
        Object.entries(coords).map(([key, value]) => {
            const keyParts = key.split('/');
            const [state, characterName] = [
                keyParts.pop().replace(/\.png$/, ''),
                keyParts.pop().replace(/^Character\./, ''),
            ];
            return [`${characterName}.${state}`, value];
        })
    );

const main = async () => {
    const sprites = await globby('../renders/*/*.png');

    const outputDir = dirname(OUTPUT_FILE);
    await fs.promises.mkdir(outputDir, { recursive: true });
    const outputJson = join(outputDir, `${basename(OUTPUT_FILE, '.png')}.json`);

    const spritesmith = new Spritesmith();
    const createImages = promisify(spritesmith.createImages.bind(spritesmith));
    const images = await createImages(sprites);
    const result = spritesmith.processImages(images);
    const outputStream = fs.createWriteStream(OUTPUT_FILE);
    result.image.pipe(outputStream);

    const processedCoords = processCoordinates(result.coordinates);
    await fs.promises.writeFile(
        outputJson,
        JSON.stringify(processedCoords, false, 2)
    );
};

main().catch((e) => {
    console.error(e.stack);
    process.exit(1);
});
