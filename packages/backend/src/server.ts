import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import { PrismaClient } from "@prisma/client";
import { Type, Static } from "@sinclair/typebox";

const server: FastifyInstance = Fastify({ logger: true });

const prisma = new PrismaClient();

const BodyScheme = Type.Object({
    title: Type.String(),
});

type BodyType = Static<typeof BodyScheme>;

const ResponseSchema = Type.Object({
    id: Type.Number(),
    title: Type.String(),
});

const options: RouteShorthandOptions = {
    schema: {
        body: BodyScheme,
        response: {
            200: ResponseSchema,
        },
    },
};

// noinspection JSUnusedLocalSymbols
server.post<{
    Body: BodyType,
}>("/todo", options, async (request, reply) => {
    return await prisma.todo.create({
        data: {
            title: request.body.title,
        },
    });
});

server.listen(3000)
    .catch((error) => {
        server.log.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
