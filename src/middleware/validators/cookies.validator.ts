import { NextFunction, Request, Response } from 'express';
import utils from '../../utils';

const validateCookies = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	if (!req.cookies._id) {
		utils.responseHandler(
			res,
			403,
			'cookies',
			undefined,
			'Invalid cookies.  Required: [ _id ]'
		);
		return;
	}
	next();
};

export { validateCookies };
