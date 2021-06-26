import { MutationTree } from "vuex";

interface State {
    todos: Array<{ id: number; title: string; }>;
}

const mutations: MutationTree<State> = {
    addTodos(state, todos: Array<{ id: number; title: string; }>) {
        state.todos.push(...todos);
    },
};

export default {
    state: (): State => ({
        todos: [],
    }),
    mutations,
};
