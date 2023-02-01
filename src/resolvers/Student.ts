import { Context } from "..";

interface StudentParentType {
  addressId: number;
}

export enum STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive",
  ALUMNUS = "alumnus",
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
