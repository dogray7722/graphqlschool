import { Instructor, Prisma } from "@prisma/client";
import { Context } from "../..";

interface InstructorArgs {
  instructor: {
    firstName?: string;
    lastName?: string;
    addressId?: number;
  };
}

interface InstructorPayloadType {
  userErrors: {
    message: string;
  }[];
  instructor: Instructor | null | Prisma.Prisma__InstructorClient<Instructor>;
}

interface AssignSubjectsArgs {
  instructorSubject: {
    instructorId: number;
    subjectIds: number[];
  };
}

interface AssignSubjectsPayloadType {
  userErrors: {
    message: string;
  }[];
  assigned: boolean;
}

export const instructorResolvers = {
  instructorCreate: async (
    _: any,
    { instructor }: InstructorArgs,
    { prisma }: Context
  ): Promise<InstructorPayloadType> => {
    const { firstName, lastName, addressId } = instructor;

    if (!firstName || !lastName || !addressId) {
      return {
        userErrors: [
          { message: "first name, last name, and address are required" },
        ],
        instructor: null,
      };
    }

    return {
      userErrors: [],
      instructor: await prisma.instructor.create({
        data: {
          firstName,
          lastName,
          addressId,
        },
      }),
    };
  },
  instructorAssignSubjects: async (
    _: any,
    { instructorSubject }: AssignSubjectsArgs,
    { prisma }: Context
  ): Promise<AssignSubjectsPayloadType> => {
    const { instructorId, subjectIds } = instructorSubject;

    if (!instructorId || !subjectIds.length) {
      return {
        userErrors: [
          { message: "instructor id and at least one subject id is required" },
        ],
        assigned: false,
      };
    }

    const res = [];

    for (let item in subjectIds) {
      let obj = {
        instructorId,
        subjectId: subjectIds[item],
      };
      res.push(obj);
    }

    await prisma.instructorSubject.createMany({
      data: res,
    });

    return {
      userErrors: [],
      assigned: true,
    };
  },
  instructorUpdate: async (
    _: any,
    {
      instructor,
      instructorId,
    }: { instructor: InstructorArgs["instructor"]; instructorId: string },
    { prisma }: Context
  ): Promise<InstructorPayloadType> => {
    const { firstName, lastName, addressId } = instructor;

    const errors = [];

    if (!instructorId) {
      const noIdError = {
        message: "id is required for instructor update",
      };
      errors.push(noIdError);
    }

    if (!firstName && !lastName && !addressId) {
      const noFieldsError = {
        message: "at least one field is required for instructor update",
      };
      errors.push(noFieldsError);
    }

    const existingInstructor = await prisma.instructor.findUnique({
      where: {
        id: Number(instructorId),
      },
    });

    if (!existingInstructor) {
      const cantFindInstructorError = {
        message: "at least one field is required for instructor update",
      };
      errors.push(cantFindInstructorError);
    }

    if (errors.length) {
      return {
        userErrors: errors,
        instructor: null,
      };
    }

    let payloadToUpdate = {
      firstName,
      lastName,
      addressId,
    };

    if (!firstName) delete payloadToUpdate.firstName;
    if (!lastName) delete payloadToUpdate.lastName;
    if (!addressId) delete payloadToUpdate.addressId;

    return {
      userErrors: [],
      instructor: await prisma.instructor.update({
        data: {
          ...payloadToUpdate,
        },
        where: {
          id: Number(instructorId),
        },
      }),
    };
  },
};
