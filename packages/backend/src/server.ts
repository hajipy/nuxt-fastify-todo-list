import { PrismaClient } from "@prisma/client";
import Fastify, { FastifyInstance } from "fastify";
import {
    ListTodoResponse,
    ListTodoResponseSchema,
    Todo,
    TodoSchema,
    AddTodoRequest,
    AddTodoRequestScheme,
} from "nuxt-fastify-todo-list-shared";

const server: FastifyInstance = Fastify({ logger: true });

const prisma = new PrismaClient();

server.get(
    "/todo",
    {
        schema: {
            response: {
                200: ListTodoResponseSchema,
            },
        },
    },
    (): Promise<ListTodoResponse> => {
        return prisma.todo.findMany({
            orderBy: [
                { id: "asc" },
            ],
        });
    }
);

server.post<{
    Body: AddTodoRequest,
}>(
    "/todo",
    {
        schema: {
            body: AddTodoRequestScheme,
            response: {
                200: TodoSchema,
            },
        },
    },
    (request): Promise<Todo> => {
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
