/*
  Warnings:

  - You are about to drop the column `bestRound` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `bestRoundPlayerId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `turnPlayerId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `currentRoll` on the `TurnState` table. All the data in the column will be lost.
  - You are about to drop the column `heldDice` on the `TurnState` table. All the data in the column will be lost.
  - You are about to drop the column `remainingDice` on the `TurnState` table. All the data in the column will be lost.
  - You are about to drop the `ScoreEntry` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `turnPlayerId` to the `TurnState` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_bestRoundPlayerId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_turnPlayerId_fkey";

-- DropForeignKey
ALTER TABLE "ScoreEntry" DROP CONSTRAINT "ScoreEntry_gameId_fkey";

-- DropForeignKey
ALTER TABLE "ScoreEntry" DROP CONSTRAINT "ScoreEntry_playerId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "bestRound",
DROP COLUMN "bestRoundPlayerId",
DROP COLUMN "turnPlayerId";

-- AlterTable
ALTER TABLE "TurnState" DROP COLUMN "currentRoll",
DROP COLUMN "heldDice",
DROP COLUMN "remainingDice",
ADD COLUMN     "turnPlayerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" SET NOT NULL;

-- DropTable
DROP TABLE "ScoreEntry";

-- CreateTable
CREATE TABLE "Turn" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "round" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Turn_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TurnState" ADD CONSTRAINT "TurnState_turnPlayerId_fkey" FOREIGN KEY ("turnPlayerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turn" ADD CONSTRAINT "Turn_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turn" ADD CONSTRAINT "Turn_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
