Vue.component('kanban', {
    template: `
        <div class="product">
            <div class="column">
                <h3 class="title">Запланированные задачи</h3>
                <form @submit.prevent="addCard">
                    <p>
                        <label for="title">Заголовок:</label>
                        <input id="title" v-model="cardTitle">
                    </p>
                    <p>
                        <label for="task1">Описание:</label>
                        <textarea id="task1" v-model="cardDesc"></textarea>
                    </p>
                    <p>
                        <label for="title">Срок выполнения:</label>
                        <input id="title" v-model="cardDeadline" type="date">
                    </p>
                    <p>
                        <input class="createButton" type="submit" value="Создать">
                    </p>   
                </form>
                 <p v-if="errors.length">
                        <b>Пожалуйста, исправьте ошибку(ошибки):</b>
                        <ul>
                            <li v-for="error in errors">{{ error }}</li>
                        </ul>
                 </p>
                 <div class="card" v-for="(card, index) in column1">
                    <h3>{{ card.title }}</h3>
                    <p>Описание: {{ card.desc }} </p>
                    <p>Срок выполнения: {{ card.deadline }}</p>
                    <p v-show="card.changeDate">Дата и время последнего редактирования: {{ card.changeDate }}</p>
                    <div class="buttons">
                        <button class="changeCard" @click="showModal">Редактировать</button>
                        <button class="deleteCard" @click="deleteCard(card)">Удалить</button>
                    </div>
                    <div class="moveButtons">
                        <button class="moveButton" @click="moveToColumn(index)">Переместить >>></button>
                    </div>
                    <div class="modalForm" v-show="modal">
                        <form @submit.prevent="changeCard(index)">
                            <p>
                                <label for="title">Заголовок:</label>
                                <input id="title" v-model="cardTitleChange">
                            </p>
                            <p>
                                <label for="task1">Описание:</label>
                                <textarea id="task1" v-model="cardDescChange"></textarea>
                            </p>
                            <p>
                                <label for="title">Срок выполнения:</label>
                                <input id="title" v-model="cardDeadlineChange" type="date">
                            </p>
                            <p>
                                <input class="changeButton" type="submit" value="Применить изменения">
                            </p>
                            <p v-if="errorsChange.length">
                                <b>Пожалуйста, исправьте ошибку(оишбки):</b>
                                <ul>
                                    <li v-for="error in errorsChange">{{ error }}</li>
                                </ul>
                            </p>
                        </form>
                        <button class="close" @click="closeModal">Закрыть форму</button>
                    </div>
                </div>
            </div>
            <kanbanColumn2 :column2="column2" :column3="column3"></kanbanColumn2>
            <kanbanColumn3 :column2="column2" :column3="column3" :column4="column4"></kanbanColumn3>
        </div>
    `,
    data(){
        return{
            column1: [],
            column2: [],
            column3: [],
            column4: [],
            errors: [],
            errorsChange: [],
            id: 0,
            modal: false,
            cardTitle: '',
            cardDesc: '',
            cardDeadline: null,
            cardTitleChange: '',
            cardDescChange: '',
            cardDeadlineChange: null,
        }
    },
    methods: {
        showModal(){
            this.modal = true;
        },
        closeModal(){
            this.modal = false;
        },
        addCard() {
            this.errors = [];
            if(this.cardTitle && this.cardDesc && this.cardDeadline){
                this.id++
                this.column1.push({
                    id: this.id,
                    title: this.cardTitle,
                    desc: this.cardDesc,
                    deadline: this.cardDeadline,
                    changeDate: null,
                });

                this.cardTitle = '';
                this.cardDesc = '';
                this.cardDeadline = null;
            }
            else{
                if(!this.cardTitle) this.errors.push("Заголовок обязателен.");
                if(!this.cardDesc) this.errors.push("Описание обязательно.");
                if(!this.cardDeadline) this.errors.push("Срок выполнения обязателен.");
            }
        },
        changeCard(index){
            this.errorsChange = [];
            if(this.cardTitleChange && this.cardDescChange && this.cardDeadlineChange){
                this.column1[index].title = this.cardTitleChange;
                this.column1[index].desc = this.cardDescChange;
                this.column1[index].deadline = this.cardDeadlineChange;
                this.column1[index].changeDate = new Date().toLocaleString();

                this.cardTitleChange = '';
                this.cardDescChange = '';
                this.cardDeadlineChange = null;
            }
            else{
                if(!this.cardTitleChange) this.errorsChange.push("Заголовок обязателен.");
                if(!this.cardDescChange) this.errorsChange.push("Описание обязательно.");
                if(!this.cardDeadlineChange) this.errorsChange.push("Срок выполнения обязателен.");
            }
        },
        moveToColumn(index){
            if(this.column1[index].changeDate){
                this.column2.push({
                    title: this.column1[index].title,
                    desc: this.column1[index].desc,
                    deadline: this.column1[index].deadline,
                    changeDate: this.column1[index].changeDate
                });

                this.column1.splice(index, 1);
            }
            else{
                this.column2.push({
                    title: this.column1[index].title,
                    desc: this.column1[index].desc,
                    deadline: this.column1[index].deadline
                });

                this.column1.splice(index, 1);
            }
        },
        deleteCard(card){
            let indexCard = this.column1.indexOf(card.id);

            this.column1.splice(indexCard, 1);
        }
    }
});

