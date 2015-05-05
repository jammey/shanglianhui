$(document).on("pageinit", "#pageNewsDetail", function (event, ui) {
    var contentId = $.getUrlParam("id");
    var userId = 0;
    if (checkLogin()) {
        userId = localStorage.getItem("c_userId");
    }

    var $page = $(this);
    $page.on("click", "#pageNewsDetail_like", function() {
        if ($("#pageNewsDetail_like").attr("isLike") == "true") {
            Ajax.getJson("Content/RemoveLikeContent", { "contentId": contentId, "userId": userId }, function(data) {
                if (data.IsSuccess) {
                    Messagebox.popup("取消收藏成功");
                    $("#pageNewsDetail_like").removeClass("header-icon-cliked").addClass("header-icon-clike");
                    $("#pageNewsDetail_like").attr("isLike", "false");
                } else {
                    Messagebox.popup(data.ErrorMessage.Message);
                }
            });
        } else {
            Ajax.getJson("Content/LikeContent", { "contentId": contentId, "userId": userId }, function(data) {
                if (data.IsSuccess) {
                    Messagebox.popup("收藏成功");
                    $("#pageNewsDetail_like").removeClass("header-icon-clike").addClass("header-icon-cliked");
                    $("#pageNewsDetail_like").attr("isLike", "true");
                } else {
                    Messagebox.popup(data.ErrorMessage.Message);
                }
            });
        }
    });

    Ajax.getJson("Content/GetContentDetail", { "contentId": contentId, "userId": userId }, function (data) {
        if (data.IsSuccess) {
            $("#pageNewsDetail_title").text(data.Data.Title);
            $("#pageNewsDetail_date").text(stringToShortDate(data.Data.CreateTime).format("yyyy年MM月dd日"));

            var contentExtProperty = data.Data.ContetExtProperty;
            if (contentExtProperty.length > 0) {
                for (var i = 0; i < contentExtProperty.length; i++) {
                    if (contentExtProperty[i].Name == "转载地址") {
                        $("#pageNewsDetail_reprint").text(contentExtProperty[i].Value);
                    }
                }
            }

            $("#pageNewsDetail_viewCount").text(data.Data.ViewCount);
            $("#pageNewsDetail_htmlContent").html(data.Data.HtmlContent);

            if (userId > 0) {
                $("#pageNewsDetail_like").show();
                if (data.Data.IsLike) {
                    $("#pageNewsDetail_like").attr("isLike", "true");
                    $("#pageNewsDetail_like").removeClass("header-icon-clike").addClass("header-icon-cliked");
                } else {
                    $("#pageNewsDetail_like").attr("isLike", "false");
                    $("#pageNewsDetail_like").removeClass("header-icon-cliked").addClass("header-icon-clike");
                }
            }
        } else {
            Messagebox.popup(data.ErrorMessage.Message);
        }
    });
});