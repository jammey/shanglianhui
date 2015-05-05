var noticeSwiperImage = null;

$(document).on("pageinit", "#pageNoticeCategory", function (event, ui) {
    var $page = $(this);

    $page.on("click", "#pageNoticeCategory_topImg img", function () {
        if ($(this).attr("adlink")) {
            window.open($(this).attr("adlink"), '_system', 'location=no');
        } else {
            changePage("noticedetail.html?id=" + $(this).parent().find("[name='pageNoticeCategory_topImgId']").text());
        }
    });

    $page.on("click", "#pageNoticeCategory_notice li", function () {
        changePage("noticedetail.html?id=" + $(this).find("[name='pageNoticeCategory_noticeImageId']").text());
    });

    Ajax.getJson("Notice/NoticeInit", {
        "adUniqueIndex": "新闻公告广告",
        "adTag": "",
        "noticeUniqueIndex": "新闻公告",
        "noticeTag": "",
        "noticePageIndex": 0,
        "noticePageSize": 10
    }, function (data) {
        if (data.IsSuccess) {
            //新闻公告广告
            var adImages = data.Data[0];
            $page.find("#pageNoticeCategory_topImg").empty();
            $page.find("#pageNoticeCategory_topImg").DataBind(adImages.Content);
            $page.find("#pageNoticeCategory_topImg img").each(function (index, e) {
                $(this).attr("src", adImages.Content[index].ContentImage[0].ImageUrl);
                var contentExtProperty = adImages.Content[index].ContetExtProperty;
                if (contentExtProperty.length > 0) {
                    for (var i = 0; i < contentExtProperty.length; i++) {
                        if (contentExtProperty[i].Name == "广告链接") {
                            $(this).attr("adlink", contentExtProperty[i].Value);
                            break;
                        }
                    }
                } 
            });

            if (adImages.Content.length > 0) {
                $page.find("#pageNoticeCategory_topImgTitle").text(adImages.Content[0].Title);
            }

            if (noticeSwiperImage) {
                noticeSwiperImage.destroy(true);
            }
            noticeSwiperImage = new Swiper('#pageNoticeCategory_imgs', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                onSlideChangeEnd: function (item) {
                    $page.find("#pageNoticeCategory_topImgTitle").text(adImages.Content[item.activeIndex].Title);
                }
            });

            //通知列表
            var noticeCatogory = data.Data[1];
            $page.find("#pageNoticeCategory_notice").empty();
            $page.find("#pageNoticeCategory_notice").DataBind(noticeCatogory.Content);

            $page.find("#pageNoticeCategory_notice li").each(function (index, e) {
                if (noticeCatogory.Content[index].ContentImage.length > 0) {
                    $(this).find("img").attr("src", noticeCatogory.Content[index].ContentImage[0].ImageUrl);
                }
            });

            $page.find("#pageNoticeCategory_notice").listview("refresh");
        } else {
            Messagebox.popup(data.ErrorMessage.Message);
        }
    });
});

function pageHomeNotice_DataSelector() {
    return {
        pageHome_noticeSelecter: function (item) {
            if (item.ContentImage.length > 0) {
                return "#pageHome_noticeImageTemplate";
            } else {
                return "#pageHome_noticeTemplate";
            }
        }
    };
}

