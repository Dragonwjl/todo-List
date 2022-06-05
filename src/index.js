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
    document.querySelector(".list-unstyled").innerHTML = '';

    if (document.querySelector(".add-todo").getAttribute('placeholder') == "Add New") {

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
            document.querySelector("#items").innerHTML = todoCount + " items left"
        } else if (flag == 1) {
            // 遍历本地内存内容
            for (let [index, item] of data.entries()) {

                if (item.done === false) {
                    todoCount++;
                    isCheck(false, index, item);

                }
            }
            hasData(todoCount);;
            document.querySelector("#items").innerHTML = todoCount + " items left"
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
            document.querySelector("#items").innerHTML = todoCount + " items left"
        }
    } else {

        if (flag != 1 && flag != 2) {
            // 遍历本地内存内容
            for (let [index, item] of data.entries()) {
                console.log(item.title);
                if (item.done === true && item.title.includes(document.querySelector(".add-todo").value)) {
                    todoCount++;
                    isCheck(true, index, item);
                } else if (item.title.includes(document.querySelector(".add-todo").value)) {
                    todoCount++;
                    isCheck(false, index, item);
                }
            }
            hasData(todoCount);;
            document.querySelector("#items").innerHTML = todoCount + " items left"
        } else if (flag == 1) {
            // 遍历本地内存内容
            for (let [index, item] of data.entries()) {
                if (item.done === false && item.title.includes(document.querySelector(".add-todo").value)) {
                    todoCount++;
                    isCheck(false, index, item);
                }
            }
            hasData(todoCount);;
            document.querySelector("#items").innerHTML = todoCount + " items left"
        }
        else if (flag == 2) {
            // 遍历本地内存内容
            for (let [index, item] of data.entries()) {
                if (item.done === true && item.title.includes(document.querySelector(".add-todo").value)) {
                    todoCount++;
                    isCheck(true, index, item);
                }
            }
            hasData(todoCount);;
            document.querySelector("#items").innerHTML = todoCount + " items left"
        }
    }
}

//列表为空时显示相应提示-----There are no items
function hasData(count) {
    if (count === 0) {
        document.querySelector(".list-unstyled").innerHTML +=
            '<li class="todo-item ui-state-default pending"><div class="checkbox"><label>' + 'There are no items.' + '</label  ></div></li>'
    }
    return;
}

//根据数据类状态判断是否添加删除线
function isCheck(check, index, item) {
    if (check == true) {
        return document.querySelector(".list-unstyled").innerHTML +=
            '<li class="todo-item ui-state-default pending"><div class="checkbox"><label style = "text-decoration: line-through;color: #aaa;"><input type="checkbox"  id=' + index + ' value="on" checked = true >' + item.title + '</label  ></div></li>'
    } else if (check == false) {
        return document.querySelector(".list-unstyled").innerHTML +=
            '<li class="todo-item ui-state-default pending"><div class="checkbox"><label><input type="checkbox"  id=' + index + ' value="on"  >' + item.title + '</label  ></div></li>'
    }
}


render(document.getElementById('root'), () => {
    var flag;
    var addFlag = true;
    var searchFlag = false;
    load(flag);
    // 输入框添加数据
    document.querySelector(".add-todo").addEventListener("keydown", (event) => {
        //监听是否有回车键
        if (event.keyCode === 13) {
            let data = getData();
            console.log(document.querySelector(".add-todo").getAttribute("placeholder"));
            if (document.querySelector(".add-todo").getAttribute("placeholder") != 'Search') {
                if (document.querySelector(".add-todo").value != '') {
                    data.push({ title: document.querySelector(".add-todo").value, done: false })
                    setData(data);
                }
            }
            load(flag);
            document.querySelector(".add-todo").value = ''
        }


    })

    // 待办和完成之间的转换
    document.querySelector(".list-unstyled").addEventListener("click", function (e) {
        let ss = e.target
        if (ss.localName === 'input') {
            let data = getData();
            if (ss.checked) {
                console.log(ss.parentElement);
                ss.parentElement.style.cssText = "text-decoration: line-through;color: #aaa;"
            }
            data[ss.id].done = ss.checked;
            setData(data)
            load(flag);
            return;
        }
    })

    //显示全部 ---默认显示 
    document.querySelector(".all").addEventListener("click", function (e) {
        flag = 0;
        load(flag)
        document.querySelector(".all").setAttribute('class', 'all selected')
        document.querySelector(".active").setAttribute('class', 'active')
        document.querySelector(".completed").setAttribute('class', 'completed')
    })

    //显示待完成
    document.querySelector(".active").addEventListener("click", function (e) {
        flag = 1;
        load(flag)
        document.querySelector(".all").setAttribute('class', 'all')
        document.querySelector(".active").setAttribute('class', 'active selected')
        document.querySelector(".completed").setAttribute('class', 'completed')
    })
    //显示完成
    document.querySelector(".completed").addEventListener("click", function (e) {
        flag = 2;
        load(flag)
        document.querySelector(".all").setAttribute('class', 'all')
        document.querySelector(".active").setAttribute('class', 'active')
        document.querySelector(".completed").setAttribute('class', 'completed selected')

    })

    //添加按钮 add
    document.querySelector(".add").addEventListener("click", function (e) {
        btn("add", addFlag)
        document.querySelector(".search").setAttribute('class', "button search")
        document.querySelector(".add").setAttribute('class', "button add selected")
    })
    //搜索按钮 search
    document.querySelector(".search").addEventListener("click", function (e) {
        btn("search", searchFlag)
        document.querySelector(".search").setAttribute('class', "button search selected")
        document.querySelector(".add").setAttribute('class', "button add")
    })

    //根据按钮显示对应输入框
    function btn(s1, s2) {
        let child = document.querySelector(".add-todo")
        if (s2 == true) {
            if (s1 == "add") {
                child.style.display = "none";
                child.setAttribute("placeholder", "Add New")
                addFlag = false;
            } else if (s1 == "search") {

                child.setAttribute("placeholder", "Search")
                child.style.display = "none";
                searchFlag = false;
            }
        } else if (s1 == "add") {
            child.setAttribute("placeholder", "Add New")
            child.style.display = "block";
            addFlag = true;
            searchFlag = false;

        } else if (s1 == "search") {
            child.setAttribute("placeholder", "Search")
            child.style.display = "block";
            searchFlag = true;
            addFlag = false;
        }

    }


})







