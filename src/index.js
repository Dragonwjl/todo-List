import render from './render'

// 读取本地存储的数据
function getData() {
    let localData = localStorage.getItem("todolist");
    let result = []
    if (localData != null) {
        result = JSON.parse(localData)
    }
    return result;
}

//保存本地存储数据
function setData(data) {
    localStorage.setItem("todolist", JSON.stringify(data));
}

//渲染加载数据---默认加载全部
function load(flag) {
    let data = getData()
    let todoCount = 0;
    let doneCount = 0;
    // 遍历之前先清空ol中的内容 避免重复显示内容
    $(".list-unstyled")[0].innerHTML = '';
    if ($(".add-todo").attr('placeholder') == "Add New") {
        if (flag != 1 && flag != 2) {
            // 遍历本地内存内容
            for (let [index, item] of data.entries()) {
                todoCount++;
                if (item.done === true) {
                    isCheck(true, index, item);
                } else {
                    isCheck(false, index, item);
                }
            }
            hasData(todoCount);;
            $("#items")[0].innerHTML = todoCount + " items left"
        } else if (flag == 1) {
            // 遍历本地内存内容
            for (let [index, item] of data.entries()) {
                if (item.done === false) {
                    todoCount++;
                    isCheck(false, index, item);
                }
            }
            hasData(todoCount);;
            $("#items")[0].innerHTML = todoCount + " items left"
        }
        else if (flag == 2) {
            // 遍历本地内存内容
            for (let [index, item] of data.entries()) {
                if (item.done === true) {
                    todoCount++;
                    isCheck(true, index, item);
                }

            }
            hasData(todoCount);;
            $("#items")[0].innerHTML = todoCount + " items left"
        }
    } else {

        if (flag != 1 && flag != 2) {
            // 遍历本地内存内容
            for (let [index, item] of data.entries()) {
                console.log(item.title);
                if (item.done === true && item.title.includes($(".add-todo").val())) {
                    todoCount++;
                    isCheck(true, index, item);
                } else if (item.title.includes($(".add-todo").val())) {
                    todoCount++;
                    isCheck(false, index, item);
                }
            }
            hasData(todoCount);;
            $("#items")[0].innerHTML = todoCount + " items left"
        } else if (flag == 1) {
            // 遍历本地内存内容
            for (let [index, item] of data.entries()) {
                if (item.done === false && item.title.includes($(".add-todo").val())) {
                    todoCount++;
                    isCheck(false, index, item);
                }
            }
            hasData(todoCount);;
            $("#items")[0].innerHTML = todoCount + " items left"
        }
        else if (flag == 2) {
            // 遍历本地内存内容
            for (let [index, item] of data.entries()) {
                if (item.done === true && item.title.includes($(".add-todo").val())) {
                    todoCount++;
                    isCheck(true, index, item);
                }
            }
            hasData(todoCount);;
            $("#items")[0].innerHTML = todoCount + " items left"
        }
    }
}

//列表为空时显示相应提示-----There are no items
function hasData(count) {
    if (count === 0) {
        $(".list-unstyled")[0].innerHTML +=
            '<li class="todo-item ui-state-default pending"><div class="checkbox"><label>' + 'There are no items.' + '</label  ></div></li>'
    }
    return;
}

//根据数据状态判断是否添加删除线
function isCheck(check, index, item) {
    if (check == true) {
        return $(".list-unstyled")[0].innerHTML +=
            '<li class="todo-item ui-state-default pending"><div class="checkbox"><label style = "text-decoration: line-through;color: #aaa;"><input type="checkbox"  id=' + index + ' value="on" checked = true >' + item.title + '</label  ></div></li>'
    } else if (check == false) {
        return $(".list-unstyled")[0].innerHTML +=
            '<li class="todo-item ui-state-default pending"><div class="checkbox"><label><input type="checkbox"  id=' + index + ' value="on"  >' + item.title + '</label  ></div></li>'
    }
}


render($('#root'), () => {
    var flag;
    var addFlag = true;
    var searchFlag = false;
    load(flag);
    // 输入框添加数据
    $(".add-todo").keydown(function (event) {
        if (event.keyCode === 13) {
            let data = getData();
            if ($(".add-todo").attr("placeholder") != 'Search') {
                if ($(".add-todo").val() != '') {
                    data.push({ title: $(".add-todo").val(), done: false })
                    setData(data);
                }
            }
            load(flag);
            $(".add-todo").val('')
        }
    })

    // 待办和完成之间的转换
    $(".list-unstyled").click(function (e) {
        let ss = e.target
        if (ss.localName === 'input') {
            let data = getData();
            if (ss.checked) {
                ss.parentElement.style.cssText = "text-decoration: line-through;color: #aaa;"
            }
            data[ss.id].done = ss.checked;
            setData(data)
            load(flag);
            return;
        }
    })



    //显示全部 ---默认显示 
    $(".all").click(function () {
        flag = 0;
        load(flag)
        $(".all").attr('class', 'all selected')
        $(".active").attr('class', 'active')
        $(".completed").attr('class', 'completed')

    })

    //显示待完成
    $(".active").click(function () {
        flag = 1;
        load(flag)
        $(".all").attr('class', 'all')
        $(".active").attr('class', 'active selected')
        $(".completed").attr('class', 'completed')

    })

    //显示完成
    $(".completed").click(function () {
        flag = 2;
        load(flag)
        $(".all").attr('class', 'all')
        $(".active").attr('class', 'active')
        $(".completed").attr('class', 'completed selected')

    })

    //添加按钮 add
    $(".add").click(function () {
        btn("add", addFlag);
        $(".search").attr('class', "button search");
        $(".add").attr('class', "button add selected")
        load(flag)
    });

    //搜索按钮 search
    $(".search").click(function () {
        btn("search", searchFlag);
        $(".search").attr('class', "button search selected");
        $(".add").attr('class', "button add")
    });


    //根据按钮显示对应输入框
    function btn(s1, s2) {
        let bt = $(".add-todo")
        if (s2 == true) {
            if (s1 == "add") {
                bt.css('display', 'none');
                bt.attr("placeholder", "Add New")
                addFlag = false;
            } else if (s1 == "search") {
                bt.attr("placeholder", "Search")
                bt.css('display', 'none');
                searchFlag = false;
            }
        } else if (s1 == "add") {
            bt.attr("placeholder", "Add New")
            bt.css('display', 'block');
            addFlag = true;
            searchFlag = false;

        } else if (s1 == "search") {
            bt.attr("placeholder", "Search")
            bt.css('display', 'block');
            searchFlag = true;
            addFlag = false;
        }

    }
})







