<template>
    <div class="Cart">
        <div class="container">
            <h1 class="text-center">Корзина</h1>
            <div class="jumbotron">
                <p v-if="buyProducts.length < 1" class="text-center">В корзине нет товаров</p>
                <div v-if="buyProducts.length > 0">
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button class="btn clear" @click="clear">Очистить корзину</button>
                    </div>
                    <div class="card" v-for="item in sortProducts" :key="item.id">
                        <div class="row align-items-center">
                            <div class="remove" @click="removeFromCart(item)"><i class="far fa-trash-alt"></i></div>
                            <div class="col-xl-3 col-lg-4 col-md-4">
                                <div class="card-img">
                                    <img src="https://via.placeholder.com/600" alt="Photo">
                                </div>
                            </div>
                            <div class="col-xl-9 col-lg-8 col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">{{item.title}}</h5>
                                    <p class="card-text">{{item.description}}</p>
                                    <h4 class="card-price">{{item.price + ' P'}}</h4>
                                    <counter :product="item" :key="item.count"></counter>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="total-info">
                        <div class="row">
                            <div class="col"><h3>Всего:</h3></div>
                            <div class="col text-right"><h3>{{totalPrice + ' P'}}</h3></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Counter from "../../components/Counter/Counter"

    export default {
        components: {
            Counter,
        },
        data() {
            return {}
        },
        computed: {
            // Инициализация товаров в корзине
            buyProducts () {
                if (this.$store.state.buyProducts.length > 0) {
                    return this.$store.state.buyProducts
                }
                return []
            },
            // Сортировка товаров по дате добавления в корзину
            sortProducts () {
                let products = this.buyProducts
                return products.sort(function (product1, product2) {
                    return (Number(product1.addTime) > Number(product2.addTime)) ? -1 : 1
                })
            },
            // Подсчет общей цены
            totalPrice () {
                let total = 0
                for (let i = 0; i < this.buyProducts.length; i++) {
                    total += Number(this.buyProducts[i].price) * this.buyProducts[i].count
                }
                return total.toFixed(2)
            },
        },
        methods: {
            // Удаление товара с корзины
            removeFromCart (data) {
                const products = this.buyProducts
                for (let i = 0; i < products.length; i++) {
                    if (Number(products[i].id) === Number(data.id)) {
                        products.splice(products.indexOf(products[i]), 1);

                    }
                }
                this.$store.commit('addProductToCard', products)
            },
            // Очистка корзины
            clear () {
                this.$store.commit('addProductToCard', [])
            }
        }
    };
</script>
