Vue.component('todo', {
    template:`
        <div class="product">
            <div class="column">
                <ul class="card">
                    <h3>Заголовок1</h3>
                    <li>Задание1</li>
                    <li>Задание2</li>
                    <li>Задание3</li>
                </ul>
            </div>
            <div class="column">
                <p>Hello world</p>
            </div>
            <div class="column">
                <p>Hello world</p>
            </div>
        </div>
    `
})

let app = new Vue({
    el: '#app'
})

