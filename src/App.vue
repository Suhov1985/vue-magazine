<template>
    <div id="app">
        <navbar v-on:currentPage="setCurrenPage"></navbar>
        <catalog v-if="currentPage == 'catalog'"></catalog>
        <cart v-else></cart>
    </div>
</template>

<script>
    import Navbar from './components/Navbar/Navbar'
    import Catalog from './views/Catalog/Catalog'
    import Cart from './views/Cart/Cart'

    export default {
        components: {
            Navbar,
            Catalog,
            Cart
        },
        data() {
            return {
                currentPage: 'catalog',
            }
        },
        created() {
            // Инициализация товаров в сторе из localStorage
            if(localStorage.cart){
                this.$store.commit('buyProductsInit', JSON.parse(localStorage.cart))
            }
        },
        methods: {
            // Переключение страниц без перезагрузки страницы
            setCurrenPage(data){
                this.currentPage = data
            }
        }
    }
</script>

<style lang="sass">
/*Подключение стилей*/
@import './assets/styles/custom.sass'
</style>
