$(document).on("pageinit", "#pageEnterpriseCategory", function (event, ui) {
    var $page = $(this);

    $page.on("click", ".tuoyuan", function () {
        changePage("enterpriselist.html");
    });
});
