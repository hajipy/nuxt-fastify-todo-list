import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
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

const ResponseSchema = Type.Object({
    todo: Type.Object({
        id: Type.Number(),
        title: Type.String(),
    }),
});

const options: RouteShorthandOptions = {
    schema: {
        body: BodyScheme,
        response: {
            200: ResponseSchema,
        },
    },
};

server.post<{
    Body: BodyType,
}>("/todo", options, async (request, repay) => {
    console.log(request.body);

    const newTodo = await prisma.todo.create({
        data: {
            title: request.body.title,
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
