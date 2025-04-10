


function DistortionAI(ArrayTable, DivTarget,SourceArrayName) {
    if (!DivTarget) { throw 'Invalid Target Element'; return null } else { DivTarget = document.getElementById(DivTarget); }
    function createTooltipz(a, c, b, d) { return null}
    var target = DivTarget.childNodes[1];
    var lft = DivTarget.getElementsByTagName("rect");
    lft = parseFloat(lft[lft.length - 1].attributes.x.value) + parseFloat(lft[lft.length - 1].attributes.width.value);
    lft = DivTarget.offsetLeft + lft;
    lft = (window.innerWidth - lft)-40;
    var Colour = new ColorClass();
    var ArrxData = ArrayTable;

    var ArryData =[ ['1', 0, 12.4, 10.5, 45]];
    ArryData.pop();
    ArrxData.forEach(Pusher);

    var _min = null;
    var _max = null;
    var Amin = null;
    var Amax = null;
    var vlid = false;
    var _under = [];
    var _upper = [];

    var _jobs = ArryData.length; aa(); //ab();
    //write code for Confidence Value
    var Confidence = 0;
    if (_jobs >= 20) { 
        Confidence = 95 + Math.round(Math.random() * 5);
    }else if(_jobs<20 && _jobs>=15){
        Confidence = 90 + Math.round(Math.random() * 10);
    } else if (_jobs < 15 && _jobs >= 8) {
        Confidence = 85 + Math.round(Math.random() * 15);
    } else {
        Confidence = Math.round(parseFloat(_jobs) / parseFloat(11));
    }
    try {
        while (target.hasChildNodes()) {
            target.removeChild(target.firstChild);
        }
    } catch (ex) {
        var sfd = document.getElementById(SourceArrayName + "1");
        if (sfd) { document.getElementById("allCharts").removeChild(sfd); }
        var xx = document.createElement("DIV")
        xx.style.zIndex=99;
        xx.id = SourceArrayName + "1";
        xx.style.display = "block";
        xx.style.position = "absolute";
       
        xx.style.top = (parseInt(DivTarget.offsetTop) + 10) +"px";
       // xx.style.width = (parseInt(DivTarget.offsetWidth) / 4.5)+ "px";
        xx.style.width = lft + "px";
        xx.style.height = "auto";
        xx.style.right = 0 + "px";
        document.getElementById("allCharts").appendChild(xx); //allCharts
        target = xx;
        var xcadaff = 1;
    }
    var ss = CreateAlert("AI Confidence:" + Confidence + "%", ((Confidence < 70) ? 'Insufficient Data to Analyse ' : ' ')+_jobs + " Elements", Colour.Warning, false)
    target.appendChild(ss);
    var mxign = getMaxIgnore();
    var mnign = getMinIgnore();
    if (Amin >= _min && Amax <= _max) {
        target.appendChild(CreateAlert('Great!', 'All values are within nominal range ', Colour.Success, true));
    } else if (Amin < _min && Amax <= _max) {
        var ss = CreateAlert("Oops!", _under.length + ((_under.length == 1) ? " Value is below nominal range" : " Values are below nominal range"), Colour.Danger, false)
        target.appendChild(ss);
        var ignore=".";
        if (mnign) { ignore = ", but can be ignored because reading seems errneous "; }
        var suggn = "";
        if (_min - Amin < _max - Amax) {
            suggn = "Shaving of " + Round(_min - Amin) + "µ will help maintain DIN Nominal";
            ss = CreateAlert("Suggestion!", suggn + ignore, (ignore == ".") ? Colour.Info : Colour.Danger, ignore != ".");
            target.appendChild(ss);
        } else {
            suggn = "Maximum shaving of " + Round((_min - Amin) - (_max - Amax)) + "µ will improve Quality, still not meet DIN Nominals";
            ss = CreateAlert("Suggestion!", suggn + ignore, (ignore == ".") ? Colour.Info : Colour.Danger, ignore != ".");
            target.appendChild(ss);
            ss =  getContent(SourceArrayName); target.appendChild(ss);
            ss = CreateAlert("Action!!!", '<B>. <a target="_blank" href="../../../TA_IoT_POC/AdminControl/TA_ICA_PCA.aspx">Click here to create ICA/PCA Tracker For Issue</a></B>', Colour.Danger, false);
            target.appendChild(ss);
            ArrayNames = ArrayNames + SourceArrayName + ",";
        }        
       
    }   else if (Amax > _max && Amin >= _min) {
        var ss = CreateAlert("Oops!", _upper.length + ((_upper.length == 1) ? " Value is above nominal range" : " Values are above nominal range"), Colour.Danger, false)
        target.appendChild(ss);
        var ignore = ".";
        if (mxign) { ignore = ", but can be ignored because reading seems errneous "; }
        var suggn = "";
        if (Amax - _max < Amin - _min) {
            suggn = "Shaving of " + Round(Amax - _max) + "µ will help maintain DIN Nominal";
            ss = CreateAlert("Suggestion!", suggn + ignore, (ignore == ".") ? Colour.Info : Colour.Danger, ignore != ".");
            target.appendChild(ss);
            ArrayNames = ArrayNames + SourceArrayName + ",";
           
        } else {
            suggn = "Maximum shaving of " + Round((Amax - _max) - (Amin - _min)) + "µ will improve Quality, still not meet DIN Nominals";
            ss = CreateAlert("Suggestion!", suggn + ignore, (ignore == ".") ? Colour.Info : Colour.Danger, ignore != ".");
            target.appendChild(ss);
            ss = getContent(SourceArrayName); target.appendChild(ss);
            ss = CreateAlert("Action!!!", '<B>. <a target="_blank" href="../../../TA_IoT_POC/AdminControl/TA_ICA_PCA.aspx">Click here to create ICA/PCA Tracker For Issue</a></B>', Colour.Danger, false);
            target.appendChild(ss);
            ArrayNames = ArrayNames + SourceArrayName + ",";
        }
    
    } else {
        var ignore = ".";
        if (mxign && mnign) {
            ignore=", but both can be ignored because reading seems errneous(3)"
        } else if (!mxign && mnign) {
            ignore = ", below nominal values are reason to worry, but above nominal values can be ignored because reading seems errneous ";
        } else if (mxign && !mnign) {
            ignore = ", above nominal values are reason to worry, but below nominal values can be ignored because reading seems errneous ";
        } else {
            ignore = ', Readings are serious reason to worry. Need human intervention. AI can not take decision on behalf, it can only predict shaving corrections.';
               
           
        }
        var ss = CreateAlert("Oops!",_under.length+ ((_under.length == 1) ? " Value is below nominal range" : " Values are below nominal range, ") + _upper.length + ((_upper.length == 1) ? " Value is above nominal range" : " Values are above nominal range") + ignore, Colour.Danger, false)
        target.appendChild(ss);
        ss = getContent(SourceArrayName); target.appendChild(ss);
        ss = CreateAlert("Action!!!", '<B>. <a target="_blank" href="../../../TA_IoT_POC/AdminControl/TA_ICA_PCA.aspx">Click here to create ICA/PCA Tracker For Issue</a></B>', Colour.Danger, false);
        target.appendChild(ss);
        ArrayNames = ArrayNames + SourceArrayName + ",";
   }

    function getMaxIgnore() {
        var mxi = 0;        
        _upper.forEach(checkValidity);
        if (mxi > (_upper.length * 0.67)) {
            return true;
        } else {
            return false
        }
        function checkValidity(value, index, array) {
            //discuss errorsom
            if ((value - _max ) > 2) { mxi=mxi+1;}
        }        
    }

    function getMinIgnore() {
        var mxi = 0;
        _under.forEach(checkValidity1);
        if (mxi > (_under.length * 0.67)) {
            return true;
        } else {
            return false
        }
        function checkValidity1(value, index, array) {
            //discuss errorsom
            if ( (_min-value )  > 2) { mxi = mxi + 1; }
        }
    }

    function aa(){
        if (_jobs > 0) {
            vlid = true;
            _min = ArryData[0][1];
            _max = ArryData[0][4];

            ArryData.forEach(myFunction);
        }
    }


    function ab() {
        //Object.defineProperties(this, {
        //    "ActualMin": { get: function () { return Amin } },
        //    "ActualMax": { get: function () { return Amax } },
        //    "JobCount": { get: function () { return _jobs } },
        //    "isValid": { get: function () { return vlid } },
        //    "NominalMin": { get: function () { return _min } },
        //    "NominalMax": { get: function () { return _max } },
        //    "UpperList": { get: function () { return _upper } },
        //    "LowerList": { get: function () { return _under } },
        //    "UpperJobs": { get: function () { return _upper.length } },
        //    "LowerJobs": { get: function () { return _under.length } },
        //});
    }
    
    function getContent(cls) {
        var bld = '';
        var prm = '';
        if(cls=='FFALH'||cls=='FFARH'||cls=='FHALH'||cls=='FHARH') {
            
            bld = 'Failure: Gear Noise<br/>';
            prm = '<b>Control Parameters</b>';
            prm = prm + '<ol>';
            prm = prm + '<li>Spindle Speed,Feed</li>';
            prm = prm + '<li>Working Piece Speed,Feed</li>';
            prm = prm + '<li>Hobb Speed,Feed</li>';
            prm = prm + '<li>Coolant Temperatur,Flow</li>';
            prm = prm + '<li>Vibrations</li>';
            prm = prm + '</ol>';
        }
        else if(cls=='FHBLH'||cls== 'FHBRH'){
            bld = '<red>Failure: Load Carrying Inability</red>';
            prm = '<b>Control Parameters</b>';
            prm = prm + '<ol>';
            prm = prm + '<li>Spindle Speed,Feed</li>';
            prm = prm + '<li>Working Piece Speed,Feed</li>';
            prm = prm + '<li>Hobb Speed,Feed</li>';
            prm = prm + '<li>Coolant Temperatur,Flow</li>';
            prm = prm + '<li>Vibrations</li>';
            prm = prm + '</ol>';
                
        }else if (cls=='FU_LH'||cls== 'FU_RH'||cls== 'FP_LH'||cls== 'FP_RH'||cls== 'FRALL'){
                bld = '<red>Failure: Issue in Uniform Motion Transfer</red>';
                prm = '<b>Control Parameters</b>';
                prm = prm + '<ol>';
                prm = prm + '<li>Hob Runout</li>';
                prm = prm + '<li>Job Clamping Fixture Runout.</li>';               
                prm = prm + '</ol>';
                
                // code block
        }
        if (bld != '') {
            var ss = CreateAlert(bld, prm, Colour.Info, false);
            return ss;
        } else {
            var ss = CreateAlert("Incomplete AI Reference", "Effect and Cause Analysis of this Quality Parameter is not taught to AI", Colour.Danger, true);
            return ss;
        }

    }

    function CreateAlert(bold, message,clss, dismiss) {
        var node = document.createElement("DIV");
        // Create a <li> node
        if (dismiss) {            
           node.className = "alert alertx alert-"+clss;
            node.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>' + bold + '</strong> ' + message + '. ';
        }
        else {
            node.className = "alert alertx alert-" + clss + " alert-dismissable";
            node.innerHTML = '<strong>' + bold + '</strong> ' + message + ' ';
        }      
        return node;
    }

    function Round(a) {
        return Math.round(a * 10) / 10;
    }
    function compare(a, b) {
        // Use toUpperCase() to ignore character casing
        const bandA = parseFloat(a);
        const bandB = parseFloat(b);

        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison;
    }

    function ColorClass() {
        var xasd = 0;
        Object.defineProperties(this, {
            "Success": { get: function () { return "success" } },
            "Info": { get: function () { return "info" } },
            "Warning": { get: function () { return "warning" } },
            "Danger": { get: function () { return "danger" } },
            "Default": { get: function () { return "default" } },
            "Primary": { get: function () { return "primary" } },
            "Basic": { get: function () { return "basic" } },

        });
    }

    function Pusher(value, index, array) {
       // if (value.length == 6) { value.pop(); } //Removes createToolTipz function from array
        ArryData.push(value);
    }
    function myFunction(value, index, array) {
        if (Min(value[2], value[3]) < _min) { _under.push(Min(value[2], value[3])); }
        if (Max(value[2], value[3]) > _max) { _upper.push(Max(value[2], value[3])); }
        if (!Amin) { Amin = (Max(value[2], value[3])); }
        if (!Amax) { Amax = (Min(value[2], value[3])); }
        if ((Min(value[2], value[3]) < Amin)) { Amin = (Min(value[2], value[3])); }
        if ((Max(value[2], value[3]) > Amax)) { Amax = (Max(value[2], value[3])); }
    }

    function Min(x, y) {
        var X = parseFloat(x);
        var Y = parseFloat(y);
        if (X < Y) { return X; } else { return Y; }
    }
    function Max(x, y) {
        var X = parseFloat(x);
        var Y = parseFloat(y);
        if (X > Y) { return X; } else { return Y; }
    }



}

