import { PrismaClient } from "@prisma/client";
import { SEASON } from "../src/resolvers";
const prisma = new PrismaClient();

async function main() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const nextYear = currentDate.getFullYear() + 1;
  const upcomingSemesters = [
    { season: SEASON.SPRING, year: currentYear, seasonCode: 0 },
    { season: SEASON.SUMMER, year: currentYear, seasonCode: 1 },
    { season: SEASON.FALL, year: currentYear, seasonCode: 2 },
    { season: SEASON.WINTER, year: currentYear, seasonCode: 3 },
    { season: SEASON.SPRING, year: nextYear, seasonCode: 0 },
    { season: SEASON.SUMMER, year: nextYear, seasonCode: 1 },
    { season: SEASON.FALL, year: nextYear, seasonCode: 2 },
    { season: SEASON.WINTER, year: nextYear, seasonCode: 3 },
  ];
  const newSubject = await prisma.semester.createMany({
    data: upcomingSemesters,
  });
  console.log(newSubject);
  console.log("working yet?");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
