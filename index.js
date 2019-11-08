import 'ol/ol.css';
import { Map, View } from 'ol';
// import TileLayer from 'ol/layer/Tile';
// import Stamen from 'ol/source/Stamen';
import MVT from 'ol/format/MVT';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import olms from 'ol-mapbox-style';
import { applyStyle } from 'ol-mapbox-style';

import { fromLonLat, get as getProjection} from 'ol/proj';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4'; 

let mapCenter = [-71.091, 42.376]
let newProjCode = "EPSG:2249"
let newProj4Def = "+proj=lcc +lat_1=42.68333333333333 +lat_2=41.71666666666667 +lat_0=41 +lon_0=-71.5 +x_0=200000.0001016002 +y_0=750000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=us-ft +no_defs"

proj4.defs(newProjCode, newProj4Def);
register(proj4)

let newProj = getProjection(newProjCode);
let projCenter = fromLonLat(mapCenter, newProj);

let mb_token = 'pk.eyJ1IjoiZXJpY21odW50bGV5IiwiYSI6ImNqcjBxd2x3NjBkdXo0OW84NDA5M2cwN3EifQ.qAS-0osBW-VJyj0VHztHUg'

const map = new Map({
    target: 'map',
    view: new View({
        projection: newProj,
        center: projCenter,
        zoom: 7
    })
});

fetch('https://api.mapbox.com/styles/v1/ericmhuntley/ck2p4xq8l0qr21cqurh0g9k3s?access_token=pk.eyJ1IjoiZXJpY21odW50bGV5IiwiYSI6ImNqcjBxd2x3NjBkdXo0OW84NDA5M2cwN3EifQ.qAS-0osBW-VJyj0VHztHUg').then(function(response){
    response.json().then(function(style) {
        // console.log(style)
        let tiles = new VectorTileLayer({
            source: new VectorTileSource({
                attributions: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ' +
                    '© <a href="https://www.openstreetmap.org/copyright">' +
                    'OpenStreetMap contributors</a>',
                format: new MVT(),
                url: 'http://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/' +
                    '{z}/{x}/{y}.mvt?style=mapbox://styles/ericmhuntley/ck2p4xq8l0qr21cqurh0g9k3s@00&access_token=' + mb_token
            })
        });
        console.log(style);
        map.addLayer(tiles);
        applyStyle(tiles, style, 'ck2p4xq8l0qr21cqurh0g9k3s');
    });
});

// olms(map, 'https://api.mapbox.com/styles/v1/ericmhuntley/ck2p4xq8l0qr21cqurh0g9k3s?access_token=pk.eyJ1IjoiZXJpY21odW50bGV5IiwiYSI6ImNqcjBxd2x3NjBkdXo0OW84NDA5M2cwN3EifQ.qAS-0osBW-VJyj0VHztHUg')

// fetch("https://api.mapbox.com/styles/v1/ericmhuntley/ck2p4xq8l0qr21cqurh0g9k3s?access_token=pk.eyJ1IjoiZXJpY21odW50bGV5IiwiYSI6ImNqcjBxd2x3NjBkdXo0OW84NDA5M2cwN3EifQ.qAS-0osBW-VJyj0VHztHUg").then(function(response) {
//     response.json().then(function(glStyle) {
//       stylefunction(tiles, glStyle, 'states');
//     });
//   });