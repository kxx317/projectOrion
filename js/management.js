$(document).ready(function () {
    function addImg() {
        $('#gallery').append('<img alt="' + imgTitle + ' data-date="' + imgDate + '" src="/portfolio/' + imgAddr + '"/>')
    }

    $('#logout').click(function () {

        $('nav-link').onclick;
    });

    Date.prototype.toDateInputValue = (function() {
        let local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0,10);
    });

    function today(){
        let now = new Date();
        let month = (now.getMonth() + 1);
        let day = now.getDate();
        if (month < 10)
            month = "0" + month;
        if (day < 10)
            day = "0" + day;
        return(now.getFullYear() + '-' + month + '-' + day);
    }

    $('input[type="file"]').change(function(e){
        let fileName = e.target.files[0].name;
        $('label[class="custom-file-label"]').text(String(fileName));
        $('#imgDate').val(today());
    });

    //Talk about this

    $("#imgUploadBtn").click(function () {
        let fd = new FormData();
        let files = $('#imgUpload')[0].files[0];
        fd.append('file', files);
        $.ajax({
            url : 'php/upload_copy.php',
            type : 'POST',
            data : fd,
            processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType
            success : function(data) {
            }
        });
        alert("image uploaded");
    });
});