<template>
    <div>
        <ul>
            <li v-for="todo in todos">{{ todo.title }}</li>
        </ul>

        <form v-on:submit="onSubmit">
            <input v-model="title" autofocus />
        </form>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";

    export default Vue.extend({
        data() {
            return {
                title: "",
            };
        },
        computed: {
            todos() {
                return this.$store.state.todos;
            },
        },
        methods: {
            async onSubmit() {
                const todo = await this.$nuxt.context.$axios.$post("/api/todo", { title: this.title });
                this.$store.commit("addTodos", [todo]);
            },
        },
        async fetch() {
            this.$store.commit("clearTodos");
            const todoList = await this.$nuxt.context.$axios.$get("/api/todo");
            this.$store.commit("addTodos", todoList);
        },
    });
</script>
