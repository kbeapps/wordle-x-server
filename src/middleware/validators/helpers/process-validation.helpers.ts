const EMAIL_VERIFICATION_REGEX = /^([a-zA-Z0-9-.]+)@([a-zA-Z0-9-.]+).([a-zA-Z]{2,5})$/;
const PASSWORD_VERIFICATION_REGEX = /^[a-zA-Z0-9_.!@$%&(){}:;<>,?+=|-]{5,20}$/;
const ID_VERIFICATION_REGEX = /^[a-zA-Z0-9]{24,24}$/;
const USERNAME_VERIFICATION_REGEX = /^[a-zA-Z0-9_.!@$%&(){}:;<>,?+=|-]{0,}$/;
const DEFAULT_REGEX = /^[a-zA-Z0-9_.!@$%&(){}:;<>, ?+=|-]{0,}$/;

const checkKeys = (bodyKeys: string[], requiredKeys: string[], allowedKeys?: string[]): boolean => {
  const allKeys = allowedKeys ? [...requiredKeys, ...allowedKeys] : requiredKeys;
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

  const getArrayErrors = (elementType: string, value: any): string | undefined => {
    const isArray = Array.isArray(value);

    if (!isArray) {
      return `${typeof value}`;
    }

    let elemTypeIsValid: boolean = true;
    let failedIdx: number = 0;
    if (isArray) {
      for (const [index, element] of value.entries()) {
        if (typeof element != elementType) {
          failedIdx = index;
          elemTypeIsValid = false;
          break;
        }
      }
    }

    return !elemTypeIsValid ? `${typeof value[failedIdx]}[]` : undefined;
  };

  const createMessage = (key: string, reqValType: string, recValType: string): string => {
    return `Invalid value type for key: ${key}. Expected type: ${reqValType}. Received type: ${recValType}.`;
  };

  const numVals: string[] = ['wordSize'];
  const objArrVals: string[] = ['boards'];
  const strArrVals: string[] = ['players', 'wordHistory', 'members', 'games', 'friends', 'groups'];
  const strVals: string[] = [
    '_id',
    'name',
    'email',
    'username',
    'type',
    'winCondition',
    'ownerId',
    'theme',
    'groupName',
    'userId',
    'message',
    'password',
    'avatar',
  ];

  let res: string = '';

  // TODO: Replace .foreach with for of
  Object.keys(body).forEach((key) => {
    if (!res) {
      let reqType: string = '';
      const val: any = body[key as keyof typeof body];
      const valType = typeof val;

      switch (true) {
        case numVals.includes(key): {
          reqType = 'number';

          if (valType != reqType) {
            res = createMessage(key, reqType, valType);
          }
          break;
        }
        case objArrVals.includes(key): {
          reqType = 'object[]';
          const arrError = getArrayErrors('object', val);

          if (arrError) {
            res = createMessage(key, reqType, arrError);
          }
          break;
        }
        case strVals.includes(key): {
          reqType = 'string';

          res =
            valType != reqType
              ? createMessage(key, reqType, valType)
              : !stringIsValid(val, key)
              ? `invalid characters for key: ${key}`
              : res;
          break;
        }
        case strArrVals.includes(key): {
          reqType = 'string[]';
          const arrError = getArrayErrors('string', val);

          if (arrError) {
            res = createMessage(key, reqType, arrError);
          }
          break;
        }
        default: {
          break;
        }
      }
    }
  });

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
    : `checkKey Error.  Invalid keys. Required Keys: [${requiredKeys.join(', ')}] Allowed Keys: [${
        allowedKeys ? allowedKeys.join(', ') : null
      }].  minMax: ${minMaxKeys}`;

  if (!res) {
    res = checkAllowedValueTypes(body);
  }

  return res;
};

export { processValidation };