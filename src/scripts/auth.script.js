function toastSuccess(message) {
    toastr.success('' + message + '', '<h5 class="text-white px-1 py-1"> Success  </h5>',
        { positionClass: "position-absolute top-50 start-50 translate-middle-x", timeout: 4000, rtl: false });
}
function toastError(description) {
    toastr.error('' + description + '', '<h5 class="text-white px-1 py-1"> Error </h5>',
        { positionClass: "position-absolute top-50 start-50 translate-middle-x", timeout: 4000, rtl: false });
}

var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

$('#forgot_password').click(function () {
    $('#loading_page_progress').css("display", "block");
    var email_ = $("#emailforgotpwd").val();
    if (email_ != null) {
        if (email_ != "") {
            if ($("#emailforgotpwd").val().match(validRegex)) {


                var url="/api/sendmail/forgot_password";
                fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email_ })
                })
                    .then(res => {
                        if (res.ok) return res.json()
                    })
                    .then(data => {
                        $('#loading_page_progress').css("display", "none");

                        if (data.status == 200) {
                            toastSuccess("Un email est envoyé via l'adresse email");
                            // window.location.replace(window.location.protocol + "//" + window.location.host + "/twiphone&forgot&password&token_"+data.token);  
                        } else {
                            toastError(data.message);
                        }

                    }).catch(err => {
                        $('#loading_page_progress').css("display", "none");
                        toastError(err.message);
                    });
            } else {
                $('#loading_page_progress').css("display", "none");
                toastError("Email invalid");
            }
        } else {
            $('#loading_page_progress').css("display", "none");
            toastError("Champs invalid");
        }
    } else {
        $('#loading_page_progress').css("display", "none");
        toastError("Champs invalid");
    }
});


/*===================== valider changer le mot de passe ============================*/
$("#forgot-password").on("click", function () {
    var new_pwd = $("#password").val();
    var conf_pwd = $("#cfrnpassword").val();
    var id = $("#pwd").val();

    if ($("#password").val() != "" && $("#cfrnpassword").val() != "" && $("#password").val() != null && $("#cfrnpassword").val() != null && $("#pwd").val() != null) {
        if ($("#password").val().length == $("#cfrnpassword").val().length) {
            $("#forgot-password").html("Loading......");

            var url="/api/change&the-customer&s&password/pwd";
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: new_pwd, confirm_password: conf_pwd, token: id })
            })
                .then(res => {
                    if (res.ok) return res.json()
                })
                .then(data => {
                    $("#forgot-password").html("Reset password");
                    if (data.status == 200) {
                        toastSuccess(data.message);
                        setInterval(function () {
                            window.location.replace(window.location.protocol + "//" + window.location.host + "/login");
                        }, 2000);
                    }

                }).catch(err => {
                    toastError(err.message);
                    $("#forgot-password").html("Reset password");
                });

        } else {
            toastError("Password invalid");
        }
    } else {
        toastError("Data invalid");
    }
});