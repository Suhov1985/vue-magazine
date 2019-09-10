<template>
    <div class="Counter">
        <div class="quantity-select">
            <span class="minus" :class="{ disabled: product.count <= 1 }" @click="minus">-</span>
            <span class="number">{{ product.count }}</span>
            <span class="plus" @click="plus">+</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            product: Object
        },
        computed: {
            buyProducts () {
                if (this.$store.state.buyProducts.length > 0) {
                    return this.$store.state.buyProducts
                }
                return []
            },
        },
        methods: {
            plus () {
                for (var i = 0; i < this.buyProducts.length; i++) {
                    if (Number(this.buyProducts[i].id) === Number(this.product.id)) {
                        this.buyProducts[i].count += 1
                    }
                }
                this.$store.commit('addProductToCard', this.buyProducts)
            },
            minus () {
                for (var i = 0; i < this.buyProducts.length; i++) {
                    if (Number(this.buyProducts[i].id) === Number(this.product.id)) {
                        if (this.buyProducts[i].count > 1) {
                            this.buyProducts[i].count -= 1
                        }
                    }
                }
                this.$store.commit('addProductToCard', this.buyProducts)
            }
        }
    };
</script>
