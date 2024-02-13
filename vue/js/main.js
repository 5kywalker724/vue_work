Vue.component('product', {
    props:{
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <img :src="image" :alt="altText"/>
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock">In stock</p>
            <p v-else>Out of stock</p>
            <product-details :details="details"></product-details>
            <p>Shipping: {{ shipping }}</p>
            <div class="color-box"
                 v-for="(variant, index) in variants"
                 :key="variant.variantId"
                 :style="{backgroundColor: variant.variantColor}"
                 @mouseover="updateProduct(index)">
            </div>
            <button v-on:click="addToCart" :disabled="!inStock" :class="{disabledButton: !inStock}">Add to cart</button>
            <button v-on:click="delFromCart" :disabled="!inStock" :class="{disabledButton: !inStock}">Del from cart</button>
            <div>
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>{{ review.name }}</p>
                        <p>Rating: {{ review.rating }}</p>
                        <p>{{ review.review }}</p>
                        <p v-if="review.yes">Recommend: {{ review.yes }}</p>
                        <p v-else>Recommend: {{ review.no }}</p>
                    </li>
                </ul>
            </div>
            <product-review @review-submitted="addReview"></product-review>
        </div>
    </div>
    `,
    data() {
        return{
            product: "Socks",
            brand: "Vue Mastery",
            reviews: [],
            selectedVariant: 0,
            altText: "A pair of socks",
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: './assets/vmSocks-green-onWhite.jpg',
                    variantQuantity: 10,
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: './assets/vmSocks-blue-onWhite.jpg',
                    variantQuantity: 0,
                }
            ],
        }
    },
    methods: {
        addToCart(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        delFromCart(){
            this.$emit('del-from-cart', this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index){
            this.selectedVariant = index
            console.log(index);
        },
        addReview(productReview){
            this.reviews.push(productReview)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image(){
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity;
        },
        shipping(){
            if(this.premium){
                return "Free";
            }
            else{
                return 2.99;
            }
        }
    }
})

Vue.component("product-details", {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
    <ul>
        <li v-for="detail in details">{{ detail }}</li>
    </ul>    
    `
})

Vue.component('product-review', {
    template:`
    <form class="review-form" @submit.prevent="onSubmit">
        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p>
        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name" placeholder="name"> 
        </p>
        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>
        </p>
        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>
        <p>Would you recommend this product?</p>
            <div class="recommend">
                <p>Yes</p>
                <input id="yes" v-model="yes" type="radio" name="123" value="yes">  
            </div>
            <div class="recommend">
                <p>No</p>
                <input id="no" v-model="no" type="radio" name="123" value="no">  
            </div>
        <p>
            <input type="submit" value="Submit">
        </p>
    </form>
    `,
    data(){
        return{
            name: null,
            review: null,
            rating: null,
            yes: null,
            no: null,
            errors: []
        }
    },
    methods: {
        onSubmit(){
            if(this.name && this.review && this.rating && this.yes){
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    yes: this.yes
                }
                this.$emit('review-submitted', productReview)
                this.name = null;
                this.review = null;
                this.rating = null;
                this.yes = null;
            }
            else if(this.name && this.review && this.rating && this.no){
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    no: this.no
                }
                this.$emit('review-submitted', productReview)
                this.name = null;
                this.review = null;
                this.rating = null;
                this.no = null;
            }
            else{
                if(!this.name) this.errors.push("Name required.");
                if(!this.review) this.errors.push("Review required.");
                if(!this.rating) this.errors.push("Rating required.");
                if(!this.yes && !this.no) this.errors.push("Recommend required.")
            }
        }
    }

})

let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods:{
        updateCart(id){
            this.cart.push(id);
        },
        deleteCart(id){
            for(let i = this.cart.length-1; i >= 0; i--){
                if(this.cart[i] == id){
                    this.cart.splice(i, 1);
                }
            }
        }
    }
})

