<%@ WebService Language="VB"  Class="CameraService" %>
Imports System.Web
Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.Data.SqlClient
Imports System.Data
Imports System.Net.Mime
Imports Newtonsoft.Json.Linq
Imports System.Web.Script.Serialization
Imports System.IO





<System.Web.Script.Services.ScriptService()>
<WebService(Namespace:="http://tempuri.org/")>
<WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
Public Class CameraService
    Inherits System.Web.Services.WebService

    Public Shared CamCon As String = "Data Source=SHIVAMM;Initial Catalog=CAMERA;User ID=sa;Password=shivam123;Connection Timeout=9900;TrustServerCertificate=True;"

    Public Class idValuePair
        Public Id As String
        Public Value As String

        Sub New()

        End Sub
        Sub New(i As String, v As String)
            Id = i
            Value = v
        End Sub
    End Class



    <WebMethod()>
    Public Function NoScreenShotList() As List(Of idValuePair)
        Dim d As New List(Of idValuePair)
        Dim da As New SqlDataAdapter("Select CamID,[URL] from CamConfig where ImageGenerated=0 or ImageGenerated is null and [URL] <>'0'", CamCon)
        Dim dt As New DataTable
        da.Fill(dt)
        For Each dr As DataRow In dt.Rows
            d.Add(New idValuePair(dr(0), dr(1)))
        Next
        Return d
    End Function

    <WebMethod()>
    Public Function ScreenShotUpdate(Camid As Integer) As Boolean

        Dim qry As String = "update CamConfig set ImageGenerated = 1 where camid = " & Camid
        Dim da As New SqlDataAdapter(qry, CamCon)
        Dim dt As New DataTable
        da.Fill(dt)

        Return True

    End Function


    <WebMethod()>
    Public Function EmptyConfig() As CamConfig
        Return New CamConfig

    End Function

    <WebMethod()>
    Public Function LoadConfig(dd As Integer) As CamConfig
        Return New CamConfig(dd)
    End Function

    <WebMethod()>
    Public Function CameraList() As List(Of idValuePair)
        Dim ll As New List(Of idValuePair)
        Dim da As New SqlDataAdapter("Select CamId,CameraName from CamConfig", CamCon)
        Dim i As New idValuePair("0", "New Camera")
        ll.Add(i)
        Dim dt As New DataTable
        da.Fill(dt)
        For Each dr As DataRow In dt.Rows
            ll.Add(New idValuePair(dr(0), dr(1)))
        Next
        Return ll
    End Function



    <WebMethod()>
    Public Function FireCRM(camId As String, railingName As String) As Integer
        Using conn As New SqlConnection(CamCon)
            conn.Open()

            ' Insert the new row with the RailingName and CamId
            Dim insertCmd As New SqlCommand("INSERT INTO CamRailingMatrix (CamId, RailingName) VALUES (@CamId, @RailingName); SELECT SCOPE_IDENTITY();", conn)
            insertCmd.Parameters.AddWithValue("@CamId", camId)
            insertCmd.Parameters.AddWithValue("@RailingName", railingName)

            ' Execute the insert and retrieve the generated RailingId
            Dim result = insertCmd.ExecuteScalar()

            ' If the result is not null, convert it to an integer and return
            If result IsNot Nothing Then
                Return Convert.ToInt32(result) ' This is the generated RailingId
            Else
                Throw New Exception("Failed to retrieve RailingId after insertion.")
            End If
        End Using
    End Function



    <WebMethod()>
    Public Function FireRC(ll As List(Of String)) As String
        If ll.Count = 0 Then
            Return "no data to save "
        End If

        ' Initialize the query to delete existing data
        Dim query As String = "delete from RailingCoordinates where RailingID = 0" & ll(0).Split("|")(0) & ";" & vbNewLine

        For Each l In ll
            ' Split the string 'l' by "|" to get individual values
            Dim parts As String() = l.Split("|")

            ' Check if we have at least 3 parts to insert into the database
            If parts.Length >= 3 Then
                query += $"INSERT INTO RailingCoordinates (RailingID, x, y) VALUES ({parts(0)}, {parts(1)}, {parts(2)});" & vbNewLine
            Else
                ' Handle cases where there are not enough parts
                Return "Invalid data format for: " & l
            End If
        Next

        ' Execute the query using SqlDataAdapter (you may want to change this to SqlCommand)
        Dim da As New SqlDataAdapter(query, CamCon)
        Dim dt As New DataTable
        da.Fill(dt)

        Return "Operation Successful"
    End Function



    Public Class coord
        Public x, y As Integer
        Sub New()

        End Sub
        Sub New(a As Integer, b As Integer)
            x = a
            y = b

        End Sub

    End Class

    Public Class ViolationRecord
        Public Property Id As Integer
        Public Property X As Integer
        Public Property Y As Integer
        Public Property W As Integer
        Public Property H As Integer
    End Class

    <WebMethod()>
    Public Function GetImageData() As List(Of ViolationRecord)
        Dim da As New SqlDataAdapter("SELECT id, x, y, w, h FROM ViolationTable WHERE ischeck = 0", CamCon)
        Dim dt As New DataTable
        da.Fill(dt)

        Dim result As New List(Of ViolationRecord)()

        ' Loop through each row in DataTable and convert it to ViolationRecord object
        For Each dr As DataRow In dt.Rows
            Dim record As New ViolationRecord() With {
                .Id = Convert.ToInt32(dr("id")),
                .X = Convert.ToInt32(dr("x")),
                .Y = Convert.ToInt32(dr("y")),
                .W = Convert.ToInt32(dr("w")),
                .H = Convert.ToInt32(dr("h"))
            }

            result.Add(record)
        Next

        Return result
    End Function




    <WebMethod()>
    Public Function GetCoords(rid As String) As List(Of coord)
        Dim da As New SqlDataAdapter("Select x, y from RailingCoordinates where RailingId = " & rid & " order by Id", CamCon)
        Dim dt As New DataTable
        da.Fill(dt)
        Dim xx As New List(Of coord)
        For Each dr As DataRow In dt.Rows
            xx.Add(New coord(dr(0), dr(1)))
        Next

        Return xx
    End Function

    <WebMethod()>
    Public Function RailingList(camId As String) As List(Of idValuePair)
        Dim ll As New List(Of idValuePair)
        Dim da As New SqlDataAdapter("Select RailingId,RailingName from CamRailingMatrix where CamId = " & camId, CamCon)
        Dim i As New idValuePair("0", "New Railing")
        ll.Add(i)
        Dim dt As New DataTable
        da.Fill(dt)
        For Each dr As DataRow In dt.Rows
            ll.Add(New idValuePair(dr(0), dr(1)))
        Next
        Return ll
    End Function

    <WebMethod()>
    Public Function SaveV(ByVal frame As String, ByVal CamId As Integer, ByVal x As Decimal, ByVal y As Decimal, ByVal h As Decimal, ByVal w As Decimal, ByVal activity As String) As String
        Dim newID As Integer = 0

        Using conn As New SqlConnection(CamCon)
            Using cmd As New SqlCommand("InsertViolationData", conn)
                cmd.CommandType = CommandType.StoredProcedure

                ' Adding parameters
                cmd.Parameters.AddWithValue("@CamId", CamId)
                cmd.Parameters.AddWithValue("@x", x)
                cmd.Parameters.AddWithValue("@y", y)
                cmd.Parameters.AddWithValue("@h", h)
                cmd.Parameters.AddWithValue("@w", w)
                cmd.Parameters.AddWithValue("@activity", activity)

                ' Output parameter for new ID
                Dim outputParam As New SqlParameter("@NewID", SqlDbType.Int)
                outputParam.Direction = ParameterDirection.Output
                cmd.Parameters.Add(outputParam)

                ' Execute stored procedure
                conn.Open()
                cmd.ExecuteNonQuery()
                conn.Close()

                ' Retrieve the newly inserted ID
                newID = Convert.ToInt32(outputParam.Value)
            End Using
        End Using

        Dim folderPath As String = HttpContext.Current.Server.MapPath("~/ViolationImages/")

        If Not Directory.Exists(folderPath) Then
            Directory.CreateDirectory(folderPath)
        End If

        ' Convert Base64 to Byte Array
        Dim imageBytes As Byte() = Convert.FromBase64String(frame)

        ' Define file path (Save as JPG)
        Dim filePath As String = Path.Combine(folderPath, newID & ".jpg")

        ' Save the image
        File.WriteAllBytes(filePath, imageBytes)

        Return "!!"
    End Function






    Public Class CamConfig
        Public CamId, Height, Width, HumanClassNo, MobileClassNo, XOffset, FrameRate As Integer
        Public ImageOutput, ImageError, CameraName, URL, VoilationHumanRectColor, RailingColor, HumanRectColor, MobileRectColor As String
        Public Ratio, ConfidenceThreshold, IouThreshold, BoxOverlapedThreshold As Double
        Public IsWebCam, ShowCam, imageGenrated As Boolean
        Public Railings As List(Of List(Of List(Of Integer)))


        Sub New()

        End Sub

        Sub New(dr As DataRow, R As List(Of List(Of List(Of Integer))))
            CamId = dr("CamId")
            URL = dr("URL")
            CameraName = dr("CameraName")
            Railings = R
            Height = dr("Height")
            Width = dr("Width")
            HumanClassNo = dr("HumanClassNo")
            MobileClassNo = dr("MobileClassNo")
            XOffset = dr("XOffset")
            FrameRate = dr("FrameRate")
            VoilationHumanRectColor = dr("VoilationHumanRectColor")
            RailingColor = dr("RailingColor")
            HumanRectColor = dr("HumanRectColor")
            MobileRectColor = dr("MobileRectColor")
            Ratio = dr("Ratio")
            ConfidenceThreshold = dr("ConfidenceThresold")
            IouThreshold = dr("IOUThresold")
            BoxOverlapedThreshold = dr("BocOverlapThreshold")
            ShowCam = dr("ShowCases")
            IsWebCam = dr("IsWebCam")

        End Sub

        Sub New(id As Integer)
            Dim da As New SqlDataAdapter("select *  from CamConfig where camid = " & id, CamCon)
            Dim dt As New DataTable
            da.Fill(dt)
            If (dt.Rows.Count > 0) Then
                Dim dr As DataRow = dt.Rows(0)
                CamId = dr("CamId")
                URL = dr("URL")
                CameraName = dr("CameraName")
                Height = dr("Height")
                Width = dr("Width")
                HumanClassNo = dr("HumanClassNo")
                MobileClassNo = dr("MobileClassNo")
                XOffset = dr("XOffset")
                FrameRate = dr("FrameRate")
                VoilationHumanRectColor = dr("VoilationHumanRectColor")
                RailingColor = dr("RailingColor")
                HumanRectColor = dr("HumanRectColor")
                MobileRectColor = dr("MobileRectColor")
                Ratio = dr("Ratio")
                ConfidenceThreshold = dr("ConfidenceThresold")
                IouThreshold = dr("IOUThresold")
                BoxOverlapedThreshold = dr("BocOverlapThreshold")
                ShowCam = dr("ShowCases")
                IsWebCam = dr("IsWebCam")

            End If
        End Sub

    End Class

    <WebMethod()>
    Public Function SaveFormData(dd As CamConfig) As CamConfig
        Dim sql = $"EXEC [dbo].[EditCamComfig] @cid = {dd.CamId},@camname = N'{dd.CameraName }',@iswcam = {IIf(dd.IsWebCam, 1, 0) },
