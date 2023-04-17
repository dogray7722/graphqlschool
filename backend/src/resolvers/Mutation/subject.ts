import { Subject } from "@prisma/client";
import { Context } from "../..";

interface SubjectArgs {
  subject: {
    name?: string;
  };
}

interface SubjectPayloadType {
  userErrors: {
    message: string;
  }[];
  subject: Subject | null;
}

export const subjectResolvers = {
  subjectCreate: async (
    _: any,
    { subject }: SubjectArgs,
    { prisma }: Context
  ): Promise<SubjectPayloadType> => {
    const { name } = subject;

    if (!name) {
      return {
        userErrors: [{ message: "Name must be provided." }],
        subject: null,
      };
    }

    return {
      userErrors: [],
      subject: await prisma.subject.create({
        data: {
          name,
        },
      }),
    };
  },
  subjectUpdate: async (
    _: any,
    { subject, subId }: { subject: SubjectArgs["subject"]; subId: string },
    { prisma }: Context
  ): Promise<SubjectPayloadType> => {
    const errors = [];

    if (!subId) {
      const noIdError = {
        message: "subject id is required for update",
      };
      errors.push(noIdError);
    }

    if (!subject.name) {
      const noFieldsError = {
        message: "subject name is required for update",
      };
      errors.push(noFieldsError);
    }

    const existingSubject = await prisma.subject.findUnique({
      where: {
        id: Number(subId),
      },
    });

    if (!existingSubject) {
      const cantFindSubjectError = {
        message: "cannot find subject to update",
      };
      errors.push(cantFindSubjectError);
    }

    if (errors.length) {
      return {
        userErrors: errors,
        subject: null,
      };
    }

    return {
      userErrors: [],
      subject: await prisma.subject.update({
        data: {
          name: subject.name,
        },
        where: {
          id: Number(subId),
        },
      }),
    };
  },
  subjectDelete: async (
    _: any,
    { subId }: { subId: string },
    { prisma }: Context
  ): Promise<SubjectPayloadType> => {
    const errors = [];

    const existingSubject = await prisma.subject.findUnique({
      where: {
        id: Number(subId),
      },
    });

    if (!existingSubject) {
      const cantFindSubjectError = {
        message: "cannot find subject to delete",
      };
      errors.push(cantFindSubjectError);
    } else {
      const existingSubjectId = existingSubject.id;
      const subjectCourses = await prisma.course.findMany({
        where: {
          subjectId: existingSubjectId,
        },
      });
      if (subjectCourses.length) {
        const coursesAttachedError = {
          message:
            "there are courses with this subject still being offered, cannot delete",
        };
        errors.push(coursesAttachedError);
      }
    }

    if (errors.length) {
      return {
        userErrors: errors,
        subject: null,
      };
    }

    await prisma.instructorSubject.deleteMany({
      where: {
        subjectId: Number(subId),
      },
    });

    return {
      userErrors: [],
      subject: await prisma.subject.delete({
        where: {
          id: Number(subId),
        },
      }),
    };
  },
};
