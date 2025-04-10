var txtFullName, txtempno, txtDOB, txtEmail, txtPhone1, txtPhone2, UserNameCtrl, Password, ConfirmPassword;
var valeSum ,valeName ,ValeNo, ValeDoB , ValeEmail , ValePhone1, ValePhone2 , ValeUname , ValePWD1 , ValePWD2 , valGrid, AllErrors;
var ValidEmailExtensions = ["@tatamotors.com", "@tatatechnologies.com"];

function loadComponents() {
     valeSum = document.getElementById("ValidationSummary")
     valeName = document.getElementById("ValFullName")
     ValeNo = document.getElementById("ValEmpNo")
     ValeDoB = document.getElementById("ValDoB")
     ValeEmail = document.getElementById("ValEmail")
     ValePhone1 = document.getElementById("ValPhone1")
     ValePhone2 = document.getElementById("ValPhone2")
     ValeUname = document.getElementById("ValUname")
     ValePWD1 = document.getElementById("ValPWD1")
     ValePWD2 = document.getElementById("ValPWD2")
     valGrid = document.getElementsByClassName("form-control GridTextBox")
     AllErrors = [];
}

function ValidateForm1() {

    AllErrors = [];
    
    ShowError(valeName, "Please Enter Full Name", txtFullName.value.length < 5)
    ShowError(ValeNo, "Please Enter 6 Digit Personel number without Spaces", isNaN(txtempno.value)||txtempno.value.length!=6)
    ShowError(ValeDoB, "Please Select Valid Birth Date", CheckDateValue(txtDOB))    
    ShowError(ValeEmail, "Please Enter Tata Motors Email ID", CheckValidEmail(txtEmail))
    ShowError(ValePhone1, "Please Enter Valid Phone Number without Spaces or + sign", CheckPhone(txtPhone1))
    if (txtPhone2.value.length>2) { ShowError(ValePhone2, "Please Enter Valid Phone Number without Spaces or + sign", CheckPhone(txtPhone2)) }
    ShowError(ValeUname, "UserName must beatleast 8 Chars Long", UserNameCtrl.value.length < 8)
    ShowError(ValePWD1, "Password Must be atleast 8 Chars Long", Password.value.length < 8)
    ShowError(ValePWD2,"Confirm Password Does Not Match",Password.value!=ConfirmPassword.value)
    
    var ValGridAnswer = document.getElementById("ValGridAnswers");
    ShowError(ValGridAnswer, "Please Answer Atleast 3 Security Questions", CheckAnswers(valGrid))
    ShowErrorSummary(valeSum)
    var answ = (AllErrors.length == 0)
    
    return answ 
    
}

function ShowError(Obj, Msg, Flag) {
    if (Flag) {
        Obj.innerText = Msg
        Obj.style.display = "block"
        Obj.parentNode.parentNode.style.border = "1px Solid Red"
        Obj.parentNode.parentNode.style.backgroundColor = "lightPink"
        try{
            AllErrors.push(Msg)
        }catch ( ex){}
        
    } else {
        Obj.innerText = Msg
        Obj.style.display = "none"
        Obj.parentNode.parentNode.style.border = "none"
        Obj.parentNode.parentNode.style.backgroundColor = "transparent"
    }
}

function CheckAnswers(x) {
    var cntr = 0;
    for (var i = 0; i < valGrid.length; i++) {
        if( valGrid[i].value.length>2 ){cntr=cntr+1}
    }
    return !(cntr >=3)
}

function ShowErrorSummary(x) {
    var str = "<b>Error Summary</b><ul>"
    if (AllErrors.length > 0) {
        x.style.display = "block"
        for (var i = 0; i < AllErrors.length; i++) {
            str=str+"<li>" + AllErrors[i]+"</li>"
        }
        str = str + "</ul>"
        x.innerHTML = str;
    } else {
        x.style.display = "none"
        x.innerHTML=""
    }

}

function CheckDateValue(x) {
    if (x.value.length != 11) { return true }
    if (isNaN(x.value.substring(0, 2))) { return true }
    if (isNaN(x.value.substring(7, 11))) { return true }
    return false 
}

function CheckValidEmail(x) {
    x.value = x.value.toLowerCase()
    var flg = true;
    var len= ValidEmailExtensions.length
    for (i = 0; i < len; i++) {
        if (x.value.substr(x.value.length - ValidEmailExtensions[i].length) == ValidEmailExtensions[i]) {
            flg = false;
            break;
        }
    }
    return flg;
   
}

function CheckPhone(x){
    x.value = parseInt(x.value)
    return !(x.value.length==10)
}