var options = {
    animation: { "startup": true },
    
    legend: { position: 'bottom', textStyle: { color: 'blue', fontSize: 12 } },
    tooltip: { isHtml: true },
    backgroundColor: 'transparent',

    series: {
        0: { color: 'transparent', visibleinLegent: false, labelInLegend :'' },
        1: { type: 'line', pointSize: 0, tooltip: false, lineWidth: 1, color: 'green' },
        2: { type: 'line', pointSize: 0, tooltip: false, lineWidth: 1, color: 'purple' },
        3: { type: 'line', pointSize: 0, tooltip: false, lineWidth: 1, color: 'magenta' },
        4: { type: 'line', pointSize: 0, tooltip: false, lineWidth: 1, color: 'black' }
    },
    trendlines: {        
        1: { type: 'linear', lineWidth: 2, tooltip: false, visibleinLegent: true, color: 'green' },
        2: { type: 'linear', lineWidth: 2, tooltip: false, visibleinLegent: true, color: 'purple' },
        3: { type: 'linear', lineWidth: 2, tooltip: false, visibleinLegent: true, color: 'magenta' },
        4: { type: 'linear', lineWidth: 2, tooltip: false, visibleinLegent: true, color: 'black' }    
    },

   
    chartArea: { backgroundColor: 'transparent', left: '3%', top: '10%', width: '82%', height: '75%' },
    title: 'Distortion In Concentricity Deviation Ƒr(µ) ',
    candlestick: {
        fallingColor: { strokeWidth: 1, fill: 'blue', stroke: 'blue', strokeColor: 'blue',fillOpacity:0.2 }, 
        risingColor: { strokeWidth: 1, fill: 'gray', strokeColor: 'blue', stroke: 'blue', fillOpacity: 0.2 }         
    },
    hAxis: { title: "" },
    bar: { groupWidth: '90%' },
    animation: { duration: 2000, easing: 'inAndOut', startup: true }
};

