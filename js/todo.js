$(function () {
    var $newUl = $("#newlist");
    var $doneUl = $("#donelist");
    var $inputbox = $(".inputbox");
    var $donum = $(".donum");
    var $finishnum = $(".finishnum");

    var datas = [
        {"title": "给tom打电话", "done": false},
        {"title": "记得喝热水", "done": true}
    ];

    function init() {
        for (var i = 0; i < datas.length; i++) {
            createNewli(datas[i]);
        }
        if ($finishnum.text() == 0) {
            $donum.hide();
        } else {
            $donum.show();
        }
    }
    init();

    function createNewli1(todo) {
        var $li = $("<li>");//<li></li>
        var $div = $("<div>").addClass("task-warpper");
        var $a = $("<a>").attr("href", "javascript:;").addClass("ck-warpper");
        var $ckSpan = $("<span>").attr("class", "checkbox");
        var $textSpan = $("<span>").addClass("text").text(todo.title);
        var $da = $("<a>").addClass("close").attr("href", "javascript:;");
        var $i = $("<i>").addClass("fa fa-minus-circle");

        $a.append($ckSpan); //$ckSpan.appendData($a);
        $li.append($div.append($a).append($textSpan)).append(($da).append($i));

        $newUl.append($li);
    }
    function createNewli2(todo) {
        var html = '<li><div class="task-warpper"><a href="javascript:;" class="ck-warpper"><span class="checkbox"></span></a><span class="text">'+todo.title+'</span></div><a class="close" href="javascript:;"><i class="fa fa-minus-circle"></i></a></li>';
        $(html).appendTo($newUl);
    }
    function createNewli(todo) {
        var html = $("#liTemplate").html();
        html = html.replace("{{title}}", todo.title);
        if (todo.done) {
            $(html).addClass("done").appendTo($doneUl);
            $finishnum.text(parseInt($finishnum.text()) + 1);
            /*  html = html.replace("{{hide}}","hide");*/
        } else {
            $(html).appendTo($newUl);
        }
    }

    $inputbox.keydown(function(event) {
        var code = event.keyCode;
        if (code == 13) {
            var value = $(this).val();
            var todo = {"title": value, "done": false};
            createNewli(todo);
            this.value = "";
        }
    });

    $(document).delegate(".checkbox", "click", function() {
        var $li = $(this).parent().parent().parent();

        $li.slideUp(1000,function() {
            $li.remove();
            if($li.hasClass("done")) {
                $li.removeClass("done").appendTo($newUl);
                $li.slideDown();
                $finishnum.text(parseInt($finishnum.text()) - 1);
            } else {
                $li.addClass("done").appendTo($doneUl);
                $li.slideDown();
                $finishnum.text(parseInt($finishnum.text()) + 1);
            }

        });
 /*     $li.remove();
        if($li.hasClass("done")) {
            $li.removeClass("done").appendTo($newUl);
            $finishnum.text(parseInt($finishnum.text()) - 1);
        } else {
            $li.addClass("done").appendTo($doneUl);
            $finishnum.text(parseInt($finishnum.text()) + 1);
        }*/
        if ($finishnum.text() == 0) {
            $donum.hide();
        } else {
            $donum.show();
        }
    });

    $(document).delegate(".fa-minus-circle", "click", function() {
        var $li = $(this).parent().parent();
        $li.remove();
    });

    $donum.click(function(){
        $doneUl.fadeToggle(500);
    });
 });



