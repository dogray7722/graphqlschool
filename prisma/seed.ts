import { PrismaClient } from "@prisma/client";
import { upcomingSemesters, instructorAddresses } from "./seedData";
const prisma = new PrismaClient();

async function seed() {
  try {
    const semesters = upcomingSemesters.map((semester) => ({
      season: semester.season,
      year: semester.year,
      seasonCode: semester.seasonCode,
    }));

    const addresses = instructorAddresses.map((address) => ({
      streetNumber: address.streetNumber,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
    }));

    const results = await Promise.all([
      prisma.semester.createMany({
        data: semesters,
      }),
      prisma.address.createMany({
        data: addresses,
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
