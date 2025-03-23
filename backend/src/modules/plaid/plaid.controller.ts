import { NextFunction, Request, Response } from "express";
import { plaidService } from "./plaid.service";
import { parseStringify } from "../../common/utils/utils";
import { HTTPSTATUS } from "../../config/http.config";
import { createBankAccountProps } from "../../types";

class PlaidController {
  async createPlaidLink(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { userId } = req.params;

    try {
      const token = await plaidService.createPlaidLink(userId);

      const result = parseStringify({ linkToken: token?.data.link_token });

      res.status(HTTPSTATUS.CREATED).json({
        message: "Plaid Link created.",
        result: result.linkToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async exchangePublicToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { userId } = req.params;
    const { publicToken } = req.body;

    try {
      console.log("inside exchange Public token controller");
      await plaidService.exchangePublicToken(publicToken, userId);

      res.status(HTTPSTATUS.OK).json({
        message: "Operation complete.",
      });
    } catch (error) {
      next(error);
    }
  }
}

export const plaidController = new PlaidController();
