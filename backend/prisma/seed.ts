import { PrismaClient } from "@prisma/client";
import {
  semesterData,
  addressData,
  instructorData,
  subjectData,
} from "./seedData";
const prisma = new PrismaClient();

async function seed() {
  try {
    const addresses = addressData.map((address) => ({
      streetNumber: address.streetNumber,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
    }));

    const semesters = semesterData.map((semester) => ({
      season: semester.season,
      year: semester.year,
      seasonCode: semester.seasonCode,
    }));

    const instructors = instructorData.map((instructor) => ({
      firstName: instructor.firstName,
      lastName: instructor.lastName,
      addressId: instructor.addressId,
    }));

    const subjects = subjectData.map((subject) => ({
      name: subject.name,
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
      prisma.subject.createMany({
        data: subjects,
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
