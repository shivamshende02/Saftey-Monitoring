function Export2XLSX(element, filename) {
    if (element.length === 0) {
        alert("Nothing to download");
        return null;
    }
    var content = ""
    if (element.length > 1) {
        element.each(function (index, value) {
            content += ($(value).prop('outerHTML') + '<p>&nbsp;</p>')
        })

    } else {                         
        content += (element.prop('outerHTML') + '<p>&nbsp;</p>')
    }
    var blob = new Blob([content], { type: 'application/vnd.ms-excel' });

    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename + getCurrentDateTime() + '.xls';

    document.body.appendChild(link);
    link.click();


    document.body.removeChild(link);
}

function getCurrentDateTime() {
    const now = new Date();
    return `_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}` +
        `${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
}
