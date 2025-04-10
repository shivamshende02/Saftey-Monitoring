<%@ Page Language="VB" AutoEventWireup="false" CodeFile="Default.aspx.vb" Inherits="_Default" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <style>
        .form-group {
            margin-bottom: 15px;
        }

        label {
            font-weight: bold;
        }

        .form-container {
            padding: 20px;
            max-width: 800px;
            margin: auto;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 8px;
        }

            .form-container .btn {
                width: 100%;
            }

        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(to bottom, #eef2f3, #8e9eab);
            color: #333;
            padding: 20px;
        }

        .form-container {
            padding: 20px;
            max-width: 800px;
            margin: auto;
            background-color: #ffffff;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        label {
            font-weight: bold;
            color: #007bff;
        }

        .form-control {
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 10px;
            background-color: #f9f9f9;
        }

            .form-control:focus {
                border-color: #007bff;
                box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
            }

        select.form-control {
            background-color: #f9f9f9;
            color: #333;
        }

        .btn {
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            padding: 10px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

            .btn:hover {
                background-color: #0056b3;
            }

        .col-sm-4 {
            display: flex;
            align-items: center;
        }
        /* Add styles to make it look like a button */
        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: white;
            background-color: blue;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            cursor: pointer;
        }

            .button:hover {
                background-color: darkblue;
            }
    </style>
    <title>Configuration Form</title>
    <link href="Theme/bootstrap.min.css" rel="stylesheet" />
    <script src="Theme/JS/jquery-3.7.1.js"></script>
    <script src="Theme/JS/bootstrap.js"></script>
  
   
