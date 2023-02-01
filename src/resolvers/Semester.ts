import { Context } from "..";

interface SemesterParentType {
  id: number;
}

export enum SEASON {
  SPRING = "Spring",
  SUMMER = "Summer",
  FALL = "Fall",
  WINTER = "Winter",
}

export const Semester = {
  courses: (parent: SemesterParentType, __: any, { prisma }: Context) => {
    console.log(parent.id);

    return prisma.course.findMany({
      where: {
        semesterId: parent.id,
      },
    });
  },
};
