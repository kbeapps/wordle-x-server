const checkKeys = (bodyKeys: string[], requiredKeys: string[], allowedKeys?: string[]): boolean => {
    const allKeys = allowedKeys ? [...requiredKeys, ...allowedKeys] : requiredKeys;
    const hasRequiredKeys = requiredKeys.every(key => bodyKeys.includes(key)),
        allKeysValid = bodyKeys.every(key => allKeys.includes(key));

    return hasRequiredKeys && allKeysValid;
};

const checkAllowedValueTypes = (body: object): string => {
    const stringIsValid = (strToValidate: string, key: string): boolean => {
        let regex = /[]/;

        switch (key) {
            case 'email': {
                regex = /^([a-zA-Z0-9-.]+)@([a-zA-Z0-9-.]+).([a-zA-Z]{2,5})$/;
                break;
            }
            case 'password': {
                regex = /^[a-zA-Z0-9_.!@$%&(){}:;<>,?+=|-]{5,20}$/;
                break;
            }
            case '_id':
            case 'ownerId': {
                regex = /^[a-zA-Z0-9]{24,24}$/;
                break;
            }
            case 'username': {
                regex = /^[a-zA-Z0-9_.!@$%&(){}:;<>,?+=|-]{0,}$/;
                break;
            }
            default: {
                regex = /^[a-zA-Z0-9_.!@$%&(){}:;<>, ?+=|-]{0,}$/;
                break;
            }
        }
        return regex.test(strToValidate);
    },
        isValidArr = (elemType: string, val: any): string => {
            const isArray = Array.isArray(val);

            if (!isArray) {
                return `${typeof val}`;
            }

            let elemTypeIsValid: boolean = true,
                failedIdx: number = 0;
            if (isArray) {
                for (let [idx, elem] of val.entries()) {
                    if (typeof elem != elemType) {
                        failedIdx = idx;
                        elemTypeIsValid = false;
                        break;
                    }
                };
            }

            return !elemTypeIsValid ? `${typeof val[failedIdx]}[]` : '';
        };

    const createMessage = (key: string, reqValType: string, recValType: string): string => {
        return `Invalid value type for key: ${key}. Expected type: ${reqValType}. Received type: ${recValType}.`;
    };

    const numVals: string[] = ['wordSize'],
        objArrVals: string[] = ['boards'],
        strArrVals: string[] = ['players', 'wordHistory', 'members', 'games', 'friends', 'groups'],
        strVals: string[] = ['_id', 'name', 'email', 'username', 'type', 'winCondition', 'ownerId', 'theme', 'groupName', 'userId', 'message', 'password', 'avatar'];

    let res: string = '';

    Object.keys(body).forEach(key => {
        if (!res) {
            let reqType: string = '';
            const val: any = body[key as keyof typeof body],
                valType = typeof val;

            switch (true) {
                case numVals.includes(key): {
                    reqType = 'number';

                    if (valType != reqType) {
                        res = createMessage(key, reqType, valType);
                    }
                    break;
                };
                case objArrVals.includes(key): {
                    reqType = 'object[]';
                    const arrError = isValidArr('object', val);

                    if (arrError) {
                        res = createMessage(key, reqType, arrError);
                    }
                    break;
                };
                case strVals.includes(key): {
                    reqType = 'string';

                    res = valType != reqType ? createMessage(key, reqType, valType) : !stringIsValid(val, key) ? `invalid characters for key: ${key}` : res;
                    break;
                };
                case strArrVals.includes(key): {
                    reqType = 'string[]';
                    const arrError = isValidArr('string', val);

                    if (arrError) {
                        res = createMessage(key, reqType, arrError);
                    }
                    break;
                };
                default: {
                    break;
                };
            }
        }
    });

    return res;
};

const processValidation = (minMaxKeys: string, body: object, requiredKeys: string[], allowedKeys?: string[]): string | null => {
    let res: string | null = null;
    const bodyKeys: string[] = Object.keys(body),
        bodyKeysLen: number = bodyKeys.length,
        minKeys: number = Number(minMaxKeys[0]);
    if (bodyKeysLen < minKeys) {
        return `Invalid Keys Length.  Expected: ${minMaxKeys}.  Received: ${bodyKeysLen}`;
    }

    const keysChecked = allowedKeys ? checkKeys(bodyKeys, requiredKeys, allowedKeys) : checkKeys(bodyKeys, requiredKeys);

    res = keysChecked ? null
        : `checkKey Error.  Invalid keys. Required Keys: [${requiredKeys.join(', ')}] Allowed Keys: [${allowedKeys ? allowedKeys.join(', ') : null}].  minMax: ${minMaxKeys}`;

    if (!res) {
        res = checkAllowedValueTypes(body);
    }

    return res;
};

export {
    processValidation
};