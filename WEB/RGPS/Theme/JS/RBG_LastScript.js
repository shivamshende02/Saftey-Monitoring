//Server And Peers Begin


RIYA_V03.RIYAService.GetTop10Pages(drawPagesChart, failed)


var xxds;

RIYA_V03.RIYAService.getRIYAOEE(new Date().toDateString(), successRIYAOEE, failed);
function successRIYAOEE(result) {
    RBGcharts.chart('RIYAUPTIME', {
        chart: { type: 'area', backgroundColor: 'transparent' },
        title: null,
        xAxis: { categories: result.YName },
        yAxis: { labels: { enabled: false }, title: { enabled: false } },
        tooltip: { pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y} Mins</b> ', split: true },
        plotOptions: { area: { stacking: 'percent', marker: { enabled: false } } },
        series: [{ name: 'RIYA Down', data: result.RiyaDown }, { name: 'Network Down', data: result.NetDown }, { name: 'Uptime', data: result.Uptime }]
    });


}
function failed(ex) {
    console.log(ex);
}
function drawPagesChart(result) {

    xxds = RBGcharts.chart('salesChart', {
       
        chart: {
            type: 'bar', backgroundColor: 'transparent',
        },
        title: {
            text: 'Top 10 Pages Served'
        },
        tooltip: true,
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                    
                }
            }
        },
        xAxis: {
            categories: result.Categories, title: result.XAxisTitle,
            labels: {
               
            }
        },
        yAxis: { title: { text: null }, labels: { enabled: false } },
        series: [{
            name: 'Usage',
            colorByPoint: true,
            data: result.Val1
        }],
        legend: false
    });
}
function LoadPagesChart(container, Namex, xTitle, Min, Max, ValueXX, Colours) {
    return;
    var gaugeOptions = {
        chart: { type: 'solidgauge', backgroundColor: 'transparent', },
        pane: { startAngle: -120, endAngle: 120, background: { backgroundColor: 'transparent', innerRadius: '60%', outerRadius: '100%', shape: 'arc' } },

        title: null,
       
        yAxis: {
            stops: Colours,
          
            lineWidth: 0,
            tickWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,

            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

   
    var chartSpeed = RBGcharts.chart(container, RBGcharts.merge(gaugeOptions, {
        yAxis: {
            min: Min,
            max: Max,
            title: {
                text: xTitle, y: -30,

            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: xTitle,
            data: [parseFloat(ValueXX)],
            labels: {
                format: '<span style="font-size:14px">{name}</span>'
            },
            dataLabels: {
                format:
                    '<div style="text-align:center;top:-40px;left:-20px;position:absolute">' +
                    '<span style="font-size:15px">{y}</span><br/>' +
                    '<span style="font-size:12px;font-weight:normal">' + Namex + '</span>' +
                    '</div>'
            },
            tooltip: {
                valueSuffix: ' ' + Namex
            }
        }]

    }));

};


class PlotBand {
    constructor(frm, tto, colour, thick) {
        this.from = parseFloat(frm);
        this.to = parseFloat(tto);
        this.color = colour;
        this.thickness = parseInt(thick);
    }
}

var results = [];
RIYA_V03.RIYAService.getServerPerformance(function (result) { results = result; RefreshDials() }, function (ex) { console.log(ex); });

function RefreshDials() {

    $(".ActiveServer").each(function (I, V) {
        var xx = $($(V).children()[0]);
        var yy = ($(V).children()[1]);
        xx.text(results[parseInt($(V).data("row"))][0]);
        let tt = results[parseInt($(V).data("row"))][1];

        if (tt == "Online") {
            yy.className = "text-lime ion ion-record ";

        } else {
            yy.className = "text-red ion ion-record ";
        }
    });
    $(".RiyaProgress").each(function (I, V) {

        var id = V.id;
        var x
        x = $("#" + id + " > .info-box-content > .info-box-number");
        x.text(
        results[parseInt(x.data("row"))][parseInt(x.data("column"))]
        );
        x = $("#" + id + " > .info-box-content > .progress> .progress-bar");
        var y = results[parseInt(x.data("row"))][parseInt(x.data("column"))];
        var yy
        if (y > 100) { yy = 100 } else { yy = y }
        x.css('width', yy.toString() + '%');
        x = $("#" + id + " > .info-box-content > .progress-description");
        x.html('<b>' + y.toString() + '%</b>' + x.data("suffix"));
    });


    $(".RiyaDial").each(function (index, value) {
        var pbs = [];
        var sp = $(value).data("bands").split("|");
        var th = $(value).data("thick");
        for (var i = 0; i < sp.length; i++) {
            var b = sp[i].split(":");
            pbs.push(new PlotBand(b[0], b[1], b[2], th));
        }
        var x = $(value);
        var val = results[parseInt(x.data("row"))][parseInt(x.data("column"))];
        var ofs = parseFloat($(value).data("offset"))
        if (ofs != 0) {
            val = val + ofs;
        }
        if ($(value).data("absolute") == "1") {
            val = Math.abs(val);
        }
        drawDial(value.id, pbs, $(value).data("title"), val, $(value).data("stitle"), $(value).data("suffix"), parseInt($(value).data("max")), parseInt($(value).data("min")));
    });
    RIYA_V03.RIYAService.getServerPerformance(function (result) { results = result; }, function (ex) { console.log(ex); });
    setTimeout(RefreshDials, 30000);
}


function drawDial(idd, PlotBands, Title, Value, sTitle, suffx, MX, MN) {
    Value = Math.round(Value * 100.0) / 100.0;

    var xdsdfafssd = RBGcharts.chart(idd, {
        credits: { enabled: false },
        exporting: { enabled: false },
        chart: {
            type: 'gauge', backgroundColor: 'transparent'
        },
        title: { floating: true, text: Title, verticalAlign: 'bottom', style: { color: 'navy', fontSize: '14px' }, y: -20 },
        pane: {
            startAngle: -135,
            endAngle: 135,
            background: [{
                backgroundColor: 'transparent'
            }]
        },
        plotOptions: { backgroundColor: 'transparent' },

        yAxis: {
            min: MN,
            max: MX,
            lineColor: '#339',
            tickColor: '#339',
            minorTickColor: '#339',
            lineWidth: 5,
            labels: {
                distance: -20,
                rotation: 'auto', style: { fontWeight: 'bold', color: 'black' }
            },
            tickLength: 10,
            minorTickLength: 8,
            endOnTick: false,
            zIndex: 100,
            plotBands: PlotBands
        },
        series: [{
            name: sTitle,
            data: [Value],
            suffix: suffx,
            dataLabels: {
                align: 'center', className: 'text-center',
                format: '<span style="color:#339">{y:.2f} ' + suffx + '</span>'


            },
            tooltip: {
                formatter: function () {

                    return ' <b>' + this.x +
                        ':' + this.y + this.suffix + '</b>';
                }, valueSuffix: suffx
            }
        }]

    });
}


//Server And Peers End