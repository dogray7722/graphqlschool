import { subjectResolvers } from "./subject";
import { courseResolvers } from "./course";
import { addressResolvers } from "./address";
import { instructorResolvers } from "./instructor";
import { semesterResolvers } from "./semester";
import { studentResolvers } from "./student";

export const Mutation = {
  ...subjectResolvers,
  ...courseResolvers,
  ...addressResolvers,
  ...instructorResolvers,
  ...semesterResolvers,
  ...studentResolvers,
};
