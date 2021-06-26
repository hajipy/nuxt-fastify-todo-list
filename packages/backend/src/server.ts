import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import { PrismaClient } from "@prisma/client";
import { Type, Static } from "@sinclair/typebox";

const server: FastifyInstance = Fastify({ logger: true });

const prisma = new PrismaClient();

const TodoPostBodyScheme = Type.Object({
    title: Type.String(),
});

type TodoPostBodyType = Static<typeof TodoPostBodyScheme>;

const TodoObjectSchema = Type.Object({
    id: Type.Number(),
    title: Type.String(),
});

type TodoPostResponseType = Static<typeof TodoObjectSchema>;

const TodoPostOptions: RouteShorthandOptions = {
    schema: {
        body: TodoPostBodyScheme,
        response: {
            200: TodoObjectSchema,
        },
    },
};

server.post<{
    Body: TodoPostBodyType,
}>("/todo", TodoPostOptions, async (request): Promise<TodoPostResponseType> => {
    return await prisma.todo.create({
        data: {
            title: request.body.title,
        },
    });
});

const TodoGetResponseSchema = Type.Array(TodoObjectSchema);

type TodoGetResponseType = Static<typeof TodoGetResponseSchema>;

const TodoGetOptions: RouteShorthandOptions = {
    schema: {
        response: {
            200: TodoGetResponseSchema,
        },
    },
};

server.get("/todo", TodoGetOptions, async (): Promise<TodoGetResponseType> => {
    return await prisma.todo.findMany({
        orderBy: [
            { id: "asc" },
        ],
    });
});

server.listen(3000)
    .catch((error) => {
        server.log.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
