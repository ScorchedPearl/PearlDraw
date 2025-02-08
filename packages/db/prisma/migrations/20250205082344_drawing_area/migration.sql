-- CreateTable
CREATE TABLE "DrawingArea" (
    "id" SERIAL NOT NULL,
    "area" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "DrawingArea_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DrawingArea" ADD CONSTRAINT "DrawingArea_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrawingArea" ADD CONSTRAINT "DrawingArea_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
