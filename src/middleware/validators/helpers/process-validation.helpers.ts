const EMAIL_VERIFICATION_REGEX =
	/^([a-zA-Z0-9-.]+)@([a-zA-Z0-9-.]+).([a-zA-Z]{2,5})$/;
const PASSWORD_VERIFICATION_REGEX = /^[a-zA-Z0-9_.!@$%&(){}:;<>,?+=|-]{5,20}$/;
const ID_VERIFICATION_REGEX = /^[a-zA-Z0-9]{24,24}$/;
const USERNAME_VERIFICATION_REGEX = /^[a-zA-Z0-9_.-]{0,}$/;
const DEFAULT_REGEX = /^[a-zA-Z0-9_.!@$%&(){}:;<>, ?+=|-]{0,}$/;

const checkKeys = (
	bodyKeys: string[],
	requiredKeys: string[],
	allowedKeys?: string[]
): boolean => {
	const allKeys = allowedKeys
		? [...requiredKeys, ...allowedKeys]
		: requiredKeys;
	const hasRequiredKeys = requiredKeys.every((key) => bodyKeys.includes(key));
	const allKeysValid = bodyKeys.every((key) => allKeys.includes(key));

	return hasRequiredKeys && allKeysValid;
};

const checkAllowedValueTypes = (body: object): string => {
	const stringIsValid = (strToValidate: string, key: string): boolean => {
		let regex = /[]/;

		switch (key) {
			case 'email': {
				regex = EMAIL_VERIFICATION_REGEX;
				break;
			}
			case 'password': {
				regex = PASSWORD_VERIFICATION_REGEX;
				break;
			}
			case '_id':
			case 'ownerId': {
				regex = ID_VERIFICATION_REGEX;

				break;
			}
			case 'username': {
				regex = USERNAME_VERIFICATION_REGEX;
				break;
			}
			default: {
				regex = DEFAULT_REGEX;
				break;
			}
		}
		return regex.test(strToValidate);
	};

	const getArrayErrors = (
		elementType: string,
		shouldBeArray: any
	): string | undefined => {
		const isArray = Array.isArray(shouldBeArray);

		if (!isArray) {
			return `${typeof shouldBeArray}`;
		}

		let elemTypeIsValid: boolean = true;
		let failedIdx: number = 0;
		if (isArray) {
			for (const [index, element] of shouldBeArray.entries()) {
				if (typeof element !== elementType) {
					failedIdx = index;
					elemTypeIsValid = false;
					break;
				}
			}
		}

		return !elemTypeIsValid
			? `${typeof shouldBeArray[failedIdx]}[]`
			: undefined;
	};

	const createMessage = (
		key: string,
		requiredValueType: string,
		receivedValueType: string
	): string => {
		return `Invalid value type for key: ${key}. Expected type: ${requiredValueType}. Received type: ${receivedValueType}.`;
	};

	const numberTypeKeys: string[] = ['wordSize'];
	const objectArrayTypeKeys: string[] = ['boards'];
	const stringArrayTypeKeys: string[] = [
		'players',
		'wordHistory',
		'members',
		'games',
		'friends',
		'groups',
	];
	const objectIdTypeKeys: string[] = ['_id', 'gameId', 'ownerId', 'userId'];
	const stringTypeKeys: string[] = [
		'name',
		'email',
		'username',
		'type',
		'winCondition',
		'theme',
		'groupName',
		'message',
		'password',
		'avatar',
	];

	let res: string = '';

	const bodyKeys = Object.keys(body);
	let key: string = '';

	for (const [index, element] of Object.keys(bodyKeys).entries()) {
		key = bodyKeys[index];
		let reqType: string = '';

		const valueToCheck: any = body[key as keyof typeof body];
		const valueToCheckType = typeof valueToCheck;

		switch (true) {
			case numberTypeKeys.includes(key): {
				reqType = 'number';

				if (valueToCheckType !== reqType) {
					res = createMessage(key, reqType, valueToCheckType);
				}
				break;
			}
			case objectArrayTypeKeys.includes(key): {
				reqType = 'object[]';
				const arrError = getArrayErrors('object', valueToCheck);

				if (arrError) {
					res = createMessage(key, reqType, arrError);
				}
				break;
			}
			case stringArrayTypeKeys.includes(key): {
				reqType = 'string[]';
				const arrError = getArrayErrors('string', valueToCheck);

				if (arrError) {
					res = createMessage(key, reqType, arrError);
				}
				break;
			}
			case objectIdTypeKeys.includes(key): {
				res =
					valueToCheckType !== 'string'
						? createMessage(key, reqType, valueToCheckType)
						: !stringIsValid(valueToCheck, key)
						? `invalid characters for key: ${key}`
						: // 24 is length of mongoose object id
						valueToCheck.length !== 24
						? `invalid length for objectId key: ${key}`
						: res;
			}
			case stringTypeKeys.includes(key): {
				reqType = 'string';

				res =
					valueToCheckType !== reqType
						? createMessage(key, reqType, valueToCheckType)
						: !stringIsValid(valueToCheck, key)
						? `invalid characters for key: ${key}`
						: res;
				break;
			}
			default: {
				break;
			}
		}

		if (res) {
			break;
		}
	}

	return res;
};

const processValidation = (
	minMaxKeys: string,
	body: object,
	requiredKeys: string[],
	allowedKeys?: string[]
): string | null => {
	let res: string | null = null;
	const bodyKeys: string[] = Object.keys(body);
	const bodyKeysLen: number = bodyKeys.length;
	const minKeys: number = Number(minMaxKeys[0]);

	if (bodyKeysLen < minKeys) {
		return `Invalid Keys Length.  Expected: ${minMaxKeys}.  Received: ${bodyKeysLen}`;
	}

	const keysChecked = allowedKeys
		? checkKeys(bodyKeys, requiredKeys, allowedKeys)
		: checkKeys(bodyKeys, requiredKeys);

	res = keysChecked
		? null
		: `checkKey Error.  Invalid keys. Required Keys: [${requiredKeys.join(
				', '
		  )}] Allowed Keys: [${
				allowedKeys ? allowedKeys.join(', ') : null
		  }].  minMax: ${minMaxKeys}`;

	if (!res) {
		res = checkAllowedValueTypes(body);
	}

	return res;
};

export { processValidation };
