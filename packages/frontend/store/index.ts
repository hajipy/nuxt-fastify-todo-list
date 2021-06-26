import { MutationTree } from "vuex";
import { Todo } from "nuxt-fastify-todo-list-shared";

interface State {
    todos: Todo[];
}

const mutations: MutationTree<State> = {
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
