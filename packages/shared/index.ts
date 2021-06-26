import { Static, Type } from "@sinclair/typebox";

export const TodoSchema = Type.Object({
    id: Type.Number(),
    title: Type.String(),
});
export type Todo = Static<typeof TodoSchema>;

export const ListTodoResponseSchema = Type.Array(TodoSchema);
export type ListTodoResponse = Static<typeof ListTodoResponseSchema>;

export const AddTodoRequestScheme = Type.Object({
    title: Type.String(),
});
export type AddTodoRequest = Static<typeof AddTodoRequestScheme>;
