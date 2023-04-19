import { PrismaClient } from "@prisma/client";
import {
  semesterData,
  addressData,
  instructorData,
  subjectData,
} from "./seedData";
const prisma = new PrismaClient();

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

const seed = async () => {
  try {
    await prisma.semester.deleteMany();
    console.log("Deleted semester data.");

    await prisma.address.deleteMany();
    console.log("Deleted address data.");

    await prisma.instructor.deleteMany();
    console.log("Deleted instructor data.");

    await prisma.subject.deleteMany();
    console.log("Deleted subject data.");

    await prisma.$queryRaw`ALTER SEQUENCE Semester_id_seq RESTART WITH 1`;
    console.log("reset semester auto increment to 1");

    await prisma.$queryRaw`ALTER SEQUENCE Address_id_seq RESTART WITH 1`;
    console.log("reset address auto increment to 1");

    await prisma.$queryRaw`ALTER SEQUENCE Instructor_id_seq RESTART WITH 1`;
    console.log("reset instructor auto increment to 1");

    await prisma.$queryRaw`ALTER SEQUENCE Subject_id_seq RESTART WITH 1`;
    console.log("reset subject auto increment to 1");

    await prisma.semester.createMany({
      data: semesters,
    });
    console.log("Added semester data");

    await prisma.address.createMany({
      data: addresses,
    });
    console.log("Added address data");

    await prisma.instructor.createMany({
      data: instructors,
    });
    console.log("Added instructor data");

    await prisma.subject.createMany({
      data: subjects,
    });
    console.log("Added subject data");

    console.log("Seeding successful!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};
seed();
