$(document).ready(function () {
    // let encryptedDBTxt = $.get( "login_db.txt");
    let login_db = [
        {
            username: "admin",
            password: "admin"
        },
        {
            username: "test",
            password: "test"
        }
    ];

    let encryptCode = "123456";

    let serialize = function (data, code) {
        let serializedJSON = window.JSON.stringify(data);
        let encryptedDB = CryptoJS.AES.encrypt(serializedJSON, code);
        $.ajax({
            type: "POST",
            url: 'php/server.php',
            data: {
                targetFunction: "writeToFile",
                _data: encryptedDB.toString(),
            },
            success: function () {
                console.log("Login database Updated!");
            },
        });
        return (encryptedDB);
    }


    let curr = $('#login').click(function () {
        let encryptedDBTxt = serialize(login_db, encryptCode);
        let database = deserialize(encryptedDBTxt, encryptCode)

        let passwordInput, usernameInput, curr;
        let correct = false;
        for (let i = 0; i < database.length; i++) {
            curr = database[i];
            passwordInput = String($('#password').val());
            usernameInput = String($('#username').val());
            if (curr.password == passwordInput && curr.username == usernameInput) {
                alert("You are logged in as " + curr.username);
                correct = true;
                location.replace("./portfolio_management.html");
            }
        }
        if (correct==false) {
            alert("Wrong username/password combination");
        }
    });

    let database = deserialize(encryptedDBTxt, encryptCode);

    let currUsername = String(curr[0]);
    let currPassword = String(curr[1]);

    $('#usernameField').attr('placeholder', currUsername);
    alert(currUsername);
    alert(currPassword);
    $('#passwordField').attr('value', currPassword);


    let btn = $('#editBtn');
    btn.on('click', function () {
        alert("btn working");
        $(btn).val('submit')
        $(btn).attr('id', 'submitBtn');
        $('#usernameField').attr('readonly', false);
        $('#passwordField').attr('readonly', false);
    });

    $('#submitBtn').on('click', function () {
        let newUsername = $('usernameField').val().toString();
        let newPassword = $('passwordField').val().toString();
        accChange(newUsername, newPassword);
    });

    function accChange(newUsername, newPassword) {
        database[UserPosi].username = newUsername;
        database[UserPosi].password = newPassword;
        serialize(database, encryptCode);
    }


    function deserialize(encryptedDBTxt, encryptCode) {
        let decryptedDB = CryptoJS.AES.decrypt(encryptedDBTxt, encryptCode);
        let deJSON = decryptedDB.toString(CryptoJS.enc.Utf8);
        return (window.JSON.parse(deJSON));
    }
});