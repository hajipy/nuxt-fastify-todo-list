import Fastify, { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { Type, Static } from "@sinclair/typebox";

const server: FastifyInstance = Fastify({ logger: true });

const prisma = new PrismaClient();

server.get("/", async (request, reply) => {
    return { hello: "world" };
});

const BodyScheme = Type.Object({
    title: Type.String(),
});

type BodyType = Static<typeof BodyScheme>;

server.post<{
    Body: BodyType,
}>("/todo", async (request, repay) => {
    console.log(request.body);

    const newTodo = await prisma.todo.create({
        data: {
            title: request.body.title || "new task",
        },
    });

    return { todo: newTodo };
});

const startServer = async () => {
    try {
        await server.listen(3000);
    }
    catch (error) {
        server.log.error(error);
        process.exit(1);
    }
};

startServer();
