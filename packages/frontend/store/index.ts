import { MutationTree } from "vuex";
import { Todo } from "nuxt-fastify-todo-list-shared";

interface State {
    todos: Todo[];
}

const mutations: MutationTree<State> = {
    clearTodos(state) {
        state.todos.splice(0, state.todos.length);
    },
    addTodos(state, todos: Todo[]) {
        state.todos.push(...todos);
    },
};

export default {
    state: (): State => ({
        todos: [],
    }),
    mutations,
};
