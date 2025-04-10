document.head.innerHTML = document.head.innerHTML + "<style>div > div > h4{font-weight:bold !important; font-size:14px !important; font-family:Calibri !important;} span > div > img{margin:2px;border:2px solid blue;} </style>";

if (document.getElementById("RIYASection").innerHTML.length < 10){
document.getElementById("RIYASection").innerHTML = '    <div style="height:410px; width:624px; margin:0 auto;">        <div id="containerR" style="width:170px;height:400px;float:left">    </div>       <div id="containerI" style="width:150px;height:400px;float:left">    </div>       <div id="containerY" style="width:150px;height:400px;float:left">    </div>       <div id="containerA" style="width:150px;height:400px;float:left">    </div>    </div>';
}
function getElementTop(elem) {

    yPos = elem.offsetTop;
    tempEl = elem.offsetParent;

    while (tempEl != null) {
        yPos += tempEl.offsetTop;
        tempEl = tempEl.offsetParent;
    }

    return yPos;
}


function getElementLeft(elem) {

    xPos = elem.offsetLeft;
    tempEl = elem.offsetParent;

    while (tempEl != null) {
        xPos += tempEl.offsetLeft;
        tempEl = tempEl.offsetParent;
    }
    return xPos;
}
$(document).ready(doitXZ);
$(window).on('resize', doitXZ);
function doitXZ() {
    var rd = $(".removable");
    rd.remove();
    DrawR();
    DrawI();
    DrawY();
    DrawA();
    setTimeout(function () {
        var x = $("#containerR div");
        for (var i = 0; i < x.length; i++) {
            if (x[i].getAttribute('style') == "width:100%;height:100%;display:flex;flex-direction:row;align-items:center;justify-content:center;" && x[i].parentElement.innerText.length > 5) {
                var d = document.createElement("div");
                d.style.position = "absolute";
                d.style.top = (getElementTop(x[i]) + (x[i].offsetHeight / 2)) + "px";
                d.style.left = (getElementLeft(x[i]) + (x[i].offsetWidth) + 5) + "px";
                d.style.border = "2px solid blue";
                d.style.width = "30px"
                d.style.height = "0px";
                d.className = "removable";
                document.body.appendChild(d);
            }
        }

        x = $("#containerI div");
        for (var i = 0; i < x.length; i++) {
            if (x[i].getAttribute('style') == "width:100%;height:100%;display:flex;flex-direction:row;align-items:center;justify-content:center;" && x[i].parentElement.innerText.length > 5) {
                var d = document.createElement("div");
                d.style.position = "absolute";
                d.style.top = (getElementTop(x[i]) + (x[i].offsetHeight / 2)) + "px";
                d.style.left = (getElementLeft(x[i]) + (x[i].offsetWidth) + 5) + "px";
                d.style.border = "2px solid green";
                d.style.width = "30px"
                d.style.height = "0px";
                d.className = "removable";
                document.body.appendChild(d);
            }
        }
        x = $("#containerA div");
        for (var i = 0; i < x.length; i++) {
            if (x[i].getAttribute('style') == "width:100%;height:100%;display:flex;flex-direction:row;align-items:center;justify-content:center;" && x[i].parentElement.innerText.length > 5) {
                var d = document.createElement("div");
                d.style.position = "absolute";
                d.style.top = (getElementTop(x[i]) + (x[i].offsetHeight / 2)) + "px";
                d.style.left = (getElementLeft(x[i]) - 28) + "px";
                d.style.border = "2px solid red";
                d.style.width = "25px"
                d.style.height = "0px";
                d.className = "removable";
                document.body.appendChild(d);
            }
        }
    }, 1000);
    var x = $("span > div > img");
    x[0].style.border = "2px solid maroon";
    x[1].style.border = "2px solid blue";
    x[2].style.border = "2px solid green";
    x[3].style.border = "2px solid red";
}

//setInterval(DrawR, 5000);

