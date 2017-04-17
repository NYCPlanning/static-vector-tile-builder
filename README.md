# tile-builder
A tool for generating vector tile pyramids from geojson data.

### Background
Map layers in the Capital Planning Platform like transportation geometries and administrative boundaries are being rendered as MapboxGL layers from local geojson data or from the Carto server in cartovector format. There are issues with both of these approaches: 

- Rendering from local geojson files requires that the entire file be loaded in the browser, which can be slow for larger data. 
- The cartovector format has issues rendering line geometries and can only be used for point data. 

This tool addresses these issues, generating static vector tile trees from geojson data. It was designed to live on the application server and accessed by the Capital Planning Platform via an API. This allows the raw data and map tiles for these layers to remain isolated from both the app and the API, and for all spatial data types to be rendered quickly and accurately.

### Usage
Clone this repo and install dependencies.

`npm install`

Make sure the source data is in `./source_data` and is in geojson format.

To build vector tile trees for all data sources in `./source_data`, run:

`npm run build`

To build tile trees for specific data sources only--data that was just acquired, for example--add the name(s) of the geojson file(s) as arguments. You can pass as many of these data source arguments as you like.

`npm run build bus_routes bus_stops`

You will see the tile building process being logged in the terminal. The number of tiles created depends on the options set in `options.json`.

Tiles will be saved in `./static_tiles/{dataset}/{z}/{x}/{y}.mvt`. The `./static_tiles` directory is created the first time the script is run. `dataset` is the name of the dataset, such as `bus_stops`. The rest of the folder structure defines the zoom level and xy position for each tile.

#### Within the Capital Planning Platform
This repo and the tilesets the script generates live on the server alongside Docker containers for the Capital Planning Platform application and API. To use this tool for building static vector tiles to be used by the platform, **ADD STEPS HERE...** 

### TODO
In the future, it may be useful to allow for external data sources (URLs to geojson and possibly other data types). The source for each map layer could be defined in a config.