@url = N'{dd.URL }',@hgt = {dd.Height },@wdt = {dd.Width },@rato = {dd.Ratio },@confTh = {dd.ConfidenceThreshold },@iouTh = {dd.IouThreshold },
@HumCls = {dd.HumanClassNo },@mobcls = {dd.MobileClassNo },@violCol = N'{dd.VoilationHumanRectColor }',@xofset = {dd.XOffset },@showcam = {dd.ShowCam },
@frmRt = {dd.FrameRate},@bocOvrlp = {dd.BoxOverlapedThreshold },@railcolr = N'{dd.RailingColor }',@humcolr = N'{dd.HumanRectColor }',@mobCold = N'{dd.MobileRectColor }';
"

        Dim da As New SqlDataAdapter(sql, CamCon)
        Dim dt As New DataTable
        da.Fill(dt)

        Dim q = New CamConfig(Convert.ToInt32(dt.Rows(0)("NewCamID")))


        Return q

    End Function

    <WebMethod()>
    Public Function getCamConfig() As List(Of CamConfig)
        Dim xy As New List(Of CamConfig)
        Dim da As New SqlDataAdapter("Select * from CamConfig", CamCon)
        Dim dt As New DataTable
        Dim Railings As New List(Of List(Of List(Of Integer)))
        da.Fill(dt)
        For Each dr As DataRow In dt.Rows
            Dim aa As New SqlDataAdapter("Select * from CamRailingMatrix where CamId = " & dr("CamId"), CamCon)
            Dim at As New DataTable
            aa.Fill(at)
            For Each ar As DataRow In at.Rows
                Dim bb As New SqlDataAdapter("Select * from RailingCoordinates where RailingId = " & ar("RailingId"), CamCon)
                Dim bt As New DataTable
                bb.Fill(bt)
                Dim Railing As New List(Of List(Of Integer))

                For Each br As DataRow In bt.Rows
                    Railing.Add(New List(Of Integer) From {br("x"), br("y")})

                Next
                Railings.Add(Railing)
            Next
            Dim obj = New CamConfig(dr, Railings)
            xy.Add(obj)

        Next
        Return xy

    End Function




End Class