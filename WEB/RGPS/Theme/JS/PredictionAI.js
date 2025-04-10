

var optionsz = {
    title: 'Profile Angle Deviation ƒHα(µ)',
    legend: 'none',
    series:{0:{color:"red"}},
    hAxis: { title: 'Job Date and Time', format: 'd/M/yy', },
    vAxis: { title: 'Reading ƒHα(µ)', minValue: -14, maxValue: 14  },
    trendlines: {  0: {type:'linear',visibleinLegent:false,color:'red'} },
    backgroundColor: { fill: 'transparent' },
    chartArea: { backgroundColor: { fill: 'white' } }
};

var options = {
    title: 'Profile Angle Deviation ƒHα(µ)',
    legend: { position: 'bottom', textStyle: { color: 'blue', fontSize: 12 } },
    series: {
        0: { color: "red", visibleInLegend: true, labelInLegend: 'Values' },
        1: { pointSize: 0, tooltip: false, lineWidth: 1, color: 'green' },
        2: { pointSize: 0, tooltip: false, lineWidth: 1, color: 'purple' },
        3: { pointSize: 0, tooltip: false, lineWidth: 1, color: 'magenta' },
        4: { pointSize: 0, tooltip: false, lineWidth: 1, color: 'black' }
    },
    chartArea: { left: '10%', top: '10%', width: '80%', height: '75%' },
    hAxis: { title: 'Job Date and Time', format: 'd/M/yy', gridlines: { color: 'white' } },
    vAxis: { baselineColor: 'white', gridlines: { color: 'white' } },
    trendlines: {
        0: { type: 'linear', visibleInLegend: true, tooltip: true, color: 'blue', labelInLegend: 'Trend' },
        1: { type: 'linear', lineWidth: 1, tooltip: false, visibleinLegent: true, color: 'green' },
        2: { type: 'linear', lineWidth: 1, tooltip: false, visibleinLegent: true, color: 'purple' },
        3: { type: 'linear', lineWidth: 1, tooltip: false, visibleinLegent: true, color: 'magenta' },
        4: { type: 'linear', lineWidth: 1, tooltip: false, visibleinLegent: true, color: 'black' }
    },
    backgroundColor: { fill: 'transparent' },

    chartArea: { backgroundColor: { fill: 'white' }, left: '5%', width: '85%' }
};

function drawCharts() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawFHALHPrediction);
    google.charts.setOnLoadCallback(drawFHARHPrediction);
    google.charts.setOnLoadCallback(drawFHBLHPrediction);
    google.charts.setOnLoadCallback(drawFHBRHPrediction);
    google.charts.setOnLoadCallback(drawFFALHPrediction);
    google.charts.setOnLoadCallback(drawFFARHPrediction);
    google.charts.setOnLoadCallback(drawLCBLHPrediction);
    google.charts.setOnLoadCallback(drawLCBRHPrediction);
    google.charts.setOnLoadCallback(drawFU_LHPrediction);
    google.charts.setOnLoadCallback(drawFU_RHPrediction);
    google.charts.setOnLoadCallback(drawFP_LHPrediction);
    google.charts.setOnLoadCallback(drawFP_RHPrediction);
    google.charts.setOnLoadCallback(drawFRCMNPrediction);

    function drawFHALHPrediction() {
        options.title = 'Profile Angle Deviation ƒHα(µ) Left';
        var data = google.visualization.arrayToDataTable(FHALHArray);
        var chart = new google.visualization.ScatterChart(document.getElementById('FHA_Left'));
        chart.draw(data, options);
    }

    function drawFHARHPrediction() {        
        options.title = 'Profile Angle Deviation ƒHα(µ) Right';
        var data = google.visualization.arrayToDataTable(FHALHArray);
        var chart = new google.visualization.ScatterChart(document.getElementById('FHA_Right'));
        chart.draw(data, options);
    }

    function drawFHBLHPrediction() {
        options.title = 'Lead Angle Deviation ƒHß(µ) Left';
        var data = google.visualization.arrayToDataTable(FHBLHArray);
        var chart = new google.visualization.ScatterChart(document.getElementById('FHB_Left'));
        chart.draw(data, options);
    }

    function drawFHBRHPrediction() {
        options.title = 'Lead Angle Deviation ƒHß(µ) Right';
        var data = google.visualization.arrayToDataTable(FHBRHArray);
        var chart = new google.visualization.ScatterChart(document.getElementById('FHB_Right'));
        chart.draw(data, options);
    }

    function drawFFALHPrediction() {
        options.title = 'Profile Form Deviation ƒfα(µ) Left';
        var data = google.visualization.arrayToDataTable(FFALHArray);
        var chart = new google.visualization.ScatterChart(document.getElementById('FFA_Left'));
        chart.draw(data, options);
    }

    function drawFFARHPrediction() {
        options.title = 'Profile Form Deviation ƒfα(µ) Right';
        var data = google.visualization.arrayToDataTable(FFARHArray);
        var chart = new google.visualization.ScatterChart(document.getElementById('FFA_Right'));
        chart.draw(data, options);
    }

    function drawLCBLHPrediction() {
        options.title = 'Lead Crowning(µ) Left';
        var data = google.visualization.arrayToDataTable(LCBLHArray);
        var chart = new google.visualization.ScatterChart(document.getElementById('LCB_Left'));
        chart.draw(data, options);
    }

    function drawLCBRHPrediction() {
        options.title = 'Lead Crowning(µ) Right';
        var data = google.visualization.arrayToDataTable(LCBRHArray);
        var chart = new google.visualization.ScatterChart(document.getElementById('LCB_Right'));
        chart.draw(data, options);
    }

    function drawFU_LHPrediction() {
        options.title = 'Pitch Error ƒu(µ) Left';
        var data = google.visualization.arrayToDataTable(FU_LHArray);
        var chart = new google.visualization.ScatterChart(document.getElementById('FU_Left'));
        chart.draw(data, options);
    }

    function drawFU_RHPrediction() {
        options.title = 'Pitch Error ƒu(µ) Right';
        var data = google.visualization.arrayToDataTable(FU_RHArray);
        var chart = new google.visualization.ScatterChart(document.getElementById('FU_Right'));
        chart.draw(data, options);
    }

    function drawFP_LHPrediction() {
        options.title = 'Total Pitch Deviation Ƒp(µ) Left';
        var data = google.visualization.arrayToDataTable(FP_LHArray);
        var chart = new google.visualization.ScatterChart(document.getElementById('FP_Left'));
        chart.draw(data, options);
    }

    function drawFP_RHPrediction() {
        options.title = 'Total Pitch Deviation Ƒp(µ) Right';
        var data = google.visualization.arrayToDataTable(FP_RHArray);
        var chart = new google.visualization.ScatterChart(document.getElementById('FP_Right'));
        chart.draw(data, options);
    }

    function drawFRCMNPrediction() {
        options.title = 'Concentricity Deviation Ƒr(µ) ';
        var data = google.visualization.arrayToDataTable(FRCmnArray);
        var chart = new google.visualization.ScatterChart(document.getElementById('FR_COMMON'));
        chart.draw(data, options);
    }

}