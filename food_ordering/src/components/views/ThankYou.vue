<template>
    <v-app class="mainContainer">
        

        <a>Thanks placing your order {{this.user.displayName}}!</a>
        <p>Here is what you ordered from {{this.cook.name}}: <a>
            <p v-for="(item, i) in menuItems" :key="i">
            {{item.quantity}} of {{item.name}}
            </p>
            </a></p>

    </v-app>
</template>

<script>
export default {
    name: 'ThankYou',
    data(){
        return{
            user: this.$route.params.user,
            cook:this.$route.params.cook,
            menuItems: this.$route.params.menuItems

        }
    }
}
</script>

<style scoped>
.mainContainer{
    background-color: #FFE9AE;
}
</style>