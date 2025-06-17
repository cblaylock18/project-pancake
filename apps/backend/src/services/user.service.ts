import prisma from "../config/db";

export async function getUserById(id: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                email: true,
                googleId: true,
                createdAt: true,
            },
        });
        return user;
    } catch (err) {
        console.error("Error fetching user by ID:", err);
        throw new Error("User not found");
    }
}

export async function getUserByGoogleId(googleId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { googleId: googleId },
            select: {
                id: true,
                username: true,
                email: true,
                googleId: true,
                createdAt: true,
            },
        });
        return user;
    } catch (err) {
        console.error("Error fetching user by Google ID:", err);
        throw new Error("User not found");
    }
}
