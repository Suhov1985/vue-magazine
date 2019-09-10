<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="/"><img src="../../assets/img/logo.png" alt="Logo"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul class="navbar-nav">
                <li class="nav-item" :class="currentPage == 'catalog' ? 'active' : ''">
                    <a class="nav-link" @click="selectPage('catalog')" data-toggle="collapse" data-target="#navbarSupportedContent">Каталог</a>
                </li>
                <li class="nav-item" :class="currentPage == 'cart' ? 'active' : ''">
                    <a class="nav-link" @click="selectPage('cart')" data-toggle="collapse" data-target="#navbarSupportedContent">Корзина <span><i
                      class="fa fa-shopping-bag"></i><span class="count">{{productsCount.length}}</span></span></a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        data() {
            return {
                currentPage: 'catalog'
            }
        },
        methods: {
            // Переключение страниц
            selectPage (page) {
                this.currentPage = page
                this.$emit('currentPage', this.currentPage)
            }
        },
        computed: {
            // Подсчет общего количества товаров в корзине
            productsCount () {
                if (this.$store.state.buyProducts.length > 0) {
                    return this.$store.state.buyProducts
                }
                return []
            },
        },
    }
</script>
