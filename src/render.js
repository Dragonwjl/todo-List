import './index.css'

const render = (dom, callback) => {

    window.onload = () => {
        dom.innerHTML = `
<div>
<div>
    <div class="container">
        <div class="row">
            <div class="todolist">
                <header>
                    <h1>To Do Tasks</h1>
                    <input type="text" class="form-control add-todo"  placeholder="Add New" required>
                </header>
                <ul class="list-unstyled">
                  
                </ul>
                <footer class="clearfix">
                    <div class="pull-left buttons">
                        <div><a title="Add New" class="button add selected"></a>
                        <a title="Search" class="button search "></a></div>
                    </div>
                    <div class="pull-left" id="items">3 items left</div>
                    <div class="pull-right">
                        <ul class="filters  clearfix">
                            <li><a class="all selected">All</a></li>
                            <li><a class="active">Active</a></li>
                            <li><a class="completed">Completed</a></li>
                        </ul>
                    </div>
                </footer>
            
            </div>
        </div>
    </div>
</div>
</div>`
        callback && callback()
    }
}


//一个模块中只能使用一次 ---  export default
export default render;