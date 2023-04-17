import { Context } from "..";

interface CourseParentType {
  subjectId: number;
  instructorId: number;
  semesterId: number;
}

export const Course = {
  subject: (parent: CourseParentType, __: any, { prisma }: Context) => {
    return prisma.subject.findUnique({
      where: {
        id: parent.subjectId,
      },
    });
  },
  instructor: (parent: CourseParentType, __: any, { prisma }: Context) => {
    return prisma.instructor.findUnique({
      where: {
        id: parent.instructorId,
      },
    });
  },
  semester: (parent: CourseParentType, __: any, { prisma }: Context) => {
    return prisma.semester.findUnique({
      where: {
        id: parent.semesterId,
      },
    });
  },
};
