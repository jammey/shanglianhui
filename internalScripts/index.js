$(document).on("pageinit", "#pageIndex", function (event, ui) {
    var $page = $(this);
    var timeout;

    pageHome_CalculateHeight($page);

    $page.on("click", "#pageIndex_topDiv", function () {
        var topImgLink = $page.find("#pageIndex_topDiv").attr("topImgLink");
        if (topImgLink) {
            window.open(topImgLink, '_system', 'location=no');
        }
    });

    $page.on("click", "#pageIndex_leapfrog", function () {
        changePage("home.html");
        clearTimeout(timeout);
    });

    $(document).ready(function () {
        timeout = setTimeout(function () {
            changePage("home.html");
        }, 2000);
    });

    Ajax.getJson("Category/GetCategoryWithContent", { "categoryUniqueIndex": "启动页", "tag": "" }, function (data) {
        if (data.IsSuccess) {
            var topContent = data.Data.Content[0];
            var topExtProperty = topContent.ContetExtProperty;

            for (var i = 0; i < topExtProperty.length; i++) {
                if (topExtProperty[i].Name == "背景色") {
                    $page.find("#pageIndex_topDiv").css("background", topExtProperty[i].Value);
                } else if (topExtProperty[i].Name == "广告链接") {
                    $page.find("#pageIndex_topDiv").attr("topImgLink", topExtProperty[i].Value);
                }
            }
            $page.find("#pageIndex_topDiv img").attr("src", topContent.ContentImage[0].ImageUrl);

            var bottomContent = data.Data.Content[1];
            var bottomExtProperty = bottomContent.ContetExtProperty;
            for (var i = 0; i < bottomExtProperty.length; i++) {
                if (bottomExtProperty[i].Name == "背景色") {
                    $page.find("#pageIndex_bottomDiv").css("background", bottomExtProperty[i].Value);
                }
            }
            $page.find("#pageIndex_bottomDiv img").attr("src", bottomContent.ContentImage[0].ImageUrl);
        } else {
            Messagebox.popup(data.ErrorMessage.Message);
        }
    });
});

function pageHome_CalculateHeight($page) {
    var heightTop = ((document.body.clientHeight * 7) / 8);
    var heightBottom = document.body.clientHeight - heightTop;
    $page.find("#pageIndex_topDiv").height(heightTop);
    $page.find("#pageIndex_bottomDiv").height(heightBottom);
}