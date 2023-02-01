import { Context } from "..";

interface InstructorParentType {
  addressId: number;
  instructorId: number;
}

export const Instructor = {
  address: (parent: InstructorParentType, __: any, { prisma }: Context) => {
    return prisma.address.findUnique({
      where: {
        id: parent.addressId,
      },
    });
  },
  subjects: async (
    parent: InstructorParentType,
    __: any,
    { prisma }: Context
  ) => {
    const result = await prisma.instructorSubject.findMany({
      where: {
        instructorId: parent.instructorId,
      },
    });

    const subjects = [];
    for (let item in result) {
      let subject = await prisma.subject.findUnique({
        where: {
          id: result[item].subjectId,
        },
      });
      subjects.push(subject);
    }
    return subjects;
  },
  courses: (parent: InstructorParentType, __: any, { prisma }: Context) => {
    return prisma.course.findMany({
      where: {
        instructorId: parent.instructorId,
      },
    });
  },
};
