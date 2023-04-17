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

export const getFutureSemesters = (month: Number) => {
  let futureSemesters;
  switch (month) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
      futureSemesters = [
        SEASON.SPRING,
        SEASON.SUMMER,
        SEASON.FALL,
        SEASON.WINTER,
      ];
      break;
    case 5:
    case 6:
    case 7:
      futureSemesters = [SEASON.SUMMER, SEASON.FALL, SEASON.WINTER];
      break;
    case 8:
    case 9:
    case 10:
      futureSemesters = [SEASON.FALL, SEASON.WINTER];
      break;
    case 11:
      futureSemesters = [SEASON.WINTER];
      break;
  }
  return futureSemesters;
};
