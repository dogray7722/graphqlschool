import { SEASON } from "../src/resolvers";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const nextYear = currentDate.getFullYear() + 1;

export const semesterData = [
  { season: SEASON.SPRING, year: currentYear, seasonCode: 0 },
  { season: SEASON.SUMMER, year: currentYear, seasonCode: 1 },
  { season: SEASON.FALL, year: currentYear, seasonCode: 2 },
  { season: SEASON.WINTER, year: currentYear, seasonCode: 3 },
  { season: SEASON.SPRING, year: nextYear, seasonCode: 0 },
  { season: SEASON.SUMMER, year: nextYear, seasonCode: 1 },
  { season: SEASON.FALL, year: nextYear, seasonCode: 2 },
  { season: SEASON.WINTER, year: nextYear, seasonCode: 3 },
];

export const addressData = [
  {
    streetNumber: 1134,
    street: "W K Street",
    city: "Denver",
    state: "CO",
    zipCode: 80206,
  },
  {
    streetNumber: 2131,
    street: "N J Street",
    city: "Denver",
    state: "CO",
    zipCode: 80205,
  },
  {
    streetNumber: 4431,
    street: "E Q Street",
    city: "Denver",
    state: "CO",
    zipCode: 80202,
  },
  {
    streetNumber: 2838,
    street: "S T Street",
    city: "Denver",
    state: "CO",
    zipCode: 80208,
  },
];

export const instructorData = [
  {
    firstName: "Fancois",
    lastName: "Devereaux",
    addressId: 1,
  },
  {
    firstName: "Giuseppe",
    lastName: "Bartolo",
    addressId: 2,
  },
  {
    firstName: "Kei",
    lastName: "Watanabe",
    addressId: 3,
  },
  {
    firstName: "Diego",
    lastName: "Rodriguez",
    addressId: 4,
  },
];

export const subjectData = [
  {
    name: "Culinary Foundations",
  },
  {
    name: "Baking and Pasty",
  },
  {
    name: "Meat Fabrication",
  },
  {
    name: "Garde Manger",
  },
  {
    name: "Beverages",
  },
  {
    name: "Culinary Entrepreneurship",
  },
];
