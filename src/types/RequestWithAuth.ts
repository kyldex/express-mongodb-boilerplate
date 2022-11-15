import { Request } from 'express';

export default interface RequestWithAuth extends Request {
  auth?: {
    userId: string;
  };
}
