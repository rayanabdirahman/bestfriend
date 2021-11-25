import express from 'express';
import { inject, injectable } from 'inversify';
import config from '../../config';
import { SignInModel, SignUpModel } from '../../domain/interfaces/account';
import { AccountService } from '../../services/account.service';
import TYPES from '../../types';
import ApiResponse from '../../utilities/api-response';
import logger from '../../utilities/logger';
import RandomColor from '../../utilities/random-color';
import { RegistrableController } from '../registrable.controller';
import AccountValidator from './account.validator';

@injectable()
export default class AccountController implements RegistrableController {
  private accountService: AccountService;

  constructor(@inject(TYPES.AccountService) accountService: AccountService) {
    this.accountService = accountService;
  }

  registerRoutes(app: express.Application): void {
    app.post(`${config.API_URL}/account/signup`, this.signUp);
    app.post(`${config.API_URL}/account/signin`, this.signIn);
  }

  signUp = async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    try {
      const model: SignUpModel = {
        ...req.body,
        // default user avatar
        avatar:
          req.body.name &&
          `https://eu.ui-avatars.com/api/?name=${req.body.name.split(
            ' '
          )}&background=${RandomColor.generate()}&color=fff&bold=true`
      };

      // validate request body
      const validity = AccountValidator.signUp(model);
      if (validity.error) {
        const { message } = validity.error;
        return ApiResponse.error(res, message);
      }

      const user = await this.accountService.signUp(model);

      return ApiResponse.success(res, user);
    } catch (error: any) {
      const { message } = error;
      logger.error(
        `[AccountController: signup] - Unable to sign up user: ${message}`
      );
      return ApiResponse.error(res, message);
    }
  };

  signIn = async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    try {
      const model: SignInModel = {
        ...req.body
      };

      // validate request body
      const validity = AccountValidator.signIn(model);
      if (validity.error) {
        const { message } = validity.error;
        return ApiResponse.error(res, message);
      }

      const user = await this.accountService.signIn(model);

      return ApiResponse.success(res, user);
    } catch (error: any) {
      const { message } = error;
      logger.error(
        `[AccountController: signIn] - Unable to sign in user: ${message}`
      );
      return ApiResponse.error(res, message);
    }
  };
}
