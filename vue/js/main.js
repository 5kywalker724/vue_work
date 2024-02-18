Vue.component('kanban', {
    template: `
        <div class="product">
            <div class="column column1">
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
                    <div class="moveButtons">
                        <button class="changeCard" @click="showModal(index)">Редактировать</button>
                        <button class="deleteCard" @click="deleteCard(card)">Удалить</button>
                        <button class="moveButton" @click="moveToColumn(index)">Переместить >>></button>
                    </div>
                    <div class="modalForm" v-show="modal">
                        <form @submit.prevent="changeCard">
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
            <kanbanColumn4 :column4="column4"></kanbanColumn4>
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
            indexCardChange: null,
        }
    },
    methods: {
        showModal(index){
            this.modal = true;
            this.indexCardChange = index;
        },
        closeModal(){
            this.modal = false;
            this.indexCardChange = null;
        },
        addCard() {
            this.errors = [];
            if(this.cardTitle && this.cardDesc && this.cardDeadline){
                this.id++

                let checkDeadline = new Date();
                let checkYear = checkDeadline.getFullYear();
                let checkMonth = checkDeadline.getMonth() + 1;
                let checkDay = checkDeadline.getDate();

                let check = checkYear + "-" + "0" + checkMonth + "-" + checkDay;

                if(this.cardDeadline > check){
                    this.column1.push({
                        id: this.id,
                        title: this.cardTitle,
                        desc: this.cardDesc,
                        deadline: this.cardDeadline,
                        cardColor: false,
                        changeDate: null,
                    });
                }
                else{
                    this.column1.push({
                        id: this.id,
                        title: this.cardTitle,
                        desc: this.cardDesc,
                        deadline: this.cardDeadline,
                        cardColor: true,
                        changeDate: null,
                    });
                }

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
        changeCard(){
            this.errorsChange = [];
            if(this.cardTitleChange && this.cardDescChange && this.cardDeadlineChange){
                this.column1[this.indexCardChange].title = this.cardTitleChange;
                this.column1[this.indexCardChange].desc = this.cardDescChange;
                this.column1[this.indexCardChange].deadline = this.cardDeadlineChange;
                this.column1[this.indexCardChange].changeDate = new Date().toLocaleString();

                this.cardTitleChange = '';
                this.cardDescChange = '';
                this.cardDeadlineChange = null;
                this.modal = false;
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
                    cardColor: this.column1[index].cardColor,
                    changeDate: this.column1[index].changeDate
                });

                this.column1.splice(index, 1);
            }
            else{
                this.column2.push({
                    title: this.column1[index].title,
                    desc: this.column1[index].desc,
                    deadline: this.column1[index].deadline,
                    cardColor: this.column1[index].cardColor,
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
                <p v-show="card.message">Причина переноса в колонку: {{ card.message }}</p>
                <div class="moveButtons">
                    <button class="changeCard" @click="showModal(index)">Редактировать</button>
                    <button class="moveButton" @click="moveToColumn(index)">Переместить >>></button>
                </div>
                <div class="modalForm" v-show="modal">
                    <form @submit.prevent="changeCard">
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
            indexCardChange: null,
        }
    },
    methods:{
        showModal(index){
            this.modal = true;
            this.indexCardChange = index;
        },
        closeModal(){
            this.modal = false;
            this.indexCardChange = null;
        },
        changeCard(){
            this.errorsChange = [];
            if(this.cardTitleChange && this.cardDescChange && this.cardDeadlineChange){
                this.column2[this.indexCardChange].title = this.cardTitleChange;
                this.column2[this.indexCardChange].desc = this.cardDescChange;
                this.column2[this.indexCardChange].deadline = this.cardDeadlineChange;
                this.column2[this.indexCardChange].changeDate = new Date().toLocaleString();

                this.cardTitleChange = '';
                this.cardDescChange = '';
                this.cardDeadlineChange = null;
                this.modal = false;
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
                    cardColor: this.column2[index].cardColor,
                    changeDate: this.column2[index].changeDate
                });

                this.column2.splice(index, 1);
            }
            else{
                this.column3.push({
                    title: this.column2[index].title,
                    desc: this.column2[index].desc,
                    deadline: this.column2[index].deadline,
                    cardColor: this.column2[index].cardColor,
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
                    <button class="changeCard" @click="showModal(index)">Редактировать</button>
                    <button class="moveButton" @click="moveToNextColumn(index)">Переместить >>></button>
                    <button class="moveButton" @click="showModalMessage(index)"><<< Переместить</button>
                </div>
                <div class="modalForm" v-show="modal">
                    <form @submit.prevent="changeCard">
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
                <div class="modalForm" v-show="modalMessage">
                    <form @submit.prevent="moveToPrevColumn">
                        <p>
                            <label for="title">Причина перемещения карточки:</label>
                            <input id="title" v-model="cardMessage">
                        </p>
                        <p>
                            <input class="changeButton" type="submit" value="Применить">
                        </p>
                        <p v-if="errorsMessage.length">
                            <b>Пожалуйста, исправьте ошибку(ошибки):</b>
                            <ul>
                                <li v-for="error in errorsMessage">{{ error }}</li>
                            </ul>
                        </p>
                    </form>
                    <button class="close" @click="closeModalMessage">Закрыть форму</button>
                </div>
            </div>
        </div>
    `,
    data(){
        return{
            errorsChange: [],
            errorsMessage: [],
            modal: false,
            modalMessage: false,
            cardTitleChange: '',
            cardDescChange: '',
            cardDeadlineChange: null,
            cardMessage: '',
            indexCardChange: null,
            indexCardMessage: null,
        }
    },
    methods:{
        showModalMessage(index){
            this.modalMessage = true;
            this.indexCardMessage = index;
        },
        closeModalMessage(){
            this.modalMessage = false;
            this.indexCardMessage = null;
        },
        showModal(index){
            this.modal = true;
            this.indexCardChange = index;
        },
        closeModal(){
            this.modal = false;
            this.indexCardChange = null;
        },
        changeCard(){
            this.errorsChange = [];
            if(this.cardTitleChange && this.cardDescChange && this.cardDeadlineChange){
                this.column3[this.indexCardChange].title = this.cardTitleChange;
                this.column3[this.indexCardChange].desc = this.cardDescChange;
                this.column3[this.indexCardChange].deadline = this.cardDeadlineChange;
                this.column3[this.indexCardChange].changeDate = new Date().toLocaleString();

                this.cardTitleChange = '';
                this.cardDescChange = '';
                this.cardDeadlineChange = null;
                this.modal = false;
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
                    cardColor: this.column3[index].cardColor,
                    changeDate: this.column3[index].changeDate
                });

                this.column3.splice(index, 1);
            }
            else{
                this.column4.push({
                    title: this.column3[index].title,
                    desc: this.column3[index].desc,
                    deadline: this.column3[index].deadline,
                    cardColor: this.column3[index].cardColor
                });

                this.column3.splice(index, 1);
            }
        },
        moveToPrevColumn(){
            this.errorsMessage = [];
            if(this.cardMessage){
                if(this.column3[this.indexCardMessage].changeDate){
                    this.column2.push({
                        title: this.column3[this.indexCardMessage].title,
                        desc: this.column3[this.indexCardMessage].desc,
                        deadline: this.column3[this.indexCardMessage].deadline,
                        cardColor: this.column3[this.indexCardMessage].cardColor,
                        changeDate: this.column3[this.indexCardMessage].changeDate,
                        message: this.cardMessage
                    });

                    this.cardMessage = '';
                    this.modalMessage = null;

                    this.column3.splice(this.indexCardMessage, 1);
                }
                else{
                    this.column2.push({
                        title: this.column3[this.indexCardMessage].title,
                        desc: this.column3[this.indexCardMessage].desc,
                        deadline: this.column3[this.indexCardMessage].deadline,
                        cardColor: this.column3[this.indexCardMessage].cardColor,
                        message: this.cardMessage
                    });

                    this.cardMessage = '';
                    this.modalMessage = null;

                    this.column3.splice(this.indexCardMessage, 1);
                }
            }
            else{
                if(!this.cardMessage) this.errorsMessage.push("Причина обязательна.");
            }
        },
    }
})

Vue.component('kanbanColumn4', {
    props: {
        column4: {
            type: Array,
            required: true
        }
    },
    template: `
        <div class="column">
            <h3 class="title">Выполненные задачи</h3>
            <div class="card greenCard" v-for="(card, index) in column4" :class="{redCard: !card.cardColor}">
                <h3>{{ card.title }}</h3>
                <p>Описание: {{ card.desc }} </p>
                <p>Срок выполнения: {{ card.deadline }}</p>
                <p v-show="card.changeDate">Дата и время последнего редактирования: {{ card.changeDate }}</p>
            </div>
        </div>
    `,
})


let app = new Vue({
    el: '#app'
});
