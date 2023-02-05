import { Context } from "..";
import { STATUS } from "./Student";
import { getFutureSemesters } from "./Semester";

interface CourseFilters {
  instructorId: string;
  subjectId: string;
  semesterId: string;
}

export const Query = {
  address: (_: any, { id }: { id: string }, { prisma }: Context) => {
    return prisma.address.findUnique({
      where: {
        id: Number(id),
      },
    });
  },
  addresses: (_: any, __: any, { prisma }: Context) => {
    return prisma.address.findMany();
  },
  course: (_: any, { id }: { id: string }, { prisma }: Context) => {
    return prisma.course.findUnique({
      where: {
        id: Number(id),
      },
    });
  },
  courses: async (
    _: any,
    { filters }: { filters: CourseFilters },
    { prisma }: Context
  ) => {
    let where: any = {};

    if (filters) {
      const { instructorId, subjectId, semesterId } = filters;

      if (instructorId) where.instructorId = Number(instructorId);
      if (subjectId) where.subjectId = Number(subjectId);
      if (semesterId) where.semesterId = Number(semesterId);
    }

    return prisma.course.findMany({ where });
  },
  instructor: (_: any, { id }: { id: string }, { prisma }: Context) => {
    return prisma.instructor.findUnique({
      where: {
        id: Number(id),
      },
    });
  },
  instructors: (_: any, __: any, { prisma }: Context) => {
    return prisma.instructor.findMany();
  },
  semester: (_: any, { id }: { id: string }, { prisma }: Context) => {
    return prisma.semester.findUnique({
      where: {
        id: Number(id),
      },
    });
  },
  semesters: async (
    _: any,
    { futureOnly }: { futureOnly: Boolean },
    { prisma }: Context
  ) => {
    if (futureOnly) {
      const today = new Date();
      const thisYear = today.getFullYear();
      const month = today.getMonth();
      let futureSemesters = getFutureSemesters(month);
      return prisma.semester.findMany({
        where: {
          OR: [
            { year: { gt: thisYear } },
            { year: thisYear, season: { in: futureSemesters } },
          ],
        },
        orderBy: [
          {
            year: "asc",
          },
          {
            seasonCode: "asc",
          },
        ],
      });
    }
  },
  subject: (_: any, { id }: { id: string }, { prisma }: Context) => {
    return prisma.subject.findUnique({
      where: {
        id: Number(id),
      },
    });
  },
  subjects: (_: any, __: any, { prisma }: Context) => {
    return prisma.subject.findMany();
  },
  students: (_: any, { status }: { status: STATUS }, { prisma }: Context) => {
    if (status) {
      return prisma.student.findMany({
        where: {
          status,
        },
      });
    }
    return prisma.student.findMany();
  },
  student: (_: any, { id }: { id: string }, { prisma }: Context) => {
    return prisma.student.findUnique({
      where: {
        id: Number(id),
      },
    });
  },
};
