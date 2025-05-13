import Joi from 'joi';
import { brands, categories } from '../models/Products.js';
import validate from 'express-joi-validation';

export const validates = validate.createValidator({});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(16).required(),
});

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(16).required(),
});

export const productValSchema = Joi.object({
  title: Joi.string().min(10).required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  rating: Joi.number(),
  category: Joi.string()
    .valid(...categories)
    .required(),
  brand: Joi.string()
    .valid(...brands)
    .required(),
}).unknown(true);
