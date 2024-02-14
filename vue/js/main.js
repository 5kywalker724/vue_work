Vue.component('todo', {
    template:`
        <div class="product">
            <div class="column">
                <form @submit.prevent="createCart">
                    <p v-if="errors.length">
                        <b>Please correct the following error(s):</b>
                        <ul>
                            <li v-for="error in errors">{{ error }}</li>
                        </ul>
                    </p>
                     <p>
                        <label for="title">Заголовок заметки:</label>
                        <input id="title" v-model="taskTitle" placeholder="Название заголовка">
                    </p>
                    <p>
                        <label for="task1">Первое задание:</label>
                        <input id="task1" v-model="taskFirst">
                    </p>
                    <p>
                        <label for="title">Второе задание:</label>
                        <input id="title" v-model="taskSecond">
                    </p>
                    <p>
                        <label for="title">Третье задание:</label>
                        <input id="title" v-model="taskThird">
                    </p>
                        <input type="submit" value="Создать">
                    </p>
                </form>
                <p v-if="!column1.length">На данный момент нету заметок!</p>
                <div class="card" v-for="(card, index) in column1">
                    <h3>{{ card.title }}</h3>
                    <ul>
                        <li v-for="item in card.tasks">
                            <input type="checkbox" v-model="item.checked">
                            <p>{{item.text}}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="column">
                <p v-if="!column2.length">На данный момент нету заметок!</p>
                <div class="card" v-for="(card, index) in column2">
                    <h3>{{ card.title }}</h3>
                    <ul>
                        <li v-for="item in card.tasks">
                            <input type="checkbox" v-model="item.checked">
                            <p>{{item.text}}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="column">
                <p v-if="!column3.length">На данный момент нету заметок!</p>
                <div class="card" v-for="(card, index) in column3">
                    <h3>{{ card.title }}</h3>
                    <ul>
                        <li v-for="item in card.tasks">
                            <input type="checkbox" v-model="item.checked">
                            <p>{{item.text}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    data(){
        return{
            column1: [],
            column2: [],
            column3: [],
            errors: [],
            taskTitle: '',
            taskFirst: '',
            taskSecond: '',
            taskThird: '',
            taskFour: '',
            taskFive: '',
        }
    },
    methods: {
        createCart(){
            this.errors = [];
            if(this.column1.length < 3){
                if(this.taskTitle && this.taskFirst && this.taskSecond && this.taskThird){
                    this.column1.push({
                        title: this.taskTitle,
                        tasks: [
                            {text: this.taskFirst, checked: false},
                            {text: this.taskSecond, checked: false},
                            {text: this.taskThird, checked: false},
                        ]
                    });
                    this.taskTitle = null;
                    this.taskFirst = null;
                    this.taskSecond = null;
                    this.taskThird = null;
                }
                else{
                    if(!this.taskTitle) this.errors.push("Заголовок обязателен.");
                    if(!this.taskFirst) this.errors.push("Первое задание обязательно.");
                    if(!this.taskSecond) this.errors.push("Второе задание обязательно.");
                    if(!this.taskThird) this.errors.push("Третье задание обязательно.");
                }
            }
            else{
                alert("Невозможо добавить больше 3-ч заметок в первую колонку!");
            }
        }
    }
})


let app = new Vue({
    el: '#app'
})
