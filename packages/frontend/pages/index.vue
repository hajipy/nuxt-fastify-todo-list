<template>
    <ul>
        <li v-for="todo in todos">{{ todo.title }}</li>
    </ul>
</template>

<script lang="ts">
    import Vue from "vue";

    export default Vue.extend({
        computed: {
            todos() {
                return this.$store.state.todos;
            },
        },
        async fetch() {
            const todoList = await this.$nuxt.context.$axios.$get("/api/todo");
            this.$store.commit("addTodos", todoList);
        },
    });
</script>
