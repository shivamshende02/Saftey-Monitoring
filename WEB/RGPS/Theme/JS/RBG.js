var RavindraBhalchandraGaikwad = true;
var currentSkillMatrixUCObject;
var IamOkay = '';
var myLine = '';
var LinkUrl = 'http://tmlpnewskc31137.tmindia.tatamotors.com/RIYA_V03/'
function ShowSecuredAttachment(x) {
    var styl = 'body{margin:0px !important;padding:0px !important;background-color:gray;}iframe{display:block;position:absolute;top:0px;bottom:0px;left:0px;right:0px;margin:0px !important;padding:0px !important;width:100% !important;height:100% !important;border:none;}';
    document.head.innerHTML = document.head.innerHTML + '<style>' + styl + '</style>';
    document.body.innerHTML = " <iframe id='filedataFrame' src='"+LinkUrl+"ClientServerScriptData/AttachmentFile.aspx?ID=" + x + "' style='width:100%;height:100%'></iframe>"
    document.body.style.backgroundColor = 'gray';
}

function getOffsetPosition(elem) {
    var top = 0, left = 0;
    while (elem) {
        top = top + parseInt(elem.offsetTop)+window.scrollY;
        left = left + parseInt(elem.offsetLeft)+window.scrollX;
        elem = elem.offsetParent;
    }
    return { top: top, left: left };
}

function Min(x, y) { if (x < y) { return x; } else { return y; } }
function Max(x, y) { if (x > y) { return x; } else { return y; } }



function changeSkillLevel() {
    $(currentSkillMatrixUCObject).attr('class', $(this).attr('class')); $("#PLforSkillLevel").hide();
    var x = $(this).attr("data-value");
    $(currentSkillMatrixUCObject).children().first().attr("value",x);
}

$('.dropdown-toggle').each(function (index, value) {
    $(value).on('click', function () {
       // $(".dropdown-menu").hide();
        var x = $(this).parent().find(".dropdown-menu");
        //alert(x.html());
        //console.log( $(this).parent().find(".dropdown-menu"));
        x.toggle();
        //var z = $(this).parent().position().left + $(this).parent().parent().position().left;
        //console.log('Z:' + z);
        //var y = $(".navbar-static-top").width() +  - z;
       
        //console.log('Y:' + y);

    });
});

$(".content-wrapper").on('click', function () { $(".dropdown-menu").hide(); });