<%@ Page Language="VB" AutoEventWireup="false" CodeFile="RailingEditor.aspx.vb" Inherits="RailingEditor" %>

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
    <link href="Content/bootstrap.min.css" rel="stylesheet" />
    <script src="Scripts/jquery-3.7.1.js"></script>
    <script src="Scripts/bootstrap.min.js"></script>
    <script type="text/javascript" src="Scripts/collect.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div>

        </div>
    </form>
</body>
</html>