Vue.component('kanbanColumn2', {
    props: {
        column2: {
            type: Array,
            required: true
        },
        column3: {
            type: Array,
            required: true
        }
    },
    template: `
        <div class="column">
            <h3 class="title">Задачи в работе</h3>
            <div class="card" v-for="(card, index) in column2">
                <h3>{{ card.title }}</h3>
                <p>Описание: {{ card.desc }} </p>
                <p>Срок выполнения: {{ card.deadline }}</p>
                <p v-show="card.changeDate">Дата и время последнего редактирования: {{ card.changeDate }}</p>
                <div class="buttons">
                    <button class="changeCard" @click="showModal">Редактировать</button>
                    <button class="moveButton" @click="moveToColumn(index)">Переместить >>></button>
                </div>
                <div class="modalForm" v-show="modal">
                    <form @submit.prevent="changeCard(index)">
                        <p>
                            <label for="title">Заголовок:</label>
                            <input id="title" v-model="cardTitleChange">
                        </p>
                        <p>
                            <label for="task1">Описание:</label>
                            <textarea id="task1" v-model="cardDescChange"></textarea>
                        </p>
                        <p>
                            <label for="title">Срок выполнения:</label>
                            <input id="title" v-model="cardDeadlineChange" type="date">
                        </p>
                        <p>
                            <input class="changeButton" type="submit" value="Применить изменения">
                        </p>
                        <p v-if="errorsChange.length">
                            <b>Пожалуйста, исправьте ошибку(оишбки):</b>
                            <ul>
                                <li v-for="error in errorsChange">{{ error }}</li>
                            </ul>
                        </p>
                    </form>
                    <button class="close" @click="closeModal">Закрыть форму</button>
                </div>
            </div>
        </div>
    `,
    data(){
        return{
            errorsChange: [],
            modal: false,
            cardTitleChange: '',
            cardDescChange: '',
            cardDeadlineChange: null,
        }
    },
    methods:{
        showModal(){
            this.modal = true;
        },
        closeModal(){
            this.modal = false;
        },
        changeCard(index){
            this.errorsChange = [];
            if(this.cardTitleChange && this.cardDescChange && this.cardDeadlineChange){
                this.column2[index].title = this.cardTitleChange;
                this.column2[index].desc = this.cardDescChange;
                this.column2[index].deadline = this.cardDeadlineChange;
                this.column2[index].changeDate = new Date().toLocaleString();

                this.cardTitleChange = '';
                this.cardDescChange = '';
                this.cardDeadlineChange = null;
            }
            else{
                if(!this.cardTitleChange) this.errorsChange.push("Заголовок обязателен.");
                if(!this.cardDescChange) this.errorsChange.push("Описание обязательно.");
                if(!this.cardDeadlineChange) this.errorsChange.push("Срок выполнения обязателен.");
            }
        },
        moveToColumn(index) {
            if(this.column2[index].changeDate){
                this.column3.push({
                    title: this.column2[index].title,
                    desc: this.column2[index].desc,
                    deadline: this.column2[index].deadline,
                    changeDate: this.column2[index].changeDate
                });

                this.column2.splice(index, 1);
            }
            else{
                this.column3.push({
                    title: this.column2[index].title,
                    desc: this.column2[index].desc,
                    deadline: this.column2[index].deadline
                });

                this.column2.splice(index, 1);
            }
        }
    }
})

