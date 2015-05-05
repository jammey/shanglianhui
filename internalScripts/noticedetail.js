$(document).on("pageinit", "#pageNoticeDetail", function (event, ui) {
    var contentId = $.getUrlParam("id");
    var userId = 0;
    if (checkLogin()) {
        userId = localStorage.getItem("c_userId");
    }

    var $page = $(this);
    $page.on("click", "#pageNoticeDetail_like", function () {
        if ($("#pageNoticeDetail_like").attr("isLike") == "true") {
            Ajax.getJson("Content/RemoveLikeContent", { "contentId": contentId, "userId": userId }, function (data) {
                if (data.IsSuccess) {
                    Messagebox.popup("取消收藏成功");
                    $("#pageNoticeDetail_like").removeClass("header-icon-cliked").addClass("header-icon-clike");
                    $("#pageNoticeDetail_like").attr("isLike", "false");
                } else {
                    Messagebox.popup(data.ErrorMessage.Message);
                }
            });
        } else {
            Ajax.getJson("Content/LikeContent", { "contentId": contentId, "userId": userId }, function (data) {
                if (data.IsSuccess) {
                    Messagebox.popup("收藏成功");
                    $("#pageNoticeDetail_like").removeClass("header-icon-clike").addClass("header-icon-cliked");
                    $("#pageNoticeDetail_like").attr("isLike", "true");
                } else {
                    Messagebox.popup(data.ErrorMessage.Message);
                }
            });
        }
    });

    Ajax.getJson("Content/GetContentDetail", { "contentId": contentId, "userId": userId }, function (data) {
        if (data.IsSuccess) {
            $("#pageNoticeDetail_htmlContent").html(data.Data.HtmlContent);

            if (userId > 0) {
                $("#pageNoticeDetail_like").show();
                if (data.Data.IsLike) {
                    $("#pageNoticeDetail_like").attr("isLike", "true");
                    $("#pageNoticeDetail_like").removeClass("header-icon-clike").addClass("header-icon-cliked");
                } else {
                    $("#pageNoticeDetail_like").attr("isLike", "false");
                    $("#pageNoticeDetail_like").removeClass("header-icon-cliked").addClass("header-icon-clike");
                }
            }
        } else {
            Messagebox.popup(data.ErrorMessage.Message);
        }
    });
});


