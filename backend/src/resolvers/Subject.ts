import { Context } from "..";

interface SubjectParentType {
  subjectId: number;
}

export const Subject = {
  courses: (parent: SubjectParentType, __: any, { prisma }: Context) => {
    return prisma.course.findMany({
      where: {
        subjectId: parent.subjectId,
      },
    });
  },
};
