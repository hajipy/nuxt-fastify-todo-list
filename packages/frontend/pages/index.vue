<template>
    <h1>{{ message }}</h1>
</template>

<script lang="ts">
    import Vue from "vue";

    const message: string = "Hello world with TypeScript";

    export default Vue.extend({
        data() {
            return {
                message,
            };
        },
    });
</script>
