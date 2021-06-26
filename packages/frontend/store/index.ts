import { MutationTree } from "vuex";
import { TodoObject } from "nuxt-fastify-todo-list-shared";

interface State {
    todos: TodoObject[];
}

const mutations: MutationTree<State> = {
    addTodos(state, todos: TodoObject[]) {
        state.todos.push(...todos);
    },
};

export default {
    state: (): State => ({
        todos: [],
    }),
    mutations,
};
