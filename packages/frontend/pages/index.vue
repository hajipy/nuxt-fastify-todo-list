<template>
    <ul>
        <li v-for="todo in todoList">{{ todo }}</li>
    </ul>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Context } from "@nuxt/types";

    export default Vue.extend({
        computed: {
            todoList() {
                return this.$store.state.todoList;
            },
        },
        async asyncData(context: Context) {
            const todoList = await context.$axios.$get("http://localhost:3000/todo");
            console.log(todoList);
        },
    });
</script>
