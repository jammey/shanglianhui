$(function () {
    $.mobile.page.prototype.options.domCache = false;
});

$(document).on("pageinit", "[data-role='page']", function () {
    $.mobile.page.prototype.options.tapToggle = false;

    $("#pageLoadingCount").val("0");

    var $footer = $(this).find("#standardFooter");
    if ($footer.length > 0) {
        var footerTemplate = $("#footerTemplate").clone();
        footerTemplate.attr("id", "");
        footerTemplate.show();
        $footer.append(footerTemplate);

        $(this).on("click", "#footerHome", function () {
            changePage("home.html");
        });

        $(this).on("click", "#footerSubscribe", function () {
            checkLoginAndRedirect("usercollect.html");
        });

        $(this).on("click", "#footerUserCenter", function () {
            checkLoginAndRedirect("usercenter.html");
        });
    }

    var $nav = $(this).find("#standardNav");
    if ($nav.length > 0) {
        var $navTemplate = $("#navTemplate").clone();
        $navTemplate.attr("id", "");
        $navTemplate.show();

        var selectIndex = $nav.data("nav-select");
        
        if (selectIndex !== undefined) {
            var a = $navTemplate.find("a").eq(selectIndex);
            a.addClass("active");
        }

        $nav.append($navTemplate);

        $(this).on("click", "#navNotice", function () {
            changePage("noticecategory.html");
        });

        $(this).on("click", "#navCommercial", function () {
            checkLoginAndRedirect("commercialcategory.html");
        });

        $(this).on("click", "#navEnterprise", function () {
            checkLoginAndRedirect("enterprisewindow.html");
        });

        $(this).on("click", "#navBooster", function () {
            checkLoginAndRedirect("boostercategory.html");
        });
    }
});

function checkLoginAndRedirect(url) {
    if (checkLogin()) {
        if (!window.localStorage.getItem("c_userNickname") || window.localStorage.getItem("c_userNickname") == "undefined") {
            changePage("userregcomplete.html?url=" + url);
        } else {
            changePage(url);
        }
    } else {
        changePage("userlogin.html");
    }
}

function checkLogin() {
    if (!window.localStorage.getItem("c_userId") || window.localStorage.getItem("c_userId") == "undefined") {
        return false;
    }

    return true;
}

function currentUserId() {
    return window.localStorage.getItem("c_userId");
}

//function callServiceCallBack(buttonIndex) {
//    if (buttonIndex == 2) {
//        window.open('tel:4006997118', '_system');
//    }
//}

//function closePopup(obj, id) {
//    $(obj).parents("[data-role='page']").find("#" + id).popup("close");
//}

function setProfileToLocalStorege(userId, userNumber, userMobile, userNickname) {
    localStorage.setItem("c_userId", userId);
    localStorage.setItem("c_userNumber", userNumber);
    localStorage.setItem("c_userMobile", userMobile);
    localStorage.setItem("c_userNickname", userNickname);
}

function clearLocalStorage() {
    localStorage.removeItem("c_userId");
    localStorage.removeItem("c_userNumber");
    localStorage.removeItem("c_userMobile");
    localStorage.removeItem("c_userNickname");
}


