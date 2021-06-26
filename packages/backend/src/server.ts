import Fastify, { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { Type, Static } from "@sinclair/typebox";

const server: FastifyInstance = Fastify({ logger: true });

const prisma = new PrismaClient();

const TodoObjectSchema = Type.Object({
    id: Type.Number(),
    title: Type.String(),
});

const TodoGetResponseSchema = Type.Array(TodoObjectSchema);
type TodoGetResponseType = Static<typeof TodoGetResponseSchema>;
server.get(
    "/todo",
    {
        schema: {
            response: {
                200: TodoGetResponseSchema,
            },
        },
    },
    (): Promise<TodoGetResponseType> => {
        return prisma.todo.findMany({
            orderBy: [
                { id: "asc" },
            ],
        });
    }
);

const TodoPostBodyScheme = Type.Object({
    title: Type.String(),
});
type TodoPostBodyType = Static<typeof TodoPostBodyScheme>;
type TodoPostResponseType = Static<typeof TodoObjectSchema>;
server.post<{
    Body: TodoPostBodyType,
}>(
    "/todo",
    {
        schema: {
            body: TodoPostBodyScheme,
            response: {
                200: TodoObjectSchema,
            },
        },
    },
    (request): Promise<TodoPostResponseType> => {
        return prisma.todo.create({
            data: {
                title: request.body.title,
            },
        });
    }
);

server.listen(3000)
    .catch((error) => {
        server.log.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
