angular.module('mapApp', []).controller('appCtrl', function($scope, $http) {
    
    var svg = dimple.newSvg("#chart", "100%", 400);
    
    $http({
		method: 'GET',
	    url: "http://localhost:8000/tiempo/data/"
    }).then(function successCallback(response) {

        $scope.dataGraph = [];
        angular.forEach(response.data, function(data, key) {
            
                var fechaObj = new Date(data.fecha) 
                console.log(fechaObj)
                $scope.dataGraph.push({
                    "fecha"         : fechaObj,
                    "dia"           : fechaObj.getDate(),
                    "hora"          : fechaObj.getHours(),
                    "temperatura"   : parseFloat(data.temperatura),
                    "precipitacion" : parseFloat(data.precipitacion),
                    "humedad"       : parseFloat(data.humedad)
                });
            
        });

        svg.selectAll('*').remove();

        var myChart = new dimple.chart(svg, $scope.dataGraph);
        myChart.setBounds(50, 30, "100%", 300)

        var x = myChart.addCategoryAxis("x", "dia");
        x.addOrderRule("dia");
        x.title = "Fecha" 
       
        yAxis1 = myChart.addMeasureAxis("y", "hora");
        yAxis1.overrideMax = 23;
        yAxis1.title = "Hora";        
        /*
        yAxis2 = myChart.addMeasureAxis("y", "humedad");

        var s2 = myChart.addSeries("humedad", dimple.plot.bar, [x, yAxis2]);  
        s2.stacked = true;  
        */
        var s1 = myChart.addSeries("temperatura", dimple.plot.point, [x, yAxis1]);
        s1.aggregate = dimple.aggregateMethod.max;
        s1.stacked = false;

   
        

        myChart.draw();
       
           
    });

});