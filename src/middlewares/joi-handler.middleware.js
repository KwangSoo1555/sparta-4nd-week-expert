import joi from 'joi';

export const signupValidation = joi.object({
  name: joi.string().min(2).max(10).required().messages({
    'string.base': 'The name must be only type of string.',
    'string.min': 'The name must have at least 2 characters.',
    'string.max': 'The name can be up to 10 characters long.',
    'string.empty': 'Be sure to enter your name.',
    'any.required': 'Be sure to enter your name',
  }),
  email: joi
    .string()
    .min(1)
    .max(100)
    .required()
    .pattern(new RegExp('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}'))
    .messages({
      'string.base': 'The email must be only type of string.',
      'string.min': 'The email must have at least 1 characters.',
      'string.max': 'The email can be up to 30 characters long.',
      'string.empty': 'Be sure to enter your email.',
      'any.required': 'Be sure to enter your email.',
    }),
  password: joi.string().min(7).max(30).required().messages({
    'string.base': 'The password must be only type of string.',
    'string.min': 'The password must have at least 7 characters.',
    'string.max': 'The password can be up to 30 characters long.',
    'string.empty': 'Be sure to enter your password.',
    'any.required': 'Be sure to enter your password.',
  }),
  passwordCheck: joi.string().min(7).max(20).required().messages({
    'string.base': 'The password for verification must be only type of string.',
    'string.min': 'The password for verification must have at least 7 characters.',
    'string.max': 'The password for verification can be up to 30 characters long.',
    'string.empty': 'Be sure to enter your password for verification.',
    'any.required': 'Be sure to enter your password for verification.',
  }),
});

export const loginValidation = joi.object({
  email: joi
    .string()
    .min(1)
    .max(100)
    .required()
    .pattern(new RegExp('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}'))
    .messages({
      'string.base': 'The email must be only type of string.',
      'string.min': 'The email must have at least 1 characters.',
      'string.max': 'The email can be up to 30 characters long.',
      'string.empty': 'Be sure to enter your email.',
      'any.required': 'Be sure to enter your email.',
    }),
  password: joi.string().min(7).max(30).required().messages({
    'string.base': 'The password must be only type of string.',
    'string.min': 'The password must have at least 7 characters.',
    'string.max': 'The password can be up to 30 characters long.',
    'string.empty': 'Be sure to enter your password.',
    'any.required': 'Be sure to enter your password.',
  }),
});

export const resumeCreateValidation = joi.object({
  title: joi.string().min(2).max(30).required().messages({
    'string.base': 'The title must be only type of string.',
    'string.min': 'The title must have at least 2 characters.',
    'string.max': 'The title can be up to 30 characters long.',
    'string.empty': 'Be sure to enter your title.',
    'any.required': 'Be sure to enter your title.',
  }),
  introduce: joi.string().min(5).max(1000).required().messages({
    'string.base': 'The introduce must be only type of string.',
    'string.min': 'The introduce must have at least 150 characters.',
    'string.max': 'The introduce can be up to 1000 characters long.',
    'string.empty': 'Be sure to enter your introduce.',
    'any.required': 'Be sure to enter your introduce.',
  }),
});

export const resumeUpdateValidation = joi.object({
  title: joi.string().min(2).max(30).optional().messages({
    'string.base': 'The title must be only type of string.',
    'string.min': 'The title must have at least 2 characters.',
    'string.max': 'The title can be up to 30 characters long.',
  }),
  introduce: joi.string().min(5).max(1000).optional().messages({
    'string.base': 'The introduce must be only type of string.',
    'string.min': 'The introduce must have at least 150 characters.',
    'string.max': 'The introduce can be up to 1000 characters long.',
  }),
});
