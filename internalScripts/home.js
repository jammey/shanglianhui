var homeSwiperImage = null;

$(document).on("pageinit", "#pageHome", function (event, ui) {
    var $page = $(this);

    $page.on("click", "#pageHome_topImg img", function() {
        if ($(this).attr("adlink")) {
            window.open($(this).attr("adlink"), '_system', 'location=no');
        } else {
            changePage("newsdetail.html?id=" + $(this).parent().find("[name='pageHome_topImgId']").text());
        }
    });

    $page.on("click", "#pageHome_notice li", function () {
        changePage("noticedetail.html?id=" + $(this).find("[name='pageHome_noticeImageId']").text());
    });

    $page.on("click", "#pageHome_news li", function () {
        changePage("newsdetail.html?id=" + $(this).find("[name='pageHome_newsImageId']").text());
    });

    Ajax.getJson("Index/HomeInit", {
        "adUniqueIndex": "首页广告",
        "adTag": "",
        "noticeUniqueIndex": "新闻公告",
        "noticeTag": "",
        "noticePageIndex": 0,
        "noticePageSize": 1,
        "newsUniqueIndex": "首页要闻",
        "newsTag": "",
        "newsPageIndex": 0,
        "newsPageSize": 10
    }, function (data) {
        if (data.IsSuccess) {
            //首页广告
            var adCatogory = data.Data[0];
            $page.find("#pageHome_topImg").empty();
            $page.find("#pageHome_topImg").DataBind(adCatogory.Content);
            $page.find("#pageHome_topImg img").each(function (index, e) {
                $(this).attr("src", adCatogory.Content[index].ContentImage[0].ImageUrl);
                var contentExtProperty = adCatogory.Content[index].ContetExtProperty;
                if (contentExtProperty.length > 0) {
                    for (var i = 0; i < contentExtProperty.length; i++) {
                        if (contentExtProperty[i].Name == "广告链接") {
                            $(this).attr("adlink", contentExtProperty[i].Value);
                        }
                    }
                }
            });

            if (adCatogory.Content.length > 0) {
                $page.find("#pageHome_topImgTitle").text(adCatogory.Content[0].Title);
            }

            if (homeSwiperImage) {
                homeSwiperImage.destroy(true);
            }
            homeSwiperImage = new Swiper('#pageHome_imgs', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                onSlideChangeEnd: function (item) {
                    $page.find("#pageHome_topImgTitle").text(adCatogory.Content[item.activeIndex].Title);
                }
            });

            //新闻公告
            var noticeCatogory = data.Data[1];
            $page.find("#pageHome_notice").empty();
            $page.find("#pageHome_notice").DataBind(noticeCatogory.Content);

            $page.find("#pageHome_notice li").each(function (index, e) {
                if (noticeCatogory.Content[index].ContentImage.length > 0) {
                    $(this).find("img").attr("src", noticeCatogory.Content[index].ContentImage[0].ImageUrl);
                }
            });

            $page.find("#pageHome_notice").listview("refresh");

            //首页新闻
            var newsCategory = data.Data[2];
            $page.find("#pageHome_news").empty();
            $page.find("#pageHome_news").DataBind(newsCategory.Content);
            $page.find("#pageHome_news li").each(function (index, e) {
                if (newsCategory.Content[index].ContentImage.length > 0) {
                    $(this).find("img").attr("src", newsCategory.Content[index].ContentImage[0].ImageUrl);
                }
            });

            $page.find("#pageHome_news").listview("refresh");
        } else {
            Messagebox.popup(data.ErrorMessage.Message);
        }
    });
});

//function pageHomeNews_DataSelector() {
//    return {
//        pageHome_newsSelecter: function (item) {
//            if (item.ContentImage.length > 0) {
//                return "#pageHome_newsImageTemplate";
//            } else {
//                return "#pageHome_newsTemplate";
//            }
//        }
//    };
//}

//function pageHomeNotice_DataSelector() {
//    return {
//        pageHome_noticeSelecter: function (item) {
//            if (item.ContentImage.length > 0) {
//                return "#pageHome_noticeImageTemplate";
//            } else {
//                return "#pageHome_noticeTemplate";
//            }
//        }
//    };
//}

