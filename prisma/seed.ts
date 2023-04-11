import { PrismaClient } from "@prisma/client";
import { upcomingSemesters } from "./upcomingSemesters";
const prisma = new PrismaClient();

async function seed() {
  try {
    const semesters = upcomingSemesters.map((semester) => ({
      season: semester.season,
      year: semester.year,
      seasonCode: semester.seasonCode,
    }));

    const results = await Promise.all([
      prisma.semester.createMany({
        data: semesters,
      }),
    ]);
    console.log(`Seeding successful: ${JSON.stringify(results)}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}
seed();
