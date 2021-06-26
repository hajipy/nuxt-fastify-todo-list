import { PrismaClient } from "@prisma/client";
import Fastify, { FastifyInstance } from "fastify";
import {
    TodoGetResponse,
    TodoGetResponseSchema,
    TodoObject,
    TodoObjectSchema,
    TodoPostBody,
    TodoPostBodyScheme,
} from "nuxt-fastify-todo-list-shared";

const server: FastifyInstance = Fastify({ logger: true });

const prisma = new PrismaClient();

server.get(
    "/todo",
    {
        schema: {
            response: {
                200: TodoGetResponseSchema,
            },
        },
    },
    (): Promise<TodoGetResponse> => {
        return prisma.todo.findMany({
            orderBy: [
                { id: "asc" },
            ],
        });
    }
);

server.post<{
    Body: TodoPostBody,
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
    (request): Promise<TodoObject> => {
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