Vue.component('kanbanColumn3', {
    props: {
        column2: {
            type: Array,
            required: true
        },
        column3: {
            type: Array,
            required: true,
        },
        column4: {
            type: Array,
            required: true
        }
    },
    template: `
        <div class="column">
            <h3 class="title">Тестирование</h3>
            <div class="card" v-for="(card, index) in column3">
                <h3>{{ card.title }}</h3>
                <p>Описание: {{ card.desc }} </p>
                <p>Срок выполнения: {{ card.deadline }}</p>
                <p v-show="card.changeDate">Дата и время последнего редактирования: {{ card.changeDate }}</p>
                <div class="moveButtons">
                    <button class="changeCard" @click="showModal">Редактировать</button>
                </div>
                <div class="buttons">
                    <button class="moveButton" @click="moveToPrevColumn(index)"><<< Переместить</button>
                    <button class="moveButton" @click="moveToNextColumn(index)">Переместить >>></button>
                </div>
                <div class="modalForm" v-show="modal">
                    <form @submit.prevent="changeCard(index)">
                        <p>
                            <label for="title">Заголовок:</label>
                            <input id="title" v-model="cardTitleChange">
                        </p>
                        <p>
                            <label for="task1">Описание:</label>
                            <textarea id="task1" v-model="cardDescChange"></textarea>
                        </p>
                        <p>
                            <label for="title">Срок выполнения:</label>
                            <input id="title" v-model="cardDeadlineChange" type="date">
                        </p>
                        <p>
                            <input class="changeButton" type="submit" value="Применить изменения">
                        </p>
                        <p v-if="errorsChange.length">
                            <b>Пожалуйста, исправьте ошибку(оишбки):</b>
                            <ul>
                                <li v-for="error in errorsChange">{{ error }}</li>
                            </ul>
                        </p>
                    </form>
                    <button class="close" @click="closeModal">Закрыть форму</button>
                </div>
            </div>
        </div>
    `,
    data(){
        return{
            errorsChange: [],
            modal: false,
            cardTitleChange: '',
            cardDescChange: '',
            cardDeadlineChange: null,
        }
    },
    methods:{
        showModal(){
            this.modal = true;
        },
        closeModal(){
            this.modal = false;
        },
        changeCard(index){
            this.errorsChange = [];
            if(this.cardTitleChange && this.cardDescChange && this.cardDeadlineChange){
                this.column3[index].title = this.cardTitleChange;
                this.column3[index].desc = this.cardDescChange;
                this.column3[index].deadline = this.cardDeadlineChange;
                this.column3[index].changeDate = new Date().toLocaleString();

                this.cardTitleChange = '';
                this.cardDescChange = '';
                this.cardDeadlineChange = null;
            }
            else{
                if(!this.cardTitleChange) this.errorsChange.push("Заголовок обязателен.");
                if(!this.cardDescChange) this.errorsChange.push("Описание обязательно.");
                if(!this.cardDeadlineChange) this.errorsChange.push("Срок выполнения обязателен.");
            }
        },
        moveToNextColumn(index){
            if(this.column3[index].changeDate){
                this.column4.push({
                    title: this.column3[index].title,
                    desc: this.column3[index].desc,
                    deadline: this.column3[index].deadline,
                    changeDate: this.column3[index].changeDate
                });

                this.column3.splice(index, 1);
            }
            else{
                this.column3.push({
                    title: this.column4[index].title,
                    desc: this.column4[index].desc,
                    deadline: this.column4[index].deadline
                });

                this.column3.splice(index, 1);
            }
        },
        moveToPrevColumn(index){
            if(this.column3[index].changeDate){
                this.column2.push({
                    title: this.column3[index].title,
                    desc: this.column3[index].desc,
                    deadline: this.column3[index].deadline,
                    changeDate: this.column3[index].changeDate
                });

                this.column3.splice(index, 1);
            }
            else{
                this.column2.push({
                    title: this.column3[index].title,
                    desc: this.column3[index].desc,
                    deadline: this.column3[index].deadline
                });

                this.column3.splice(index, 1);
            }
        },
    }
})


let app = new Vue({
    el: '#app'
});
