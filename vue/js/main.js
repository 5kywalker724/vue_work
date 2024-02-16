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
                        <input type="submit" value="Создать">
                    </p>   
                </form>
                 <p v-if="errors.length">
                        <b>Пожалуйста, исправьте ошибку(оишбки):</b>
                        <ul>
                            <li v-for="error in errors">{{ error }}</li>
                        </ul>
                 </p>
                 <div class="card" v-for="(card, index) in column1">
                    <h3>{{ card.title }}</h3>
                    <p>Описание: {{ card.desc }} </p>
                    <p>Срок выполнения: {{ card.deadline }}</p>
                    <div class="buttons">
                        <button class="changeCard">Редактировать</button>
                        <button class="deleteCard">Удалить</button>
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
            cardTitle: '',
            cardDesc: '',
            cardDeadline: null,
        }
    },
});


let app = new Vue({
    el: '#app'
});
