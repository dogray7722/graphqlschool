import { Address, Prisma } from "@prisma/client";
import { Context } from "../..";

interface AddressArgs {
  address: {
    streetNumber?: number;
    street?: string;
    unit?: number;
    city?: string;
    state?: string;
    zipCode?: number;
  };
}

interface AddressPayloadType {
  userErrors: {
    message: string;
  }[];
  address: Address | null | Prisma.Prisma__AddressClient<Address, never>;
}

export const addressResolvers = {
  addressCreate: async (
    _: any,
    { address }: AddressArgs,
    { prisma }: Context
  ): Promise<AddressPayloadType> => {
    const { streetNumber, street, unit, city, state, zipCode } = address;

    if (!streetNumber || !street || !city || !state || !zipCode) {
      return {
        userErrors: [
          {
            message:
              "Need all of street number, street, city, state, and zip code",
          },
        ],
        address: null,
      };
    }

    return {
      userErrors: [],
      address: await prisma.address.create({
        data: {
          streetNumber,
          street,
          unit,
          city,
          state,
          zipCode,
        },
      }),
    };
  },
  addressUpdate: async (
    _: any,
    {
      addressId,
      address,
    }: { addressId: string; address: AddressArgs["address"] },
    { prisma }: Context
  ): Promise<AddressPayloadType> => {
    const errors = [];

    const existingAddress = await prisma.address.findUnique({
      where: {
        id: Number(addressId),
      },
    });

    if (!existingAddress) {
      const cannotFindExisting = {
        message: "could not find address to update",
      };
      errors.push(cannotFindExisting);
    }

    if (!addressId) {
      const noIdError = {
        message: "addressId is required for update",
      };
      errors.push(noIdError);
    }

    const { streetNumber, street, unit, city, state, zipCode } = address;

    if (!streetNumber && !street && !unit && !city && !state && !zipCode) {
      const noFieldsError = {
        message: "at least one address field is required for update",
      };
      errors.push(noFieldsError);
    }

    if (errors.length) {
      return {
        userErrors: errors,
        address: null,
      };
    }

    let payloadToUpdate = {
      streetNumber,
      street,
      unit,
      city,
      state,
      zipCode,
    };

    if (!streetNumber) delete payloadToUpdate.streetNumber;
    if (!street) delete payloadToUpdate.street;
    if (!unit) delete payloadToUpdate.unit;
    if (!city) delete payloadToUpdate.city;
    if (!state) delete payloadToUpdate.state;
    if (!zipCode) delete payloadToUpdate.zipCode;

    return {
      userErrors: [],
      address: prisma.address.update({
        data: {
          ...payloadToUpdate,
        },
        where: {
          id: Number(addressId),
        },
      }),
    };
  },
};
