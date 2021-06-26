import { PrismaClient } from "@prisma/client";
import { Static, Type } from "@sinclair/typebox";
import Fastify, { FastifyInstance } from "fastify";

const server: FastifyInstance = Fastify({ logger: true });

const prisma = new PrismaClient();

const TodoObjectSchema = Type.Object({
    id: Type.Number(),
    title: Type.String(),
});

const TodoGetResponseSchema = Type.Array(TodoObjectSchema);
server.get(
    "/todo",
    {
        schema: {
            response: {
                200: TodoGetResponseSchema,
            },
        },
    },
    (): Promise<Static<typeof TodoGetResponseSchema>> => {
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
server.post<{
    Body: Static<typeof TodoPostBodyScheme>,
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
    (request): Promise<Static<typeof TodoObjectSchema>> => {
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
