import { Semester, Prisma } from "@prisma/client";
import { Context } from "../..";
import { SEASON } from "../Semester";

interface SemesterCreateArgs {
  semester: {
    season: SEASON;
    year: number;
  };
}

interface SemesterPayloadType {
  userErrors: {
    message: string;
  }[];
  semester: Semester | null | Prisma.Prisma__SemesterClient<Semester>;
}

export const semesterResolvers = {
  semesterCreate: async (
    _: any,
    { semester }: SemesterCreateArgs,
    { prisma }: Context
  ): Promise<SemesterPayloadType> => {
    const { season, year } = semester;

    if (!season || !year) {
      return {
        userErrors: [{ message: "Season and year are required!" }],
        semester: null,
      };
    }
    console.log(season);

    let seasonCode;
    switch (season) {
      case SEASON.SPRING:
        seasonCode = 0;
        break;
      case SEASON.SUMMER:
        seasonCode = 1;
        break;
      case SEASON.FALL:
        seasonCode = 2;
        break;
      case SEASON.WINTER:
        seasonCode = 3;
        break;
      // default:
      //   return {
      //     userErrors: [{ message: "Season value invalid." }],
      //     semester: null,
      //   };
    }

    return {
      userErrors: [],
      semester: await prisma.semester.create({
        data: {
          season,
          year,
          seasonCode,
        },
      }),
    };
  },
};
