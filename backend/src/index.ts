import { Prisma, PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";

import { typeDefs } from "./schema";
import {
  Query,
  Mutation,
  Instructor,
  Student,
  Subject,
  Course,
  Semester,
} from "./resolvers";

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
}

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Instructor,
    Student,
    Subject,
    Course,
    Semester,
  },
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => {
  console.log("server listening at " + url);
});
