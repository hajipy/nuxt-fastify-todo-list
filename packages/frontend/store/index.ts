import { MutationTree } from "vuex";

class State {
    public todos: Array<{ id: number; title: string; }> = [];
}

const mutations: MutationTree<State> = {
    addTodos(state, todos: Array<{ id: number; title: string; }>) {
        state.todos.push(...todos);
    },
};

export default {
    state: new State(),
    mutations,
};
