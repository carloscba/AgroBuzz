angular.module('mapApp', []).controller('appCtrl', function($scope, $http) {
    
    var svg = dimple.newSvg("#chart", "100%", 300);
    
    $http({
		method: 'GET',
	    url: "http://agrobuzzapp.herokuapp.com/campo"
    }).then(function successCallback(response) {

        var dataGraph = [];
        angular.forEach(response.data, function(data, key) {
            if(data.temperatura > 17 && data.temperatura < 22 && data.humedad > 75){
                var fechaObj = new Date(data.fecha) 

                dataGraph.push({
                    "fecha" : fechaObj,
                    "dia"   : fechaObj.getDate(),
                    "hora"   : fechaObj.getHours(),
                    "temperatura" : parseFloat(data.temperatura),
                    "precipitacion" : parseFloat(data.precipitacion)
                });
            }
        });
        console.log(dataGraph);

        svg.selectAll('*').remove();

        var myChart = new dimple.chart(svg, dataGraph);
        myChart.setBounds(60, 30, "100%", 205)

        var x = myChart.addCategoryAxis("x", "dia");
        x.addOrderRule("dia");
        x.title = "Fecha" 
       

        yAxis1 = myChart.addMeasureAxis("y", "hora");
        yAxis1.overrideMax = 24;
        yAxis1.title = "Hora";        

        yAxis2 = myChart.addMeasureAxis("y", "precipitacion");

        var s2 = myChart.addSeries("precipitacion", dimple.plot.bar, [x, yAxis2]);  
        s2.stacked = true;  

        var s1 = myChart.addSeries("temperatura", dimple.plot.point, [x, yAxis1]);
        s1.aggregate = dimple.aggregateMethod.avg;
        s1.stacked = false;

   
        

        myChart.draw();
       
           
    });

});