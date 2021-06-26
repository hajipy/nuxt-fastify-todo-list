<template>
    <ul>
        <li v-for="todo in todoList">{{ todo }}</li>
    </ul>
</template>

<script lang="ts">
    import Vue from "vue";

    export default Vue.extend({
        computed: {
            todoList() {
                return this.$store.state.todoList;
            },
        },
    });
</script>
