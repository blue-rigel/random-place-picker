-- CreateTable
CREATE TABLE "SelectedOption" (
    "planId" TEXT NOT NULL,
    "submissionId" INTEGER NOT NULL,
    CONSTRAINT "SelectedOption_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SelectedOption_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "SelectedOption_planId_key" ON "SelectedOption"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "SelectedOption_submissionId_key" ON "SelectedOption"("submissionId");
