import { Context } from "..";
import { STATUS } from "./Student";
import { SEASON } from "./Semester";

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
  courses: (_: any, __: any, { prisma }: Context) => {
    return prisma.course.findMany();
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
  semesters: (
    _: any,
    { futureOnly }: { futureOnly: Boolean },
    { prisma }: Context
  ) => {
    if (futureOnly) {
      const today = new Date();
      const thisYear = today.getFullYear();
      const month = today.getMonth();
      switch (month) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
          return prisma.semester.findMany({
            where: {
              year: { gte: thisYear },
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
        case 5:
        case 6:
        case 7:
          return prisma.semester.findMany({
            where: {
              OR: [
                { year: { gt: thisYear } },

                { season: SEASON.SUMMER || SEASON.FALL || SEASON.WINTER } && {
                  year: thisYear,
                },
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
        case 8:
        case 9:
        case 10:
          return prisma.semester.findMany({
            where: {
              OR: [
                { year: { gt: thisYear } },

                { season: SEASON.FALL || SEASON.WINTER } && { year: thisYear },
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
        case 11:
          return prisma.semester.findMany({
            where: {
              OR: [
                { year: { gt: thisYear } },

                { season: SEASON.WINTER } && { year: thisYear },
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
    }
    return prisma.semester.findMany({
      orderBy: [
        {
          year: "asc",
        },
        {
          seasonCode: "asc",
        },
      ],
    });
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
