var map;
var layerControl;

var osm = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png");
var googleSat = L.tileLayer(
    "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
        maxZoom: 19,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }
);
map = L.map("mapid", {
    center: [45.099886, 24.368281],
    zoom: 16,
    layers: [osm],
});

var tbCladiriURL = "./src/tbCladiri.geojson";
var layerCladiri = new L.GeoJSON.AJAX(tbCladiriURL, {
    style: cladiriStyle,
    onEachFeature: onEachFeaturetbCladiri,
});
layerCladiri.on("data:loaded", function() {});

var tbParcariURL = "./src/tbParcari.geojson";
var layerParcari = new L.GeoJSON.AJAX(tbParcariURL, {
    style: parcariStyle,
    onEachFeature: onEachFeaturetbParcari,
});
layerParcari.on("data:loaded", function() {});

var tbParcariEtajateURL = "./src/tbParcariEtajate.geojson";
var layerParcariEtajate = new L.GeoJSON.AJAX(tbParcariEtajateURL, {
    style: parcariEtajateStyle,
});
layerParcariEtajate.on("data:loaded", function() {});

var tbSubzoneURL = "./src/tbSubzone.geojson";
var layerSubzone = new L.GeoJSON.AJAX(tbSubzoneURL, {
    style: subzoneStyle,
    onEachFeature: onEachFeaturetbSubzone,
});
layerSubzone.on("data:loaded", function() {});

function cladiriStyle(feature) {
    return {
        fillColor: setCladiriColor(feature.properties.nrap),
        fillOpacity: 0.7,
        color: setCladiriBorderColor(feature.properties.nrap),
        opacity: .7,
        weight: 3,
    };
}

function setCladiriColor(d) {
    return d != null ?
        "#00a2ff" :
        "#f8edeb";
}

function setCladiriBorderColor(d) {
    return d != null ?
        "#1e00ff" :
        "#ccd5ae";
}

function parcariStyle(feature) {
    return {
        fillColor: "#fed9b7",
        fillOpacity: 0.7,
        color: "#ee6c4d",
        opacity: 1,
        weight: 3,
    };
}

function parcariEtajateStyle(feature) {
    return {
        fillColor: "#8338ec",
        fillOpacity: 0.7,
        color: "#52b69a",
        opacity: 1,
        weight: 3,
    };
}

function subzoneStyle(feature) {
    return {
        fillColor: setSubZoneColor(
            parseFloat(
                feature.properties.ptotal / feature.properties.aptotal
            ).toFixed(2)
        ),
        fillOpacity: 0.75,
        color: "#a0c4ff",
        opacity: 0.75,
        weight: 4,
    };
}

function setSubZoneColor(d) {
    return d > 0.9 ?
        "#fff0f3" :
        d > 0.8 ?
        "#ffccd5" :
        d > 0.7 ?
        "#ffb3c1" :
        d > 0.6 ?
        "#ff8fa3" :
        d > 0.5 ?
        "#ff758f" :
        d > 0.4 ?
        "#ff4d6d" :
        d > 0.3 ?
        "#c9184a" :
        d > 0.2 ?
        "#a4133c" :
        d > 0.1 ?
        "#800f2f" :
        "#590d22";
}

function onEachFeaturetbCladiri(feature, layer) {
    layer.bindPopup(
        "ID Cladire: <b>" +
        feature.properties.idCladire +
        "</b>" +
        "<hr>Cartier: <b>" +
        feature.properties.cartier +
        "</b>" +
        "<hr>Destinatie: <b>" +
        feature.properties.destinatie +
        "</b>" +
        "<hr>Adresa:Str." +
        feature.properties.strada +
        ",nr." +
        feature.properties.nrstrada +
        ",bl." +
        feature.properties.bloc +
        "<hr>Numar scari: <b>" +
        feature.properties.nrscari +
        "</b>" +
        "<hr>Numar apartamente: <b>" +
        feature.properties.nrap +
        "</b>" +
        "<hr>Observatii: <b>" +
        feature.properties.obs +
        "</b>"
    );
    layer.on({
        mouseover: function() {
            this.setStyle({
                fillColor: "#a8dadc",
            });
        },
        mouseout: function() {
            this.setStyle({
                fillColor: setCladiriColor(feature.properties.nrap),
            });
        },
    });
    // var label = L.marker(layer.getBounds().getCenter(), {
    //   icon: L.divIcon({
    //     className: "buildingLabel",
    //     html: feature.properties.nrap,
    //     iconSize: [0, 0],
    //   }),
    // }).addTo(map);
}

function onEachFeaturetbParcari(feature, layer) {
    layer.bindPopup(
        "ID Parcare: <b>" +
        feature.properties.id +
        "</b>" +
        "<hr>Cartier: <b>" +
        feature.properties.cartier +
        "</b>" +
        "<hr>Strada: <b>" +
        feature.properties.strada +
        "</b>" +
        "<hr>Tip Parcare: <b>" +
        feature.properties.tipparcare +
        "</b>" +
        "<hr>Numar locuri: <b>" +
        feature.properties.nrlocuri +
        "</b>" +
        "<hr>Numar locuri PD: <b>" +
        feature.properties.nrlocuripd +
        "</b>" +
        "<hr>Observatii: <b>" +
        feature.properties.obs +
        "</b>"
    );
    layer.on({
        mouseover: function() {
            this.setStyle({
                fillColor: "#dc2f02",
            });
        },
        mouseout: function() {
            this.setStyle({
                fillColor: "#fed9b7",
            });
        },
    });

    //   var label = L.marker(layer.getBounds().getCenter(), {
    //     icon: L.divIcon({
    //       className: "buildingLabel",
    //       html: feature.properties.nrap,
    //       iconSize: [0, 0],
    //     }),
    //   }).addTo(map);
}

