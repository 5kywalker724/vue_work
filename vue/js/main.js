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
                    <div class="buttons">
                        <button class="changeCard" @click="showModal">Редактировать</button>
                        <button class="deleteCard">Удалить</button>
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
            <div class="column">
                <h3 class="title">Задачи в работе</h3>
            </div>
            <div class="column">
                <h3 class="title">Тестирование</h3>
            </div>
            <div class="column">
                <h3 class="title">Выполненные задачи</h3>
            </div>
        </div>
    `,
    data(){
        return{
            column1: [],
            errors: [],
            errorsChange: [],
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
                this.column1.push({
                    title: this.cardTitle,
                    desc: this.cardDesc,
                    deadline: this.cardDeadline,
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
    }
});


let app = new Vue({
    el: '#app'
});
