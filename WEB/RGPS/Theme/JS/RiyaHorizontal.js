if (document.getElementById("RIYASection").innerHTML.length<10){
document.getElementById("RIYASection").innerHTML = ('<div id="container" style="margin:0 auto;">  </div>');
}
document.head.innerHTML = document.head.innerHTML + '<style>.HDR{font-size:80px;width:80px;text-align:center ;}.lft{float:left;}.rgt{float:right;}</style>';

$(document).ready(DrawRIYA);
//setInterval(DrawRIYA, 15000);

function DrawRIYA() {
    RBGcharts.chart('container', {
        chart: {
            backgroundColor: 'transparent',
            inverted: false
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
            nodeWidth: '20%',
            linkRadius: 1,
            linkLineWidth: 3,
            linkColor: 'navy',
            linecap: 'round',
            type: 'RBGOrgchart',
            name: 'Riya',
            keys: ['from', 'to'],
            data: [
                ['R1', 'I1'],
                ['R2', 'I1'],
                ['R3', 'I1'],
                ['R4', 'I1'],
                ['R5', 'I1'],
                ['R6', 'I1'],
                ['R7', 'I1'],
                ['I1', 'Y1'],
                ['Y1', 'A1'],
                ['Y1', 'A2']
            ],

            nodes: [{
                id: 'R1',
                name: 'Real-time',
                tooltip: 'It provides results and output without any delay',

            }, {
                id: 'R2',
                name: 'Retro-cognitive',
                tooltip: 'It has ability to teach itself<br/> based on past data and user experiance',

            }, {
                id: 'R3',
                name: 'Remarkable',
                tooltip: 'It works unusually and surprising<br/> in a way that people notice ',

            }, {
                id: 'R4',
                name: 'Regulated',
                tooltip: 'It is self regulated. and has provision to<br/> regulate its algorithm from server side',



            }, {
                id: 'R5',
                name: 'Reflective',
                tooltip: 'Its algorithm makes it think deep <br/>and silently in background without consuming<br/> much of Resources e.g. RAM and Processor',

            }, {
                id: 'R6',
                name: 'Receptive',
                tooltip: 'It has ability to understand users speech<br/> synthesis more and more as one uses it. ',

            }, {
                id: 'R7',

                name: 'Ravindra\'s',
                tooltip: 'Because it is developed by Ravindra<br/> Bhalchandra Gaikwad, also called as<br/> Ravindra\'s Intelligence Yielding Architecture ',


            }, {
                id: 'I1',
                name: 'Intelligence',
                tooltip: 'It is newly invented Artificial Intelligence<br/> algorithm. There may be sililar algorithms<br/> in use but it is build from scratch.',

            }, {
                id: 'Y1',
                name: 'Yielding',
                tooltip: 'Its database is auto growing as being used,<br/> thus Yielding its Knowledge resources',

            }, {
                id: 'A1',
                name: 'Architecture',
                tooltip: 'Architecture supports various platforms<br/> like Intranet, web, Mobile, PC.<br/> It is built in such a way that every<br/> app built in it is horizontally deployable<br/> across all Tata Motors Plants and Shops.',


            }, {
                id: 'A2',
                name: 'Assistant',
                tooltip: 'It comes with virtual assistant. Its<br/> Beta Revision is under testing and development',

            }],


        }],


    });
}