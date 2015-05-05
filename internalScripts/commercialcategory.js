$(document).on("pageinit", "#pageCommercialCategory", function (event, ui) {
    var $page = $(this);

    $page.on("click", "div.whitesquare", function () {
        changePage("commercialperson.html");
    });
});