'use strict';

mapApp.controller('MapperCtrl', function ($scope) {
    $scope.points = [];
    $scope.MakeAMap = false;
    $scope.MapId = " ";
    $scope.Attributes = [];
    $scope.Message = "Make a Map > Add a Point > Description > Save";

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

                  
                  $scope.newPoint = newPoint;

                  //$("#SavePointBtn").removeAttr('disabled');
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

    $("#Make").on("click", function () {
        $scope.MakeAMap = true;

        $scope.Title = $("#Title").val();
        $scope.Description = $("#Description").val();
        
        $("#maker").hide();
        $("#loader").hide();
        //Save Map to Database
        $scope.SaveMap();
        


    });

    $scope.SaveMap = function () {
        var Field = {};
       
        $(".form-group").children().each(function (index) {

            if (index % 2 === 0) {
                Field.Name = this.value;
            } else {
                Field.Type = this.value;
                $scope.Attributes.push(Field);
                Field = {};
            }

        });
        
        var Attrs = $scope.attributeToString($scope.Attributes);

        var newMap = { Title: $scope.Title, Description: $scope.Description, Schema: Attrs };

        $.post('/api/Maps', newMap, function (data) {
            $scope.MapId = data;
        });

        $scope.addForm($scope.Attributes);

        $scope.enableSaveBtn();
    }

    $scope.enableSaveBtn = function () {
        $('#SaveMap').removeAttr("disabled");
    }

    $scope.attributeToString = function (array) {
        var string = "";

        for (var x in array)
        {
            string += "Name : " + array[x].Name + " ";
            string += "Type : " + array[x].Type + " | ";
        }

        return string;
    }

    $scope.SavePntBtn = function () {
        
        PostPoint($scope.newPoint);
    }

    var PostPoint = function (point) {
        point.Map_Id = $scope.MapId;
        var data = "";

        $('#attrForms').children().each(function (index) {
            if (this.name !== undefined) {
                data += this.name + " : " + this.value + ",";
                this.value = " ";
            }
        })
        point.Attributes = data;
        
        $.post('/api/Position', point);
    }

    // Allow users to add an attribute schema
    var addAttribute = function () {
        $("#attrFields").clone().appendTo('#attrForm');
    }

    $scope.addForm = function (array) {
        for(var x in array) {
            $("#attrForms").append('<label for="' + array[x].Name + '">'+ array[x].Name +'</label><input type="text" name="' + array[x].Name + '" class="form-control"/><br />');
        };
    }

    $('#addAttribute').on('click', addAttribute);


});