$(document).on("pageinit", "#pageUserCenter", function(event, ui) {
    var $page = $(this);

    $page.on("click", "#liUserCollect", function() {
        changePage("usercollect.html");
    });
});