function DrawR() {
    RBGcharts.chart('containerR', {
        chart: {
            backgroundColor: 'transparent',
            inverted: true,
            style: { fontFamily: 'Cambria' }
        },
        tooltip: {
            outside: true,
            formatter: function () {
                return '<b>' + this.point.name + '</b> <br/> ' + this.point.tooltip;
            }
        },
        credits: { enabled: false },
        title: {
            text: null
        },

        series: [{
            nodeWidth: 25,

            linkRadius: 1,
            linkLineWidth: 3,
            linkColor: 'transparent',
            linecap: 'round',
            type: 'RBGOrgchart',
            name: 'Riya',
            keys: ['from', 'to'],
            data: [
                ['RR', 'Ra'],
                ['Ra', 'Rb'],
                ['Rb', 'Rc'],
                ['Rc', 'R1'],
                ['R1', 'R2'],
                ['R2', 'R3'],
                ['R3', 'R4'],
                ['R4', 'R5'],
                ['R5', 'R6'],
                ['R6', 'R7']

            ],

            nodes: [{
                id: "RR",
                name: "R for",
                image: 'Theme/images/R.png',
                only: true,
                height: 150, color: 'transparent', border: 'none', borderColor: 'transparent'
                , tooltip: 'Realtime<br/>Retrocognitive<br/>Remarkable<br/>Regulated<br/>Reflective<br/>Ravindra\'s',
            },
            { name: "R for", id: 'Ra', width: 0, color: 'transparent', borderColor: 'transparent', tooltip: 'Realtime<br/>Retrocognitive<br/>Remarkable<br/>Regulated<br/>Reflective<br/>Ravindra\'s', },
            { name: "R for", id: 'Rb', width: 0, color: 'transparent', borderColor: 'transparent', tooltip: 'Realtime<br/>Retrocognitive<br/>Remarkable<br/>Regulated<br/>Reflective<br/>Ravindra\'s', },
            { name: "R for", id: 'Rc', width: 0, color: 'transparent', borderColor: 'transparent', tooltip: 'Realtime<br/>Retrocognitive<br/>Remarkable<br/>Regulated<br/>Reflective<br/>Ravindra\'s', },

                {
                    id: 'R1',
                    name: 'Real-time',
                    tooltip: 'It provides results and output without any delay',
                    height: 25
                }, {
                    id: 'R2',
                    name: 'Retro-cognitive',
                    tooltip: 'It has ability to teach itself based on past data and user experiance',
                    height: 25
                }, {
                    id: 'R3',
                    name: 'Remarkable',
                    tooltip: 'It works unusually and surprising in a way that people notice ',
                    height: 25
                }, {
                    id: 'R4',
                    name: 'Regulated',
                    tooltip: 'It is self regulated. and has provision to regulate its algorithm from server side',
                    height: 25
                }, {
                    id: 'R5',
                    name: 'Reflective',
                    tooltip: 'Its algorithm makes it think deeply and silently in background without consuming much of Resources e.g. RAM and Processor',
                    height: 25
                }, {
                    id: 'R6',
                    name: 'Receptive',
                    tooltip: 'It has ability to understand users speech synthesis more and more as one uses it. ',
                    height: 25
                }, {
                    id: 'R7',
                    name: 'Ravindra\'s',
                    tooltip: 'Because it is developed by Ravindra Bhalchandra Gaikwad, also called as Ravindra\'s Intelligence Yielding Architecture ',
                    height: 25
                }],


        }],


    });
}
function DrawI() {
    RBGcharts.chart('containerI', {
        chart: {
            backgroundColor: 'transparent',
            inverted: true,
            style: { fontFamily: 'Cambria' }
        },
        tooltip: {
            outside: true,
            formatter: function () {
                return '<b>' + this.point.name + '</b> <br/> ' + this.point.tooltip;
            }
        },
        credits: { enabled: false },
        title: {
            text: null
        },

        series: [{


            linkRadius: 1,
            linkLineWidth: 3,
            linkColor: 'transparent',
            linecap: 'round',
            type: 'RBGOrgchart',
            name: '<u>R</u>iya',
            keys: ['from', 'to'],
            data: [
                ['RR', 'R1'],


            ],

            nodes: [{
                id: "RR",
                name: "I for",
                image: 'Theme/images/i.png',
                tooltip: 'Intelligence',
                only: true,
                height: 150, color: 'transparent', border: 'none', borderColor: 'transparent'
            },

                {
                    id: 'R1',
                    name: 'Intelligence',
                    tooltip: 'It is newly invented Artificial Intelligence algorithm. There may be sililar algorithms in use but it is build from scratch.',
                    height: 235, color: 'blue'
                }],


        }],


    });
}
function DrawY() {
    RBGcharts.chart('containerY', {
        chart: {
            backgroundColor: 'transparent',
            inverted: true,
            style: { fontFamily: 'Cambria' }
        },
        tooltip: {
            outside: true,
            formatter: function () {
                return '<b>' + this.point.name + '</b> <br/> ' + this.point.tooltip;
            }
        },
        credits: { enabled: false },
        title: {
            text: null
        },

        series: [{


            linkRadius: 1,
            linkLineWidth: 3,
            linkColor: 'transparent',
            linecap: 'round',
            type: 'RBGOrgchart',
            name: '<u>R</u>iya',
            keys: ['from', 'to'],
            data: [
                ['RR', 'R1'],


            ],

            nodes: [{
                id: "RR",
                name: "Y for",
                image: 'Theme/images/y.png',
                tooltip: 'Yielding',
                only: true,
                height: 150, color: 'transparent', border: 'none', borderColor: 'transparent'
            },

                {
                    id: 'R1',
                    name: 'Yielding',
                    tooltip: 'Its database is auto growing as being used, thus Yielding its Knowledge resources',
                    height: 235, color: 'green'
                }],


        }],


    });
}
function DrawA() {
    RBGcharts.chart('containerA', {
        chart: {
            backgroundColor: 'transparent',
            inverted: true,
            style: { fontFamily: 'Cambria' }
        },
        tooltip: {
            outside: true,
            formatter: function () {
                return '<b>' + this.point.name + '</b> <br/> ' + this.point.tooltip;
            }
        },
        credits: { enabled: false },
        title: {
            text: null
        },

        series: [{


            linkRadius: 1,
            linkLineWidth: 3,
            linkColor: 'transparent',
            linecap: 'round',
            type: 'RBGOrgchart',
            name: '<u>R</u>iya',
            keys: ['from', 'to'],
            data: [
                ['RR', 'A1'],
                 ['A1', 'A2'],

            ],

            nodes: [{
                id: "RR",
                name: "A for",
                image: 'Theme/images/a.png',
                tooltip: 'Architecture <br/>Assistant',
                only: true,
                height: 150, color: 'transparent', border: 'none', borderColor: 'transparent'
            },


            {
                id: 'A1',
                name: 'Architecture',
                tooltip: 'Architecture supports various platforms like Intranet, web, Mobile, PC. It is built in such a way that every app built in it is horizontally deployable across all Tata Motors Plants and Shops.',
                height: 75, color: 'red'

            }, {
                id: 'A2',
                name: 'Assistant',
                tooltip: 'It comes with virtual assistant. Its Beta Revision is under testing and development',
                height: 75, color: 'red'
            }],


        }],


    });
}


$("#submitpwd").on('click', function () {
    $("#txtPassWord").val(superCrypt($("#txtPassWord").val()));
    $("#MNXZCVB").val($("#txtPassWord").val());
    $("#txtPassWord").val("")
});