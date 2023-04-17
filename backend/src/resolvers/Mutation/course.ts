import { Course } from "@prisma/client";
import { Context } from "../..";

interface CourseCreateArgs {
  course: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    courseDays: string;
    startTime: string;
    duration: string;
    semesterId?: string;
    instructorId?: string;
    subjectId?: string;
    seats?: number;
  };
}

interface CourseUpdateArgs {
  course: {
    name?: string;
    description?: string;
    startDate?: any;
    endDate?: any;
    courseDays?: string;
    startTime?: string;
    duration?: string;
    semesterId?: any;
    instructorId?: any;
    subjectId?: any;
    seats?: number;
  };
}

interface CoursePayloadType {
  userErrors: {
    message: string;
  }[];
  course: Course | null;
}

export const courseResolvers = {
  courseCreate: async (
    _: any,
    { course }: CourseCreateArgs,
    { prisma }: Context
  ): Promise<CoursePayloadType> => {
    const {
      name,
      description,
      startDate,
      endDate,
      courseDays,
      startTime,
      duration,
      semesterId,
      instructorId,
      subjectId,
      seats,
    } = course;

    if (!name || !description || !seats) {
      return {
        userErrors: [{ message: "name, description, and seats are required." }],
        course: null,
      };
    }

    const sd = new Date(startDate);
    const ed = new Date(endDate);

    return {
      userErrors: [],
      course: await prisma.course.create({
        data: {
          name,
          description,
          startDate: sd,
          endDate: ed,
          startTime,
          courseDays,
          duration,
          semesterId: Number(semesterId),
          instructorId: Number(instructorId),
          subjectId: Number(subjectId),
          seats,
        },
      }),
    };
  },
  courseUpdate: async (
    _: any,
    {
      courseId,
      course,
    }: { courseId: string; course: CourseUpdateArgs["course"] },
    { prisma }: Context
  ): Promise<CoursePayloadType> => {
    const errors = [];

    if (!courseId) {
      const noIdError = {
        message: "course id is required for update",
      };
      errors.push(noIdError);
    }

    const {
      name,
      description,
      startDate,
      endDate,
      startTime,
      courseDays,
      duration,
      semesterId,
      instructorId,
      subjectId,
      seats,
    } = course;

    if (
      !name &&
      !description &&
      !startDate &&
      !endDate &&
      !startTime &&
      !courseDays &&
      !duration &&
      !semesterId &&
      !instructorId &&
      !subjectId &&
      !seats
    ) {
      const noFieldsError = {
        message: "at least one field is required for update",
      };
      errors.push(noFieldsError);
    }

    const existingCourse = await prisma.course.findUnique({
      where: {
        id: Number(courseId),
      },
    });

    if (!existingCourse) {
      const cantFindCourseError = {
        message: "cannot find the course to update",
      };
      errors.push(cantFindCourseError);
    }

    if (subjectId) {
      const existingSubject = await prisma.subject.findUnique({
        where: {
          id: Number(subjectId),
        },
      });

      if (!existingSubject) {
        const invalidSubjectError = {
          message: "invalid subject id",
        };
        errors.push(invalidSubjectError);
      }
    }

    if (instructorId) {
      const existingInstructor = await prisma.instructor.findUnique({
        where: {
          id: Number(instructorId),
        },
      });

      if (!existingInstructor) {
        const invalidInstructorError = {
          message: "invalid instructor id",
        };
        errors.push(invalidInstructorError);
      }
    }

    if (semesterId) {
      const existingSemester = await prisma.semester.findUnique({
        where: {
          id: Number(semesterId),
        },
      });

      if (!existingSemester) {
        const invalidSemesterError = {
          message: "invalid semester id",
        };
        errors.push(invalidSemesterError);
      }
    }

    if (errors.length) {
      return {
        userErrors: errors,
        course: null,
      };
    }

    let payloadToUpdate = {
      name,
      description,
      startDate,
      endDate,
      startTime,
      duration,
      seats,
      semesterId,
      instructorId,
      subjectId,
    };

    if (!name) delete payloadToUpdate.name;
    if (!description) delete payloadToUpdate.description;
    if (!startDate) {
      delete payloadToUpdate.startDate;
    } else {
      let sd = new Date(startDate);
      payloadToUpdate.startDate = sd;
    }
    if (!endDate) {
      delete payloadToUpdate.endDate;
    } else {
      let ed = new Date(endDate);
      payloadToUpdate.endDate = ed;
    }
    if (!startTime) delete payloadToUpdate.startTime;
    if (!seats) delete payloadToUpdate.seats;
    if (!semesterId) {
      delete payloadToUpdate.semesterId;
    } else {
      payloadToUpdate.semesterId = Number(semesterId);
    }
    if (!instructorId) {
      delete payloadToUpdate.instructorId;
    } else {
      payloadToUpdate.instructorId = Number(instructorId);
    }
    if (!subjectId) {
      delete payloadToUpdate.subjectId;
    } else {
      payloadToUpdate.subjectId = Number(subjectId);
    }

    return {
      userErrors: [],
      course: await prisma.course.update({
        data: {
          ...payloadToUpdate,
        },
        where: {
          id: Number(courseId),
        },
      }),
    };
  },
  courseDelete: async (_: any, { id }: { id: string }, { prisma }: Context) => {
    const errors = [];

    const existingCourse = await prisma.subject.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingCourse) {
      const cantFindCourseError = {
        message: "cannot find subject to delete",
      };
      errors.push(cantFindCourseError);
    }

    //unenroll any students from course
    await prisma.enrollment.deleteMany({
      where: {
        courseId: Number(id),
      },
    });

    if (errors.length) {
      return {
        userErrors: errors,
        course: null,
      };
    }

    return {
      userErrors: [],
      course: await prisma.course.delete({
        where: {
          id: Number(id),
        },
      }),
    };
  },
};
