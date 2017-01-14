angular.module('mapApp', []).controller('appCtrl', function($scope, $http) {
    
    var svg = dimple.newSvg("#chart", "100%", 400);
    
    $http({
		method: 'GET',
	    url: "http://localhost:8000/tiempo/data/"
    }).then(function successCallback(response) {

        $scope.dataGraph = [];
        angular.forEach(response.data, function(data, key) {
            
                var fechaObj = new Date(data.fecha) 
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

        var s1 = myChart.addSeries("temperatura", dimple.plot.point, [x, yAxis1]);
        s1.aggregate = dimple.aggregateMethod.max;
        s1.stacked = false;
        myChart.draw();
       
           
    });
    
    $http({
		method: 'GET',
	    url: "http://localhost:8000/tiempo/pordia/"
    }).then(function successCallback(response) {
        
        console.log(response.data)
        var svg = dimple.newSvg("#chartDias", "100%", 300);
 
        $scope.dataDay = [];
        angular.forEach(response.data.day, function(data, key) {
            
                $scope.dataDay.push({
                    "dia"   : data,
                    "count" : response.data.count[key],
                });
            
        });        
        console.log($scope.dataDay)

        var myChart = new dimple.chart(svg, $scope.dataDay);
        myChart.setBounds(50, 30, "100%", 200)

        var x = myChart.addCategoryAxis("x", "dia");
        x.addOrderRule("day");

        myChart.addMeasureAxis("y", "count");
        myChart.addSeries(null, dimple.plot.bar);

        myChart.draw();

    });        

});