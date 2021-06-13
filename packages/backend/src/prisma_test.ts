import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.todo.create({
        data: {
            title: "new task",
        },
    });

    const allTodos = await prisma.todo.findMany({});
    console.dir(allTodos, { depth: null });
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
