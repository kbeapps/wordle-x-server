import { Response } from 'express';

interface IPayload {
  message: string;
  data?: object;
}

const createMessage = (status: number, source: string, message?: string): string => {
  let newMessage: string = `${source}: `;

  switch (status) {
    case 200: {
      newMessage += 'Successful';
      break;
    }
    case 400: {
      newMessage += message || 'Unidentified input error';
      break;
    }
    case 500: {
      newMessage += 'Internal error';
      break;
    }
    default: {
      break;
    }
  }
  return newMessage;
};

export default (
  res: Response,
  status: number,
  source: string,
  data?: object,
  message?: string
): void => {
  let payload: IPayload = {
    message: createMessage(status, source, message),
  };

  if (data) {
    payload.data = data;
  }

  res.status(status).send(payload);
};
