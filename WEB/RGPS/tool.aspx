<%@ Page Language="VB" AutoEventWireup="false" CodeFile="tool.aspx.vb" Inherits="tool" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Get Coordinates of Clicked Points</title>
   
    <link href="Theme/bootstrap.min.css" rel="stylesheet" />
    <style>
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: Arial, sans-serif;
        }

        canvas {
            border: 1px solid black;
            cursor: crosshair;
        }

        #output {
            margin-top: 20px;
        }

        #cxd {
            position: relative;
            left: 0px;
            width: 100%;
        }

        .dot {
            width: 8px;
            height: 8px;
            margin-top: -4px;
            margin-left: -4px;
            position: absolute;
            background-color: red;
            z-index: 1000;
            border-radius: 50%;
        }

        #container {
            width: 100%;
            height: 100%;
            margin: 0px;
            overflow: scroll;
            position: absolute;
            left: 0px;
            top: 0px;
        }

        .connector {
            height: 1px;
            width: 1px;
            border: none;
            background-color: red;
            position: absolute;
            z-index: 1002;
            transform-origin: 0 50%;
            pointer-events: none
        }

        .form-control, .form-label {
            width: 150px !important;
        }
    </style>
    <link href="Theme/jquery-ui.css" rel="stylesheet" />
    
  
    
    <!--<script src="Scripts/bootstrap.min.js"></script>-->
