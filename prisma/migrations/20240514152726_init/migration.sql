/*
  Warnings:

  - You are about to drop the column `description` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Plant` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Tasks_user_id_key";

-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "description",
DROP COLUMN "image",
ADD COLUMN     "condition" TEXT NOT NULL DEFAULT 'healthy',
ADD COLUMN     "current_exp" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "max_exp" INTEGER NOT NULL DEFAULT 100,
ALTER COLUMN "name" SET DEFAULT 'plant';

-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ongoing',
ALTER COLUMN "type" SET DEFAULT 'easy';
