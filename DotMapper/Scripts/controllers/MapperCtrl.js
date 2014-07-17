'use strict';

mapApp.controller('MapperCtrl', function ($scope) {
    $scope.points = [];
    $scope.MakeAMap = false;
    $scope.MapId = " ";

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

              if ($scope.MakeAMap) {
                  var pt = evt.mapPoint;
                  var finished = (evt.type == "dblclick" || evt.type == "touchend");

                  var newPoint = {};
                  newPoint.Xcoor = pt.x;
                  newPoint.Ycoor = pt.y;

                  newPoint.Lat = pt.getLatitude().toFixed(2);
                  newPoint.Long = pt.getLongitude().toFixed(2);

                  newPoint.Type = pt.type;

                  newPoint.spatialReference = {};
                  newPoint.spatialReference.wkid = pt.spatialReference.wkid;

                  $scope.points.push(newPoint);

                  PostPoint(newPoint);

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
        $scope.MakeAMap = true;

        $scope.Title = $("#Title").val();
        $scope.Description = $("#Description").val();
        console.log($scope.Title);
        //Save Map to Database
        $scope.SaveMap();
        


    });

    $scope.SaveMap = function () {
        var newMap = { Title: $scope.Title, Description: $scope.Description };

        $.post('/api/Maps', newMap, function (data) {
            $scope.MapId = data;
            console.log(data);
        });

        $scope.enableSaveBtn();
    }

    $scope.enableSaveBtn = function () {
        $('#SaveMap').removeAttr("disabled");
    }

    $("#SaveMap").on("click", function () {
        console.log("you clicked me");

    });
    //Switch Button from save to make

    var PostPoint = function (point) {
        point.Map_Id = $scope.MapId;

        console.log(point);
        $.post('/api/Position', point);
    }

});