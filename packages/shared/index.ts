import { Static, Type } from "@sinclair/typebox";

export const TodoObjectSchema = Type.Object({
    id: Type.Number(),
    title: Type.String(),
});
export type TodoObject = Static<typeof TodoObjectSchema>;

export const TodoGetResponseSchema = Type.Array(TodoObjectSchema);
export type TodoGetResponse = Static<typeof TodoGetResponseSchema>;

export const TodoPostBodyScheme = Type.Object({
    title: Type.String(),
});
export type TodoPostBody = Static<typeof TodoPostBodyScheme>;
