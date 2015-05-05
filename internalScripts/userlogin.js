$(document).on("pageinit", "#pageUserLogin", function (event, ui) {
    var $page = $(this);
    $page.on("click", "#pageUserLogin_divReg", function () {
        changePage("userreg.html");
    });

    $page.on("click", "#pageUserLogin_spanLogin", function () {
        var txtLoginMobile = $page.find("#pageUserLogin_txtLoginMobile");
        var txtLoginPassword = $page.find("#pageUserLogin_txtLoginPassword");

        if (!txtLoginMobile.emptyValidate(PageMessage.MobileRequired)) {
            return;
        }

        if (!txtLoginPassword.emptyValidate(PageMessage.PasswordRequired)) {
            return;
        }

        Ajax.getJson("User/Lgoin", { "mobileNumber": txtLoginMobile.val(), "password": txtLoginPassword.val() }, function (data) {
            if (data.IsSuccess) {
                setProfileToLocalStorege(data.Data.Id, data.Data.UserNumber, data.Data.Mobile, data.Data.Nickname);
                checkLoginAndRedirect("home.html");
            } else {
                Messagebox.popup(data.ErrorMessage.Message);
            }
        });
    });
});