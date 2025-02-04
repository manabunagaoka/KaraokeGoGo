/*
  Warnings:

  - You are about to drop the column `displayName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `recoveryEmail` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twoFactorEnabled` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twoFactorSecret` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `UserPreferences` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "User_phone_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "displayName",
DROP COLUMN "email",
DROP COLUMN "password",
DROP COLUMN "phone",
DROP COLUMN "recoveryEmail",
DROP COLUMN "twoFactorEnabled",
DROP COLUMN "twoFactorSecret";

-- AlterTable
ALTER TABLE "UserPreferences" DROP COLUMN "language",
ALTER COLUMN "theme" SET DEFAULT 'dark';
