const checkAllowedCharacters = () => {

};

const checkKeys = (bodyKeys: string[], requiredKeys: string[], allowedKeys?: string[]): boolean => {
    const allKeys = allowedKeys ? [...requiredKeys, ...allowedKeys] : requiredKeys;

    const hasRequiredKeys = requiredKeys.every(key => bodyKeys.includes(key));
    const allKeysValid = bodyKeys.every(key => allKeys.includes(key));

    return hasRequiredKeys && allKeysValid;
};

const checkAllowedValueTypes = (body: object) => {
    const numVals: string[] = ['wordSize'];
    const objArrVals: string[] = ['boards'];
    const strArrVals: string[] = ['players', 'wordHistory', 'members', 'games', 'friends', 'groups'];
    const strVals: string[] = ['name', 'email', 'username', 'type', 'winCondition', 'ownerId', 'theme', 'groupName', 'userId', 'message', 'password', 'avatar'];

    const createMessage = (key: string, reqValType: string, recValType: string): string => {
        return `Invalid value type for key: ${key}. Expected type: ${reqValType}. Received type: ${recValType}.`;
    };    

    Object.keys(body).forEach(key => {
        let reqType: string = '';
        const valType = typeof body[key as keyof typeof body];

        switch(true) {
            case numVals.includes(key): {
                reqType = 'number';

                if(valType != reqType) {
                    return createMessage(key, reqType, valType);
                }
            };
            case objArrVals.includes(key): {
                reqType = 'object[]';

                if(valType != reqType) {
                    return createMessage(key, reqType, valType);
                }
            };
            case strVals.includes(key): {
                reqType = 'string';

                if(valType != reqType) {
                    return createMessage(key, reqType, valType);
                }
            };
            case strArrVals.includes(key): {
                reqType = 'string[]';

                if(valType != reqType) {
                    return createMessage(key, reqType, valType);
                }
            };
            default: {
                break;
            };
        }
    });
   

};

const processValidation = (minMaxKeys: string, body: object, requiredKeys: string[], allowedKeys?: string[]): string | null => {
    let res: string | null = null;
    const bodyKeys: string[] = Object.keys(body);

    res = checkKeys(bodyKeys, requiredKeys) ? null
        : `checkKey Error.  Invalid keys. Required Keys: [${requiredKeys.join(', ')}] Allowed Keys: [${allowedKeys ? allowedKeys.join(', ') : null}].  minMax: ${minMaxKeys}`;

    return res;
};

export {
    processValidation
};