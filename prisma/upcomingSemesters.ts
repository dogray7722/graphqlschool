import { SEASON } from "../src/resolvers";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const nextYear = currentDate.getFullYear() + 1;

export const upcomingSemesters = [
  { season: SEASON.SPRING, year: currentYear, seasonCode: 0 },
  { season: SEASON.SUMMER, year: currentYear, seasonCode: 1 },
  { season: SEASON.FALL, year: currentYear, seasonCode: 2 },
  { season: SEASON.WINTER, year: currentYear, seasonCode: 3 },
  { season: SEASON.SPRING, year: nextYear, seasonCode: 0 },
  { season: SEASON.SUMMER, year: nextYear, seasonCode: 1 },
  { season: SEASON.FALL, year: nextYear, seasonCode: 2 },
  { season: SEASON.WINTER, year: nextYear, seasonCode: 3 },
];
