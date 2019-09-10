<template>
    <div class="Catalog">
        <div class="container">
            <h1 class="text-center">Каталог</h1>
            <div class="jumbotron jumbotron-fluid">
                <div class="row justify-content-between">
                    <div class="col-sm-6 col-xs-12">
                        <div class="sort">
                            <p>Сортировать по:</p>
                            <select v-model="sortSelected" class="form-control">
                                <option v-for="option in sortOptions" v-bind:value="option.value" :key="option.value">
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-6 col-xs-12">
                        <div class="show">
                            <p>Показывать по:</p>
                            <select v-model="showSelected" class="form-control">
                                <option v-for="option in showOptions" v-bind:value="option.value" :key="option.value">
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 col-md-6" v-for="(item, key) in sortProducts" v-show="key >= (currentPage - 1) * showSelected && key < currentPage * showSelected"
                     :key="key">
                    <div class="product">
                        <div class="product-img">
                            <img src="https://via.placeholder.com/600" alt="Photo">
                        </div>
                        <div class="product-info">
                            <div class="product-title">{{item.title}}</div>
                            <div class="product-desc">{{item.description}}</div>
                            <div class="product-price">{{item.price + ' P'}}</div>
                            <div class="text-center">
                                <button class="btn" @click="buy(item)">Купить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pagination-wrap">
                <div class="row">
                    <div class="col">
                        <nav>
                            <ul class="pagination justify-content-center">
                                <li class="page-item" v-if="currentPage > 1">
                                    <span class="page-link" @click="currentPage--">Previous</span>
                                </li>
                                <li :class="currentPage == page ? 'page-item active' : 'page-item'" v-for="(page, index) in pages" :key="index">
                                    <a class="page-link" @click="currentPage = page">{{page}}</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" @click="currentPage++">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                products: [],
                currentPage: 1,
                sortSelected: '1',
                sortOptions: [
                    {text: 'Цене', value: '1'},
                    {text: 'Названию', value: '2'},
                ],
                showSelected: '12',
                showOptions: [
                    {text: '12', value: '12'},
                    {text: '24', value: '24'}
                ],
                buyProducts: []
            }
        },
        computed: {
            // Расчет количества страниц для пагинации
            pages () {
                return Math.ceil(this.products.length / Number(this.showSelected))
            },
            // Сортировка товаров
            sortProducts () {
                let products = this.products
                if (this.sortSelected === '1') {
                    return products.sort(function (product1, product2) {
                        return (Number(product1.price) > Number(product2.price)) ? 1 : -1
                    })
                }
                else if (this.sortSelected === '2') {
                    return products.sort(function (product1, product2) {
                        return (String(product1.title.toLowerCase()) > String(product2.title.toLowerCase())) ? 1 : -1
                    })
                }
                else {
                    return products
                }
            },
        },
        methods: {
            // Покупка товара
            buy (product) {
                const now = +new Date()
                product.addTime = now
                if (this.buyProducts.length === 0) {
                    product.count = 1
                    this.buyProducts.push(product)
                }
                else {
                    let newProduct = true
                    for (let i = 0; i < this.buyProducts.length; i++) {
                        if (Number(this.buyProducts[i].id) === Number(product.id)) {
                            this.buyProducts[i].count += 1
                            newProduct = false
                        }
                    }
                    if (newProduct) {
                        product.count = 1
                        this.buyProducts.push(product)
                    }
                }
                this.$store.commit('addProductToCard', this.buyProducts)
            }
        },
        created() {
            // Инициализация товаров в корзине с LocalStorage при создании компонента
            if (this.$store.state.buyProducts.length > 0) {
                this.buyProducts = this.$store.state.buyProducts
            }
            // Получение товаров с апи
            axios.get(`https://5d7235535acf5e0014730be7.mockapi.io/api/products`)
                .then(response => {
                    this.products = response.data
                })
                .catch(e => {
                    console.log(e);
                })
        },
        watch: {
            // Плавная прокрутка вверх страницы
            currentPage: function () {
                var top = document.querySelector('body')

                top.scrollIntoView({
                    behavior: "smooth",
                    block:    "start"
                })
            },
        }
    };
</script>
