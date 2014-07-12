var App = {};

App.points = [];
App.MakeAMap = false;

require([
    "esri/map",
    "esri/geometry/Point",
    "esri/graphic",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/InfoTemplate",
    "dojo/_base/Color",
    "dojo/query",
    "dojo/on",
    "dojo/dom",
    "dojo/domReady!",
    "esri/SpatialReference"
],
  function (Map, Point, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, InfoTemplate, Color, query, on, dom, SpatialReference) {
      "use strict"

      var pointSymbol, map, mapTwo;

      // Create map
      map = new Map("map", {
          basemap: "satellite",
          center: [-79.40, 43.55],
          zoom: 3,
      });

      // Create symbols for the graphics
      pointSymbol = createPointSymbol();

      // Wire event
      on(map, "click", addGraphic);

      function addGraphic(evt) {

          if (App.MakeAMap) {
              var pt = evt.mapPoint;
              var finished = (evt.type == "dblclick" || evt.type == "touchend");

              App.points.push(pt);

              addPoint(pt, finished);
          }
          
      }

      // Add point graphic
      function addPoint(pt, finished) {
          var attributes = { "Lat": pt.getLatitude().toFixed(2), "Lon": pt.getLongitude().toFixed(2) };
          var infoTemplate = new InfoTemplate("Tree", "Latitude: ${Lat} <br /> Longitude: ${Lon}");
          var graphic = new Graphic(pt, pointSymbol, attributes, infoTemplate);

          map.graphics.add(graphic);
      }

      function createPointSymbol() {
          return new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_DIAMOND, 7,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
            new Color([255, 0, 0]), 1),
            new Color([255, 0, 0, 0.75]));
      }
  }
);

//Dom Events /Button clicks
$("#Make").on("click", function () {
    App.MakeAMap = true;

    App.Title = $("#Title").val();
    App.Description = $("#Description").val();

    App.enableSave();
});

App.enableSave = function () {
    $('#SaveMap').removeAttr("disabled");
}

$("#SaveMap").on("click", function () {
    //Post AJAX call
    var Data = { Title: App.Title, Description: App.Description, Points: App.points }
    console.log(Data);
});
//Switch Button from save to make



