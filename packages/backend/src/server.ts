import Fastify, { FastifyInstance } from "fastify";

const server: FastifyInstance = Fastify({ logger: true });

server.get("/", async (request, reply) => {
    return { hello: "world" };
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
