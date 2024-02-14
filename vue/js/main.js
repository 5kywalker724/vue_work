Vue.component('todo', {
    template:`
        <div class="product">
            <div class="column">
                <form @submit.prevent="createCard">
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
                    <p>
                        <input type="submit" value="Создать">
                    </p>
                </form>
                <p v-if="!column1.length">На данный момент нету заметок!</p>
                <p v-show="checkColumn1">Достигнут лимит на добавление карточек</p>
                <div class="card" v-for="(card, index) in column1">
                    <h3>{{ card.title }}</h3>
                    <ul>
                        <li v-for="item in card.tasks">
                            <input type="checkbox" v-model="item.checked" @change="checkCart(card)">
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
            checkColumn1: false,
            errors: [],
            taskTitle: null,
            taskFirst: null,
            taskSecond: null,
            taskThird: null,
            taskFour: null,
            taskFive: null,
        }
    },
    methods: {
        createCard(){
            this.checkColumn1 = false;
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
                this.checkColumn1 = true;
            }
        },
        checkCart(card){
            const checkedCount = card.tasks.filter(item => item.checked).length;
            const totalCount = card.tasks.length;
            const completionPercentage = (checkedCount / totalCount) * 100;


            if(completionPercentage >= 50 && this.column1.includes(card)){
                if (this.column2.length < 5) {
                    this.column1.splice(this.column1.indexOf(card), 1);
                    this.column2.push(card);
                }
            }
        }
    }
})


let app = new Vue({
    el: '#app'
})