</head>
<body>

    <form id="Form1" runat="server" class="form-container">
    <asp:ScriptManager ID="am1" runat="server">
        <Services >
            <asp:servicereference Path="~/ServerScripts/CameraService.asmx" >

            </asp:servicereference>
        </Services>
    </asp:ScriptManager>




    <div id="container" class="form-container">


        <h1 style="text-align:center;">Find Coordinates on Image</h1>
        <div class="row text-center " style="width:100%;align-content:center;align-self:center">
            <label class="form-label">Railing:</label>

            <select id="RailNames" class="form-control" onchange="railSelected()"></select>
            <input type="text" class="form-control"
                   placeholder="" id="Railip" onchange="timepass()" />
            <button type="button" class="btn btn-primary" id="rAdd">Add</button>
            <button type="button" class="btn btn-primary" onclick="SendCoords()">Submit</button>
            <button type="button" class="btn btn-primary" onclick="bandkr()">Exit</button>
        </div>



        <img id="dynamicImage" src="" alt="Dynamic Image">

        <br />

    </div>
        </form>
    <script src="Theme/JS/jquery-3.7.1.js"></script>


    <script src="Theme/JS/jquery-ui.js"></script>
    <script src="Theme/JS/RBGLITE.min.js"></script>
    <script>
        var cc;
        let saveCoord = window.opener.getRailData1
        let image = new Image();
        let isDragging = false;

        let offsetX, offsetY, ddx;
        let counter = 0;

        const imgElement = document.getElementById('dynamicImage');
        var config = {
            id: 0,
            width: 0,
            height: 0

        }


        function confirmSize(w, h) {
            cc.Width = w
            cc.Height = h
            $("#Height").val(h)
            $("#Width").val(w)
        }

        function getRailData(id, xyz) {

            CameraService.RailingList(id, CamListSuccess, CamListFail)
            function CamListSuccess(result) {
                var s = ""
                result.map(i => {
                    s += `<option value="${i.Id}">${i.Value}</option>`
                })

                xyz.html(s)
                //xyz.on('change', RailSelectChange);
            }
            function CamListFail(ex) {
                console.log(ex)
            }


        }





        getRailData(config.id, $("#RailNames"))
        if (Request.QueryString("CamId") == null || Request.QueryString("CamId") == "") {
            alert("Invalid Document Call")
            document.body.innerHTML = ("<h1>Invalid Document Call</h1>")
        } else {
            config.id = parseInt(Request.QueryString("Camid"))
            config.height = parseInt(Request.QueryString("Height"))
            config.width = parseInt(Request.QueryString("Width"))
            imgElement.src = "Images/" + Request.QueryString("Camid") + ".jpg"
            imgElement.addEventListener('load', (e) => {
                var x = imgElement.getBoundingClientRect()
                w = x.width
                h = x.height
                $("#Height").val(h)
                $("#Width").val(w)

            })

            getRailData(config.id, $("#RailNames"))
        }



        






        // Track Clicks and Show Coordinates
        imgElement.addEventListener('mousedown', (e) => {
            if (ddx) { return }
            const rect = imgElement.getBoundingClientRect();
            const x = e.clientX
            const y = e.clientY
            const X = e.clientX - rect.left; // X-coordinate relative to canvas
            const Y = e.clientY - rect.top;  // Y-coordinate relative to canvas
            const rName = $("#RailNames option:selected ").val()
            if (rName == "" || rName == "0") {
                return
            }

            var dot = $(`<div class="dot"   oncontextmenu="doremove(this)"   data-railname = "${rName}" style="left:${x}px;top:${y}px;">            </div>`)
            $("#container").append(dot)
            $(`#${counter}`).draggable()
            const coords = { x: Math.round(x), y: Math.round(y) };
            var iddd = $("#RailNames option:selected").val()
            //console.log(iddd, X, Y)
            //var ss = saveCoord(iddd, parseInt(X), parseInt(Y))
            //    console.log(ss)


            DrawPolygoan()

        });

        function timepass() {
            if ($("#Railip").val().trim() == "") {
                $("#rAdd").attr("disabled", "disabled")
            }
            else {
                $("#rAdd").removeAttr("disabled")
            }
        }

        function DrawPolygoan() {
            var dots = $(".dot")

            var poly = {}
            dots.each((i, v) => {
                makeDraggable(v)
                var ss = $(v).data("railname")
                if (!poly[ss]) {
                    poly[ss] = []
                }

                poly[ss].push($(v))
                //console.log(poly[ss])

            })


            $('.connector').remove()
            for (var rail in poly) {


                for (var i = 0; i < poly[rail].length - 1; i++) {
                    var con = $("<div class='connector'>   </div>")
                    $("#container").append(con)
                    //console.log(poly[rail][i])
                    DrawCon(poly[rail][i], poly[rail][i + 1], con)
                }
            }
        }

        function DrawCon(div1, div2, lineDiv) {
            // Get the positions and dimensions of the divs
            const pos1 = div1[0].getBoundingClientRect()
            const pos2 = div2[0].getBoundingClientRect()


            // Calculate the centers of each div
            const x1 = pos1.x + 4
            const y1 = pos1.y + 4

            const x2 = pos2.x + 4
            const y2 = pos2.y + 4

            // Calculate the distance and angle
            const dx = x2 - x1;
            const dy = y2 - y1;
            const distance = Math.sqrt(dx * dx + dy * dy); // Length of the line
            const angle = Math.atan2(dy, dx) * (180 / Math.PI); // Angle in degrees

            // Style the line div
            $(lineDiv)
                .css({
                    width: `${distance}px`, // Set the line length
                    top: `${y1}px`, // Set the starting position
                    left: `${x1}px`,
                    transform: `rotate(${angle}deg)`, // Rotate to the correct angle
                });
        }

        // Call the function to connect the divs










        function railSelected() {
            var rName = $("#RailNames option:selected ").val()
            if (rName == "0") {
                $("#Railip").removeAttr("disabled", "disabled")
                $("#Railip").show()
                $("#rAdd").show()

            }
            else {
                $("#Railip").attr("disabled", "disabled")
                $("#Railip").hide()
                $("#rAdd").hide()
                const rect = imgElement.getBoundingClientRect();

                CameraService.GetCoords(rName, function (result) {
                    result.forEach(i => {

                        var dot = $(`<div class="dot" oncontextmenu="doremove(this)"
                            data-railname = "${rName}" style="left:${i.x + rect.left}px;top:${i.y + rect.top}px;">            </div>`)
                        $("#container").append(dot);
                    })
                    DrawPolygoan()
                }, function (error) {
                    console.log(error)
                })






            }

        }







        function SendCoords() {
            var d = $(".dot")
            console.log(d)
            var ll = []
            const rect = imgElement.getBoundingClientRect();
            d.each((i, v) => {
                var id = $(v).data("railname")
                var x = parseInt($(v).css("left").replace('px', '')) - rect.left
                var y = parseInt($(v).css("top").replace('px', '')) - rect.top
                ll.push(`${id}|${parseInt(x)}|${parseInt(y)}`)
            })
            console.log(ll)           
            CameraService.FireRC(ll, function (result) {
                alert("Saved Successfully!!! This window will close now . You can re-open it from  Main page")
                window.close()
            },
                function (error) {
                    console.log(error)
                }
            )
            //

        }

        function bandkr() {
            window.close()
        }


        $(document).ready(function () {
            $("#rAdd").click(function () {
                $.ajax({
                    type: "POST",
                    url: "http://shivamm/rgps/ServerScripts/CameraService.asmx/FireCRM",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify({ "camId": config.id, "railingName": $("#Railip").val() }),
                    success: function (response) {
                        location.reload(true)
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                    }
                });
            });
        });


        function makeDraggable(element) {


            element.addEventListener('mousedown', function (e) {
                if (e.button != 0) {
                    return
                }
                // Calculate the offset based on the mouse position and element's current position
                offsetX = e.clientX - parseInt($(element).css('left').replace('px', ''));
                offsetY = e.clientY - parseInt($(element).css('top').replace('px', ''));
                ddx = true;
                // Add event listeners for mousemove and mouseup
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
                document.addEventListener('contextmenu', doremove);
            });



            function onMouseMove(e) {
                if (e.buttons != 1) {
                    return
                }
                // Set the position of the element
                element.style.position = 'absolute';
                element.style.left = (e.clientX - offsetX) + 'px';
                element.style.top = (e.clientY - offsetY) + 'px';
            }

            function onMouseUp(e) {
                if (e.button != 0) {
                    return
                }
                // Remove the event listeners
                ddx = false
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                DrawPolygoan()
            }
        }
        function doremove(element) {
            $(element).remove()

            DrawPolygoan()
            event.preventDefault()

        }




    </script>
</body>
</html>
