const checkAllowedCharacters = () => {

};

const checkKeys = (bodyKeys: string[], requiredKeys: string[], allowedKeys?: string[]): boolean => {
    const arr1ElemsAreInArr2 = (arr1: string[], arr2: string[]) => {
        return arr1.every(key => arr2.includes(key));
    };

    const allKeys = allowedKeys ? [...requiredKeys, ...allowedKeys] : requiredKeys;

    const hasRequiredKeys = arr1ElemsAreInArr2(requiredKeys, bodyKeys);
    const allKeysValid = arr1ElemsAreInArr2(bodyKeys, allKeys);

    return hasRequiredKeys && allKeysValid;
};

const checkAllowedValueTypes = () => {

};

const processValidation = (minMaxKeys: string, bodyKeys: string[], requiredKeys: string[], allowedKeys?: string[]): string | null => {
    let res: string | null = null;

    res = checkKeys(bodyKeys, requiredKeys) ? null
        : `checkKey Error.  Invalid keys. Required Keys: [${requiredKeys.join(', ')}] Allowed Keys: [${allowedKeys ? allowedKeys.join(', ') : null}].  minMax: ${minMaxKeys}`;

    return res;
};

export {
    processValidation
};