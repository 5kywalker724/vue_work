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
                {{ checkSizeColumn2() }}
                <p v-if="!column1.length">На данный момент нету заметок!</p>
                <p v-show="checkColumn1">Достигнут лимит на добавление карточек!</p>
                <p v-show="checkColumn2">Вторая колонка переполнена, невозможно перенести карточки!</p>
                <div class="card" v-for="(card, index) in column1">
                    <h3>{{ card.title }}</h3>
                    <ul>
                        <li v-for="item in card.tasks">
                            <input type="checkbox" v-model="item.checked" @change="checkCart(card)" :disabled="checkColumn2">
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
                            <input type="checkbox" v-model="item.checked" @change="checkCart(card)">
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
                            <input type="checkbox" v-model="item.checked" @change="checkCart(card)">
                            <p>{{item.text}}</p>
                        </li>
                    </ul>
                    <p v-if="card.complete">Выполнение последнего задания карточки: {{ card.lastComplete }}</p>
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
            checkColumn2: false,
            errors: [],
            taskTitle: null,
            taskFirst: null,
            taskSecond: null,
            taskThird: null,
        }
    },
    mounted(){
        if(localStorage.getItem('data')){
            const savedData = JSON.parse(localStorage.getItem('data'));
            this.column1 = savedData.column1;
            this.column2 = savedData.column2;
            this.column3 = savedData.column3;

        }
    },
    methods: {
        checkSizeColumn2(){
            if(this.column2.length === 5){
                this.checkColumn2 = true;
            }
            else{
                this.checkColumn2 = false;
            }
        },
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

                    localStorage.setItem('data', JSON.stringify({
                        column1: this.column1
                    }));
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


            if(completionPercentage === 100 && !this.column3.includes(card)){
                card.complete = true;
                card.lastComplete = new Date().toLocaleString();
                if (this.column2.includes(card)) {
                    this.column2.splice(this.column2.indexOf(card), 1);
                }
                this.column3.push(card);
            }
            else if(completionPercentage === 100 && this.column3.includes(card)){
                card.lastComplete = new Date().toLocaleString();
            }
            else {
                card.lastComplete = "";
            }

            if(completionPercentage >= 50 && this.column1.includes(card)){
                if(this.column2.length < 5) {
                    this.column1.splice(this.column1.indexOf(card), 1);
                    this.column2.push(card);
                }
            }

            if(completionPercentage < 100){
                card.complete = false;
            }

            localStorage.setItem('data', JSON.stringify({
                column1: this.column1,
                column2: this.column2,
                column3: this.column3
            }));

        }
    }
})


let app = new Vue({
    el: '#app'
})
