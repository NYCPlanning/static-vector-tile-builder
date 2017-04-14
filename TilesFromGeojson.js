const fs = require('fs');
const geojson2mvt = require('geojson2mvt');

// get data source options, if any
const isArgument = process.argv[2] ? true : false;

function cutTiles(err, datasets) {
  datasets.forEach((dataset) => {
    const dirPath = `./config/${dataset.split('.')[0]}`;
    const config = require(dirPath + '/data.json');

    const filePath = `./static_tiles_src/geojson/${config.source}`; // path to geojson

    const options = {
      rootDir: `./static_tiles/${config.name}`, // set root dir for tile pyramid
      bbox: [40.426042, -74.599228, 40.884448, -73.409958], // [south,west,north,east]
      zoom: {
        min: 10,
        max: 10,
      },
      layerName: 'layer0',
    };

    geojson2mvt(filePath, options);
  });
}

function cutSpecifiedTiles() {
  const args = process.argv.slice(2);
  args.forEach((dataset) => {
    const dirPath = `./config/${dataset}`;
    const config = require(dirPath + '/data.json');

    const filePath = `./static_tiles_src/geojson/${config.source}`; // path to geojson

    const options = {
      rootDir: `./static_tiles/${config.name}`, // set root dir for tile pyramid
      bbox: [40.426042, -74.599228, 40.884448, -73.409958], // [south,west,north,east]
      zoom: {
        min: 10,
        max: 10,
      },
      layerName: 'layer0',
    };

    geojson2mvt(filePath, options);
  });
}

if (isArgument) {
  cutSpecifiedTiles();
} else {
  fs.readdir('./static_tiles_src/geojson', cutTiles);
}
