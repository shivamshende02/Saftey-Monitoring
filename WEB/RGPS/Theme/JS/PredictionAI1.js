

var options = {
    title: 'Profile Angle Deviation ƒHα(µ)',
    legend: { position: 'bottom', textStyle: { color: 'blue', fontSize: 12 } },
    series: {
        0: { color: "red", visibleInLegend: true, labelInLegend: 'Values' },
        1: { pointSize: 0, tooltip: false, lineWidth: 1, color: 'green', labelInLegend: 'DIN7 Lower Limit' },
        2: { pointSize: 0, tooltip: false, lineWidth: 1, color: 'purple', labelInLegend: 'DIN7 Upper Limit' },
        3: { pointSize: 0, tooltip: false, lineWidth: 1, color: 'magenta', labelInLegend: 'DIN9 Lower Limit' },
        4: { pointSize: 0, tooltip: false, lineWidth: 1, color: 'black', labelInLegend: 'DIN9 Upper Limit' }
    },
    chartArea:{left:'10%',top:'10%',width:'80%',height:'75%'},
    hAxis: { title: 'Job Date and Time', format: 'd/M/yy', gridlines: { color: 'white' } },
    vAxis: { baselineColor: 'white', gridlines: {color:'white'}},
    trendlines: {
        0: { type: 'linear', visibleInLegend: true, tooltip: true, color: 'blue', labelInLegend: 'Trend' },
        1: { type: 'linear', lineWidth: 1, tooltip: false, visibleinLegent: true, color: 'green' },
        2: { type: 'linear', lineWidth: 1, tooltip: false, visibleinLegent: true, color: 'purple' },
        3: { type: 'linear', lineWidth: 1, tooltip: false, visibleinLegent: true, color: 'magenta' },
        4: { type: 'linear', lineWidth: 1, tooltip: false, visibleinLegent: true, color: 'black' }
    },
    backgroundColor: { fill: 'transparent' },

    chartArea: { backgroundColor: { fill: 'white' },left:'5%',width:'85%' }
};

function drawCharts() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawFHALHPrediction);
   

    function drawFHALHPrediction() {

        options.title = 'Profile Angle Deviation ƒHα(µ) Left';
        var data = google.visualization.arrayToDataTable(FHALHArray);
        var chart = new google.visualization.ScatterChart(document.getElementById('FHA_Left'));
        chart.draw(data, options);
    }


}