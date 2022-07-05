import { NextFunction, Request, Response } from 'express';
import utils from '../../utils';
import { processValidation } from './helpers/process-validation.helpers';

const signup = (req: Request, res: Response, next: NextFunction): void => {
	const requiredKeys: string[] = ['email', 'password', 'username'];
	const minMaxKeys: string = '3/3';
	const validationError = processValidation(minMaxKeys, req.body, requiredKeys);

	if (validationError) {
		utils.responseHandler(res, 400, 'signup', undefined, validationError);
		return;
	}

	next();
};

const signin = (req: Request, res: Response, next: NextFunction): void => {
	const requiredKeys: string[] = ['password'];
	const allowedKeys: string[] = ['email', 'username'];
	const minMaxKeys: string = '2/3';
	const validationError = processValidation(
		minMaxKeys,
		req.body,
		requiredKeys,
		allowedKeys
	);

	if (validationError) {
		utils.responseHandler(res, 400, 'signin', undefined, validationError);
		return;
	}

	next();
};

export { signup, signin };
