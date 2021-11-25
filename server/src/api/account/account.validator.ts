import * as Joi from 'joi';
import { SignInModel, SignUpModel } from '../../domain/interfaces/account';

export default class AccountValidator {
  static signUpSchema: Joi.ObjectSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    avatar: Joi.string().required(),
    password: Joi.string().min(6).max(64).required()
  });

  static signInSchema: Joi.ObjectSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(64).required()
  });

  static updateOneSchema: Joi.ObjectSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    avatar: Joi.string(),
    password: Joi.string().min(6).max(64)
  });

  static signUp(model: SignUpModel): Joi.ValidationResult {
    return this.signUpSchema.validate(model);
  }

  static signIn(model: SignInModel): Joi.ValidationResult {
    return this.signInSchema.validate(model);
  }

  static updateOne(model: SignUpModel): Joi.ValidationResult {
    return this.updateOneSchema.validate(model);
  }
}
