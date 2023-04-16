import { PrismaClient } from "@prisma/client";
import {
  upcomingSemesters,
  instructorAddresses,
  instructorData,
} from "./seedData";
const prisma = new PrismaClient();

async function seed() {
  try {
    const addresses = instructorAddresses.map((address) => ({
      streetNumber: address.streetNumber,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
    }));

    const semesters = upcomingSemesters.map((semester) => ({
      season: semester.season,
      year: semester.year,
      seasonCode: semester.seasonCode,
    }));

    const instructors = instructorData.map((instructor) => ({
      firstName: instructor.firstName,
      lastName: instructor.lastName,
      addressId: instructor.addressId,
    }));

    const results = await Promise.all([
      prisma.semester.createMany({
        data: semesters,
      }),
      prisma.address.createMany({
        data: addresses,
      }),
      prisma.instructor.createMany({
        data: instructors,
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
