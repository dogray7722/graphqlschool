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

interface EnrollStudentPayloadType {
  userErrors: {
    message: string;
  }[];
  enrollmentUpdated: boolean;
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
  studentUpdate: async (
    _: any,
    {
      studentId,
      student,
    }: { studentId: string; student: StudentArgs["student"] },
    { prisma }: Context
  ): Promise<StudentPayloadType> => {
    if (!studentId) {
      return {
        userErrors: [{ message: "student id is required for update" }],
        student: null,
      };
    }

    const { firstName, lastName, status, addressId } = student;

    if (!firstName && !lastName && !status && !addressId) {
      return {
        userErrors: [{ message: "at least one field is required for update" }],
        student: null,
      };
    }

    const existingStudent = await prisma.student.findUnique({
      where: {
        id: Number(studentId),
      },
    });
    if (!existingStudent) {
      return {
        userErrors: [{ message: "invalid student id" }],
        student: null,
      };
    }

    let payloadToUpdate = {
      firstName,
      lastName,
      status,
      addressId,
    };

    if (!firstName) delete payloadToUpdate.firstName;
    if (!lastName) delete payloadToUpdate.lastName;
    if (!addressId) delete payloadToUpdate.addressId;
    if (!status) delete payloadToUpdate.status;

    return {
      userErrors: [],
      student: await prisma.student.update({
        data: {
          ...payloadToUpdate,
        },
        where: {
          id: Number(studentId),
        },
      }),
    };
  },
  studentEnroll: async (
    _: any,
    { studentId, courseId }: { studentId: string; courseId: string },
    { prisma }: Context
  ): Promise<EnrollStudentPayloadType> =>
    handleEnrollment(studentId, courseId, { prisma }, "enroll"),

  studentUnenroll: async (
    _: any,
    { studentId, courseId }: { studentId: string; courseId: string },
    { prisma }: Context
  ): Promise<EnrollStudentPayloadType> =>
    handleEnrollment(studentId, courseId, { prisma }, "unenroll"),
};

export const handleEnrollment = async (
  studentId: string,
  courseId: string,
  { prisma }: Context,
  enrollmentAction: "enroll" | "unenroll"
): Promise<EnrollStudentPayloadType> => {
  if (!studentId || !courseId) {
    return {
      userErrors: [{ message: "student and course ids are required" }],
      enrollmentUpdated: false,
    };
  }

  const existingCourse = await prisma.course.findUnique({
    where: {
      id: Number(courseId),
    },
  });

  const existingStudent = await prisma.course.findUnique({
    where: {
      id: Number(studentId),
    },
  });

  if (!existingCourse || !existingStudent) {
    return {
      userErrors: [
        { message: "could not find existing course or existing student" },
      ],
      enrollmentUpdated: false,
    };
  }

  let payload = {
    studentId: Number(studentId),
    courseId: Number(courseId),
  };

  if (enrollmentAction === "enroll") {
    await prisma.enrollment.create({
      data: {
        ...payload,
      },
    });
  } else {
    await prisma.enrollment.deleteMany({
      where: {
        ...payload,
      },
    });
  }

  return {
    userErrors: [],
    enrollmentUpdated: true,
  };
};
