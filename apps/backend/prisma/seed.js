import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // Create two users
    const alice = await prisma.user.upsert({
        where: { email: "alice@example.com" },
        update: {},
        create: {
            email: "alice@example.com",
            username: "alice",
            googleId: "google-alice",
        },
    });

    const bob = await prisma.user.upsert({
        where: { email: "bob@example.com" },
        update: {},
        create: {
            email: "bob@example.com",
            username: "bob",
            githubId: "github-bob",
        },
    });

    // Create a room with alice and bob
    const room = await prisma.room.upsert({
        data: {
            roomCode: "TEST",
            p1Id: alice.id,
            p2Id: bob.id,
        },
    });

    // Create a game in the room (active)
    const game = await prisma.game.create({
        data: {
            roomId: room.id,
            isActive: true,
        },
    });

    // Set initial turn state
    await prisma.turnState.create({
        data: {
            gameId: game.id,
            roundScore: 0,
            turnPlayerId: alice.id,
        },
    });

    // Log a fake turn result
    await prisma.turn.create({
        data: {
            gameId: game.id,
            playerId: alice.id,
            round: 1,
            action: "bank",
            score: 1000,
        },
    });
}

main()
    .then(() => console.log("Seeding complete"))
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