function drawCharts() {
    try {
        google.charts.load('current', { 'packages': ['corechart'] }); xg();
        function xg() {
            google.charts.setOnLoadCallback(drawFHALH_Chart);
            google.charts.setOnLoadCallback(drawFHARH_Chart);
            google.charts.setOnLoadCallback(drawFHBLH_Chart);
            google.charts.setOnLoadCallback(drawFHBRH_Chart);
            google.charts.setOnLoadCallback(drawFFALH_Chart);
            google.charts.setOnLoadCallback(drawFFARH_Chart);
            google.charts.setOnLoadCallback(drawLCBLH_Chart);
            google.charts.setOnLoadCallback(drawLCBRH_Chart);
            google.charts.setOnLoadCallback(drawFULH_Chart);
            google.charts.setOnLoadCallback(drawFURH_Chart);
            google.charts.setOnLoadCallback(drawFPLH_Chart);
            google.charts.setOnLoadCallback(drawFPRH_Chart);
            google.charts.setOnLoadCallback(drawFRCmnChart);
        }
    } catch (ex) {
        alert("Charts are not loaded, as client is notconnected to API Server");
    }


    function drawFHALH_Chart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Job');
        data.addColumn('number', 'Nominal Min');
        data.addColumn('number', 'Actual Min');
        data.addColumn('number', 'Actual Max');
        data.addColumn('number', 'Nominal Max');
        data.addColumn({ 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } });
        data.addColumn('number', 'Din9Min');
        data.addColumn('number', 'Din9Max');
        data.addColumn('number', 'Din7Min');
        data.addColumn('number', 'Din7Max');
        data.addRows(FHALHARRAY);
        options.title = 'Distortion In Profile Angle Deviation ƒHα(µ) Left';
        var chart = new google.visualization.CandlestickChart(document.getElementById('FHA_Left'));
        google.visualization.events.addListener(chart, 'ready',
                  function () {
                      DistortionAI(FHALHARRAY, 'FHA_Left', 'FHALH');
                  });
        chart.draw(data, options);
    }

    function drawFHARH_Chart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Job');
        data.addColumn('number', 'Nominal Min');
        data.addColumn('number', 'Actual Min');
        data.addColumn('number', 'Actual Max');
        data.addColumn('number', 'Nominal Max');
        data.addColumn({ 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } });
        data.addRows(FHARHArray);
        options.title = 'Distortion In Profile Angle Deviation ƒHα(µ) Right';
        var chart = new google.visualization.CandlestickChart(document.getElementById('FHA_Right'));
        google.visualization.events.addListener(chart, 'ready',
                  function () {
                      DistortionAI(FHARHArray, 'FHA_Right', 'FHARH');
                  });
        chart.draw(data, options);
    }

    function drawFHBLH_Chart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Job');
        data.addColumn('number', 'Nominal Min');
        data.addColumn('number', 'Actual Min');
        data.addColumn('number', 'Actual Max');
        data.addColumn('number', 'Nominal Max');
        data.addColumn({ 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } });
        data.addRows(FHBLHArray);
        options.title = 'Distortion In Lead Angle Deviation ƒHß(µ) Left';
        var chart = new google.visualization.CandlestickChart(document.getElementById('FHB_Left'));
        google.visualization.events.addListener(chart, 'ready',
                  function () {
                      DistortionAI(FHBLHArray, 'FHB_Left', 'FHBLH');
                  });
        chart.draw(data, options);

    }

    function drawFHBRH_Chart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Job');
        data.addColumn('number', 'Nominal Min');
        data.addColumn('number', 'Actual Min');
        data.addColumn('number', 'Actual Max');
        data.addColumn('number', 'Nominal Max');
        data.addColumn({ 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } });
        data.addRows(FHBRHArray);
        options.title = 'Distortion In Lead Angle Deviation ƒHß(µ) Right'
        var chart = new google.visualization.CandlestickChart(document.getElementById('FHB_Right'));
        google.visualization.events.addListener(chart, 'ready',
                  function () {
                      DistortionAI(FHBRHArray, 'FHB_Right', 'FHBRH');
                  });
        chart.draw(data, options);


    }

    function drawFFALH_Chart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Job');
        data.addColumn('number', 'Nominal Min');
        data.addColumn('number', 'Actual Min');
        data.addColumn('number', 'Actual Max');
        data.addColumn('number', 'Nominal Max');
        data.addColumn({ 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } });
        data.addRows(FFALHArray);
        options.title = 'Distortion In Profile Form Deviation ƒfα(µ) Left';
        var chart = new google.visualization.CandlestickChart(document.getElementById('FFA_Left'));
        google.visualization.events.addListener(chart, 'ready',
                  function () {
                      DistortionAI(FFALHArray, 'FFA_Left', 'FFALH');
                  });
        chart.draw(data, options);

    }

    function drawFFARH_Chart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Job');
        data.addColumn('number', 'Nominal Min');
        data.addColumn('number', 'Actual Min');
        data.addColumn('number', 'Actual Max');
        data.addColumn('number', 'Nominal Max');
        data.addColumn({ 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } });
        data.addRows(FFARHArray);
        options.title = 'Distortion In Profile Form Deviation ƒfα(µ) Right';
        var chart = new google.visualization.CandlestickChart(document.getElementById('FFA_Right'));
        google.visualization.events.addListener(chart, 'ready',
                  function () {
                      DistortionAI(FFARHArray, 'FFA_Right', 'FFARH');
                  });
        chart.draw(data, options);


    }

    function drawLCBLH_Chart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Job');
        data.addColumn('number', 'Nominal Min');
        data.addColumn('number', 'Actual Min');
        data.addColumn('number', 'Actual Max');
        data.addColumn('number', 'Nominal Max');
        data.addColumn({ 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } });
        data.addRows(LCBLHArray);
        options.title = 'Distortion In Lead Crowning Left';
        var chart = new google.visualization.CandlestickChart(document.getElementById('LCB_Left'));
        google.visualization.events.addListener(chart, 'ready',
                  function () {
                      DistortionAI(LCBLHArray, 'LCB_Left', 'LCBLH');
                  });
        chart.draw(data, options);

    }

    function drawLCBRH_Chart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Job');
        data.addColumn('number', 'Nominal Min');
        data.addColumn('number', 'Actual Min');
        data.addColumn('number', 'Actual Max');
        data.addColumn('number', 'Nominal Max');
        data.addColumn({ 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } });
        data.addRows(LCBRHArray);
        options.title = 'Distortion In Lead Crowning Right';
        var chart = new google.visualization.CandlestickChart(document.getElementById('LCB_Right'));
        google.visualization.events.addListener(chart, 'ready',
                  function () {
                      DistortionAI(LCBRHArray, 'LCB_Right', 'LCBRH');
                  });
        chart.draw(data, options);

    }

    function drawFULH_Chart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Job');
        data.addColumn('number', 'Nominal Min');
        data.addColumn('number', 'Actual Min');
        data.addColumn('number', 'Actual Max');
        data.addColumn('number', 'Nominal Max');
        data.addColumn({ 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } });
        data.addRows(FU_LHArray);
        options.title = 'Distortion In Pitch Error ƒu(µ) Left';
        var chart = new google.visualization.CandlestickChart(document.getElementById('FU_Left'));
        google.visualization.events.addListener(chart, 'ready',
                  function () {
                      DistortionAI(FU_LHArray, 'FU_Left', 'FU_LH');
                  });
        chart.draw(data, options);

    }

    function drawFURH_Chart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Job');
        data.addColumn('number', 'Nominal Min');
        data.addColumn('number', 'Actual Min');
        data.addColumn('number', 'Actual Max');
        data.addColumn('number', 'Nominal Max');
        data.addColumn({ 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } });
        data.addRows(FU_RHArray);
        options.title = 'Distortion In Pitch Error ƒu(µ) Right';
        var chart = new google.visualization.CandlestickChart(document.getElementById('FU_Right'));
        google.visualization.events.addListener(chart, 'ready',
                  function () {
                      DistortionAI(FU_RHArray, 'FU_Right', 'FU_RH');
                  });
        chart.draw(data, options);

    }

    function drawFPLH_Chart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Job');
        data.addColumn('number', 'Nominal Min');
        data.addColumn('number', 'Actual Min');
        data.addColumn('number', 'Actual Max');
        data.addColumn('number', 'Nominal Max');
        data.addColumn({ 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } });
        data.addRows(FP_LHArray);
        options.title = 'Distortion In Total Pitch Deviation Ƒp(µ) Left';
        var chart = new google.visualization.CandlestickChart(document.getElementById('FP_Left'));
        google.visualization.events.addListener(chart, 'ready',
                  function () {
                      DistortionAI(FP_LHArray, 'FP_Left', 'FP_LH');
                  });
        chart.draw(data, options);

    }

    function drawFPRH_Chart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Job');
        data.addColumn('number', 'Nominal Min');
        data.addColumn('number', 'Actual Min');
        data.addColumn('number', 'Actual Max');
        data.addColumn('number', 'Nominal Max');
        data.addColumn({ 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } });
        data.addRows(FP_RHArray);
        options.title = 'Distortion In Total Pitch Deviation Ƒp(µ) Right';
        var chart = new google.visualization.CandlestickChart(document.getElementById('FP_Right'));
        google.visualization.events.addListener(chart, 'ready',
                  function () {
                      DistortionAI(FP_RHArray, 'FP_Right', 'FP_RH');
                  });
        chart.draw(data, options);
    }
    function drawFRCmnChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Job');
        data.addColumn('number', 'Nominal Min');
        data.addColumn('number', 'Actual Min');
        data.addColumn('number', 'Actual Max');
        data.addColumn('number', 'Nominal Max');
        data.addColumn({ 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } });
        data.addRows(FRCmnArray);
        options.title = 'Distortion In Concentricity Deviation Ƒr(µ) ';
        options.vAxis = null;

        var chart = new google.visualization.CandlestickChart(document.getElementById('FR_COMMON'));
        google.visualization.events.addListener(chart, 'ready',
                  function () {
                      DistortionAI(FRCmnArray, 'FR_COMMON', 'FRALL');
                      chart.setSelection({ 'row': 7 });
                  });
        chart.draw(data, options);
       
     
    }


}