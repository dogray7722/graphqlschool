import { Context } from "..";

interface StudentParentType {
  addressId: number;
}

export enum STATUS {
  ENROLLED = "enrolled",
  UNENROLLED = "unenrolled",
}

export const Student = {
  address: (parent: StudentParentType, __: any, { prisma }: Context) => {
    return prisma.address.findUnique({
      where: {
        id: parent.addressId,
      },
    });
  },
};
