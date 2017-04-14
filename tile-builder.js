const fs = require('fs');
const geojson2mvt = require('geojson2mvt');

const options = require('./options.json');

// get data source options, if any
const isArgument = process.argv[2] ? true : false;

const outputDirectory = './static_tiles';

try {fs.mkdirSync(outputDirectory, 0777);} // create the output directory
catch(err){
    if (err.code !== 'EEXIST') console.error(err);
}

function cutTiles(err, datasets) {
  datasets = datasets.filter(dataset => !(/(^|\/)\.[^\/\.]/g).test(dataset))

  datasets.forEach((dataset) => {
    const filePath = `./source_data/${dataset}`; // path to geojson

    const geoJson = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const extendedOptions = Object.assign(options, { rootDir: `${outputDirectory}/${dataset.split('.')[0]}` });

    geojson2mvt(geoJson, options);
  });
}

function cutSpecifiedTiles() {
  const args = process.argv.slice(2);
  console.log(args);
  args.forEach((dataset) => {
    const filePath = `./source_data/${dataset}.geojson`; // path to geojson
    // TODO check to see if the filePath exists, error out if not

    const geoJson = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const extendedOptions = Object.assign(options, { rootDir: `${outputDirectory}/${dataset}` });

    geojson2mvt(geoJson, extendedOptions);
  });
}


if (isArgument) {
  cutSpecifiedTiles();
} else {
  fs.readdir('./source_data', cutTiles);
}