</head>
<body>

    <form id="Form1" runat="server" class="form-container">
        <asp:ScriptManager ID="am1" runat="server">
            <Services >
                <asp:servicereference Path="~/ServerScripts/CameraService.asmx" >

                </asp:servicereference>
            </Services>
        </asp:ScriptManager>


        <!-- -->
        <div class="form-group row">
            <label class="col-sm-4 col-form-label">Camera Name:</label>
            <div class="col-sm-8">
                <select id="CamSlt" class="form-control"></select>
                <input type="text" class="form-control" 
                    placeholder=""  id="CamName" onchange="camSelected();"  />
            </div>
        </div>
        <!-- Default URL -->
        <div class="form-group row">
            <label class="col-sm-4 col-form-label">Default URL:</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" placeholder="Default URL" id="DefaultURL" value="" />
            </div>
        </div>

        <!-- Height -->
        <div class="form-group row">
            <label class="col-sm-4 col-form-label">Height:</label>
            <div class="col-sm-8">
                <input type="number" class="form-control" placeholder="Height" id="Height" />
            </div>
        </div>

        <!-- Width -->
        <div class="form-group row">
            <label class="col-sm-4 col-form-label">Width:</label>
            <div class="col-sm-8">
                <input type="number" class="form-control" placeholder="Width" id="Width" />
            </div>
        </div>

        <!-- Ratio -->
        <div class="form-group row">
            <label class="col-sm-4 col-form-label">Ratio:</label>
            <div class="col-sm-8">
                <input type="number" min="0.01" max="0.99" class="form-control" placeholder="Ratio" id="Ratio" />
            </div>
        </div>

        <!-- Confidence Threshold -->
        <div class="form-group row">
            <label class="col-sm-4 col-form-label">Confidence Threshold:</label>
            <div class="col-sm-8">
                <input type="number" min="0.01" max="0.99" class="form-control" placeholder="Confidence Threshold" id="ConfidenceThreshold" />
            </div>
        </div>

        <!-- Iou Threshold -->
        <div class="form-group row">
            <label class="col-sm-4 col-form-label">Iou Threshold:</label>
            <div class="col-sm-8">
                <input type="number" min="0.01" max="0.99" class="form-control" placeholder="Iou Threshold" id="IouThreshold" />
            </div>
        </div>

        <!-- Human Class No -->
        <div class="form-group row">
            <label class="col-sm-4 col-form-label">Human Class No:</label>
            <div class="col-sm-8">
                <input type="number" class="form-control" placeholder="Human Class No" id="HumanClassNo" />
            </div>
        </div>

        <!-- Mobile Class No -->
        <div class="form-group row">
            <label class="col-sm-4 col-form-label">Mobile Class No:</label>
            <div class="col-sm-8">
                <input type="number" class="form-control" placeholder="Mobile Class No" id="MobileClassNo" />
            </div>
        </div>

        <!-- Box Overlap Threshold -->
        <div class="form-group row">
            <label class="col-sm-4 col-form-label">Box Overlap Threshold:</label>
            <div class="col-sm-8">
                <input type="number" min="0.01" max="0.99" class="form-control" placeholder="Box Overlap Threshold" id="BoxOverlapThreshold" />
            </div>
        </div>

        <!-- Railing Color -->
        <div class="form-group row">
            <label class="col-sm-4 col-form-label">Railing Color:</label>
            <div class="col-sm-8">
                <select id="RailingColor" class="form-control">
                    <option>RED</option>
                    <option>GREEN</option>
                    <option>BLUE</option>
                    <option>YELLOW</option>
                    <option>CYAN</option>
                    <option>MAGENTA</option>
                    <option>WHITE</option>
                    <option>BLACK</option>
                    <option>GRAY</option>
                    <option>ORANGE</option>
                    <option>PINK</option>
                    <option>PURPLE</option>
                    <option>BROWN</option>
                    <option>TRANSPARENT</option>
                </select>
            </div>
        </div>

        <!-- Human Rect Color -->
        <div class="form-group row">
            <label class="col-sm-4 col-form-label">Human Rect Color:</label>
            <div class="col-sm-8">
                <select id="HumanRectColor" class="form-control">
                    <option>RED</option>
                    <option>GREEN</option>
                    <option>BLUE</option>
                    <option>YELLOW</option>
                    <option>CYAN</option>
                    <option>MAGENTA</option>
                    <option>WHITE</option>
                    <option>BLACK</option>
                    <option>GRAY</option>
                    <option>ORANGE</option>
                    <option>PINK</option>
                    <option>PURPLE</option>
                    <option>BROWN</option>
                    <option>TRANSPARENT</option>
                </select>
            </div>
        </div>

        <!-- Mobile Rect Color -->
        <div class="form-group row">
            <label class="col-sm-4 col-form-label">Mobile Rect Color:</label>
            <div class="col-sm-8">
                <select id="MobileRectColor" class="form-control">
                    <option>RED</option>
                    <option>GREEN</option>
                    <option>BLUE</option>
                    <option>YELLOW</option>
                    <option>CYAN</option>
                    <option>MAGENTA</option>
                    <option>WHITE</option>
                    <option>BLACK</option>
                    <option>GRAY</option>
                    <option>ORANGE</option>
                    <option>PINK</option>
                    <option>PURPLE</option>
                    <option>BROWN</option>
                    <option>TRANSPARENT</option>
                </select>
            </div>
        </div>

        <!-- Violation Human Rect Color -->
        <div class="form-group row">
            <label class="col-sm-4 col-form-label">Violation Human Rect Color:</label>
            <div class="col-sm-8">
                <select id="ViolationHumanRectColor" class="form-control">
                    <option>RED</option>
                    <option>GREEN</option>
                    <option>BLUE</option>
                    <option>YELLOW</option>
                    <option>CYAN</option>
                    <option>MAGENTA</option>
                    <option>WHITE</option>
                    <option>BLACK</option>
                    <option>GRAY</option>
                    <option>ORANGE</option>
                    <option>PINK</option>
                    <option>PURPLE</option>
                    <option>BROWN</option>
                    <option>TRANSPARENT</option>
                </select>
            </div>
        </div>

        <!-- Show Camera -->
        <div class="form-group row">
            <label class="col-sm-4 col-form-label">ShowCam:</label>
            <div class="col-sm-8">
                <input type="checkbox" id="ShowCam" />
            </div>
        </div>

        <!-- X Offset -->
        <div class="form-group row">
            <label class="col-sm-4 col-form-label">XOffset:</label>
            <div class="col-sm-8">
                <input type="number" id="XOffset" />
            </div>
        </div>


        <!-- Frame Rate -->
        <div class="form-group row">
            <label class="col-sm-4 col-form-label">FrameRate:</label>
            <div class="col-sm-8">
                <input type="number" class="form-control" placeholder="FrameRate" id="FrameRate" />
            </div>
        </div>
        <%--<div class="form-group row">
            <label class="col-sm-4 col-form-label">Railings:</label>
            <div class="col-sm-8">
                <input type="text" style="width: 80%" placeholder="Railing" id="ADD" />
                <a href="tool.html" target="_blank" class="button">ADD</a>
            </div>

        </div>--%>

        <input type="button" class="btn btn-primary col-md-4" value="Save" onclick="SaveTo()"/>
        <input type="button" class="btn btn-success col-md-4" value="Add Railing" id="Rail" onclick="GetRailing(); "/>

    </form>
    <script>
        var cc;
        //var cc = {
        //    CamId: 0, Height: 0, Width: 0, HumanClassNo: 0, MobileClassNo: 0, XOffset: 0, FrameRate: 0,
        //    CameraName: "", URL: "", VoilationHumanRectColor: "", RailingColor: "", HumanRectColor: "", MobileRectColor: "",
        //    IsWebCam: false, ShowCam: false,
        //    Ratio: 0.0, ConfidenceThreshold: 0.0, IouThreshold: 0.0, BoxOverlapedThreshold: 0.0
        //}
        function SaveTo() {
            cc.CamId = parseInt($("#CamSlt option:selected").val())
            cc.Height = parseInt($("#Height").val())
            cc.Width = parseInt($("#Width").val())
            cc.HumanClassNo = parseInt($("#HumanClassNo").val())
            cc.MobileClassNo = parseInt($("#MobileClassNo").val())
            cc.MobileClassNo = parseInt($("#MobileClassNo").val())
            cc.XOffset = parseInt($("#XOffset").val())
            cc.FrameRate = parseInt($("#FrameRate").val())
            cc.CameraName = ($("#CamName").val()).trim()
            cc.URL = ($("#DefaultURL").val()).trim()
            cc.VoilationHumanRectColor = ($("#ViolationHumanRectColor").val()).trim()
            cc.RailingColor = ($("#RailingColor").val()).trim()
            cc.HumanRectColor = ($("#HumanRectColor").val()).trim()
            cc.MobileRectColor = ($("#MobileRectColor").val()).trim()           
            cc.ShowCam = (($("#ShowCam").is(":checked")))
            cc.Ratio = parseFloat(($("#Ratio").val()))
            cc.ConfidenceThreshold = parseFloat(($("#ConfidenceThreshold").val()))
            cc.IouThreshold = parseFloat(($("#IouThreshold").val()))
            cc.BoxOverlapedThreshold = parseFloat(($("#BoxOverlapThreshold").val()))
            if (cc.URL == "0") {
                cc.IsWebCam = true
            }
            else {
                cc.IsWebCam = false
            }
            CameraService.SaveFormData(cc, saveSuccess, CamListFail);
            
        }
        function saveSuccess(result) {
            alert("Saved Successfully")
        }

        function GetRailing() {
            

            var URL = `tool.aspx?Camid=${cc.CamId}&Height=${cc.Height}&Width=${cc.Width}`
            window.open(URL, "_blank", `width=${screen.width},height=${screen.height},left=0,top=0,resizable=no,scrollbars=yes` )
        }


        CameraService.EmptyConfig(function (red) {cc=red }, function (ex) {console.log(ex) });


        CameraService.CameraList(CamListSuccess, CamListFail)
        function CamListSuccess(result) {
            var s = ""
            result.map(i => {
                s += `<option value="${i.Id}">${i.Value}</option>`
            })

            $("#CamSlt").html(s)
            $("#CamSlt").on('change', CamSelectChange);
        }
        function CamListFail(ex) {
            console.log(ex)
        }

        function confirmSize(w, h) {
            cc.Width = w
            cc.Height = h
            $("#Height").val(h)
            $("#Width").val(w)
        }

        function selectOptionByText(selectId, text) {
            $(`#${selectId} option`).filter(function () {
                return $(this).text() === text; // Match the text content
            }).prop('selected', true);
        }
        $("#CamSlt").on('change', CamSelectChange);
        function CamSelectChange() {
            var s = $("#CamSlt option:selected").val()
            if (s == "0") {
                $("#CamName").removeAttr("disabled")
                $("#Rail").hide()

            }
            else {
                $("#CamName").attr("disabled", "disabled")
                $("#Rail").show()
                CameraService.LoadConfig(s, function (red) {
                    cc = red
                    $("#DefaultURL").val(red.URL)
                    $("#Height").val(red.Height)
                    $("#Width").val(red.Width)
                    $("#Ratio").val(red.Ratio)
                    $("#ConfidenceThreshold").val(red.ConfidenceThreshold)
                    $("#IouThreshold").val(red.IouThreshold)
                    $("#HumanClassNo").val(red.HumanClassNo)
                    $("#MobileClassNo").val(red.MobileClassNo)
                    
                    $("#XOffset").val(red.XOffset)
                    $("#BoxOverlapThreshold").val(red.BoxOverlapedThreshold)
                    $("#FrameRate").val(red.FrameRate)              
                    
                    $("#ShowCam").prop("checked", red.ShowCam)
                    selectOptionByText("RailingColor", red.RailingColor)
                    selectOptionByText("MobileRectColor", red.MobileRectColor)
                    selectOptionByText("HumanRectColor", red.HumanRectColor)
                    selectOptionByText("ViolationHumanRectColor", red.VoilationHumanRectColor)
                    

                    
                }, function (ex) { console.log(ex) })
            }
            $("#CamName").val($("#CamSlt option:selected").text())

            
        }


        
        
        

        $("#Rail").hide()
        function camSelected() {
            if ($("#CamSlt option:selected ").val() == "0") {

                $("#Rail").hide()

            } else {
                $("#Rail").show()
            }
            
            

        }

     

        
        

    </script>

</body>
</html>
