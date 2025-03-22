// validation.middleware.ts
import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";
import * as yup from "yup";

export const validateRequestBody = (schema: AnySchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      res.status(400).json({
        success: false,
        error: "Validation Error",
        details:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    }
  };
};

export const createCustomerSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  type: yup.string().oneOf(["personal", "business"]).required(),
  businessName: yup.string().when("type", {
    is: (value: string) => value === "business",
    then: (schema) =>
      schema.required("Business name is required for business accounts"),
  }),
  address: yup
    .object()
    .shape({
      address1: yup.string().required(),
      city: yup.string().required(),
      state: yup.string().min(2).required(),
      postalCode: yup.string().required(),
      country: yup.string().min(2).required(),
    })
    .required(),
});

export const addFundingSourceSchema = yup.object().shape({
  dwollaCustomerId: yup.string().required(),
  processorToken: yup.string().required(),
  bankName: yup.string().required(),
});

export const createTransferSchema = yup.object().shape({
  sourceFundingSourceUrl: yup.string().required(),
  destinationFundingSourceUrl: yup.string().required(),
  amount: yup.number().positive().required(),
});
