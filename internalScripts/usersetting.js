$(document).on("pageinit", "#pageSetting", function (event, ui) {
    var $page = $(this);
    $page.on("click", "#pageSetting_aLogoff", function () {
        clearLocalStorage();
        changePage("userlogin.html");
    });
});