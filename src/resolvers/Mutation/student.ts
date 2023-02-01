import { Student } from "@prisma/client";
import { Context } from "../..";
import { STATUS } from "../Student";

interface StudentArgs {
  student: {
    firstName?: string;
    lastName?: string;
    status?: STATUS;
    addressId?: number;
  };
}

interface StudentPayloadType {
  userErrors: {
    message: string;
  }[];
  student: Student | null;
}

export const studentResolvers = {
  studentCreate: async (
    _: any,
    { student }: StudentArgs,
    { prisma }: Context
  ): Promise<StudentPayloadType> => {
    const { firstName, lastName, status, addressId } = student;

    if (!firstName || !lastName || !addressId) {
      return {
        userErrors: [
          { message: "first name, last name, and address Id are required" },
        ],
        student: null,
      };
    }

    let studentStatus = status;
    if (!studentStatus) {
      studentStatus = STATUS.INACTIVE;
    }

    return {
      userErrors: [],
      student: await prisma.student.create({
        data: {
          firstName,
          lastName,
          status: studentStatus,
          addressId: Number(addressId),
        },
      }),
    };
  },
};