function onEachFeaturetbSubzone(feature, layer) {
    layer.bindPopup(
        "ID Subzona: <b>" +
        feature.properties.id +
        "</b>" +
        "<hr>Cartier: <b>" +
        feature.properties.cartier +
        "</b>" +
        "<hr>Parcari rezidentiale: <b>" +
        feature.properties.prez +
        "</b>" +
        "<hr>Parcari stradale: <b>" +
        feature.properties.pstradale +
        "</b>" +
        "<hr>Parcari PD: <b>" +
        feature.properties.phandicap +
        "</b>" +
        "<hr>Parcari garaje: <b>" +
        feature.properties.pgaraje +
        "</b>" +
        "<hr>Numar total parcari: <b>" +
        feature.properties.ptotal +
        "</b>" +
        "<hr>Numar total apartamente: <b>" +
        feature.properties.aptotal +
        "</b>" +
        "<hr>Raport parcari/apartamente: <b>" +
        feature.properties.raportparcariap +
        "</b>" +
        "<hr>Numar parcari necesare: <b>" +
        feature.properties.pnecesare +
        "</b>" +
        "<hr>Observatii: <b>" +
        feature.properties.obs +
        "</b>"
    );
    layer.on({
        mouseover: function() {
            this.setStyle({
                fillColor: "#f7ede2",
            });
        },
        mouseout: function() {
            this.setStyle({
                fillColor: setSubZoneColor(
                    parseFloat(
                        feature.properties.ptotal / feature.properties.aptotal
                    ).toFixed(2)
                ),
            });
        },
    });

    // var labelSubzone = L.marker(layer.getBounds().getCenter(), {
    //   icon: L.divIcon({
    //     className: 'buildingLabel',
    //     html: `Necesar:${feature.properties.pnecesare}<br>Raport:${feature.properties.raportparcariap}`,
    //     iconSize: [0, 0],
    //   }),
    // });
}

function createSubZoneMarkers() {
    for (var property in layerSubzone._layers) {
        marker = L.marker(layerSubzone._layers[property].getBounds().getCenter(), {
            icon: L.divIcon({
                className: "subZoneLabel",
                html: `<p>Necesar:${layerSubzone._layers[property].feature.properties.pnecesare}<br>Raport:${layerSubzone._layers[property].feature.properties.raportparcariap}<p>`,
                iconSize: [0, 0],
            }),
        });
        layersubZoneMarkers.addLayer(marker);
    }
}

var layerCladiriMarkers = L.layerGroup();
var layerParcariMarkers = L.layerGroup();
var layersubZoneMarkers = L.layerGroup();

function createLayerControl(heatlayer) {
    layerControl = L.control
        .layers({
            "OpenStreetMap ": osm,
            "Google Satellite": googleSat,
        }, {
            "Cladiri ": layerCladiri,
            "Etichete-cladiri": layerCladiriMarkers,
            "Parcari ": layerParcari,
            "Etichete-parcari": layerParcariMarkers,
            "Parcari Etajate": layerParcariEtajate,
            "Subzone ": layerSubzone,
            "Etichete-subzone": layersubZoneMarkers,
            Heatmap: heatlayer,
        }, { collapsed: false })
        .addTo(map);

    map.addLayer(layerCladiri);
    map.addLayer(layerParcari);
}

function createCladiriMarkers() {
    for (var property in layerCladiri._layers) {
        if (
            layerCladiri._layers[property].feature.properties.nrap !== null &&
            layerCladiri._layers[property].feature.properties.nrap !== ""
        ) {
            marker = L.marker(
                layerCladiri._layers[property].getBounds().getCenter(), {
                    icon: L.divIcon({
                        className: "buildingLabel",
                        html: `<p>${layerCladiri._layers[property].feature.properties.nrap}<p>`,
                        iconSize: [0, 0],
                        iconAnchor: [10, 20],
                    }),
                }
            );
            layerCladiriMarkers.addLayer(marker);
        }
    }
}

function createParcariMarkers() {
    for (var property in layerParcari._layers) {
        marker = L.marker(layerParcari._layers[property].getBounds().getCenter(), {
            icon: L.divIcon({
                className: "parcariLabel",
                html: `<p>${layerParcari._layers[property].feature.properties.nrlocuri}<p>`,
                iconSize: [0, 0],
                iconAnchor: [10, 20],
            }),
        });
        layerParcariMarkers.addLayer(marker);
    }
}

//TODO HEATMAP
function createHeatMap() {
    var hlat, hlng, hraportapp;
    var heatarray = [];
    for (const property in layerSubzone._layers) {
        hlat = layerSubzone._layers[property].getBounds().getCenter().lat;
        hlng = layerSubzone._layers[property].getBounds().getCenter().lng;
        hraportapp = parseFloat(
            (
                layerSubzone._layers[property].feature.properties.ptotal /
                layerSubzone._layers[property].feature.properties.aptotal
            ).toFixed(2)
        );
        // console.log(`${property}: ${hlat}:${hlng}:${hraportapp}`)
        heatarray.push([hlat, hlng, hraportapp]);
    }

    return L.heatLayer(heatarray, {
        radius: 100,
        blur: 20,
        gradient: { 0.3: "red", 0.55: "yellow", 0.7: "green" },
    });
}