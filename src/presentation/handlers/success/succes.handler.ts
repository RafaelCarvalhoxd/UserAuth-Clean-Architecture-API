import { Response } from 'express';

export const handleSuccess = {
  ok: (
    res: Response,
    data: unknown,
    message: string = 'Operation successful',
  ): Response => {
    return res.status(200).json({ message, data });
  },
  created: (
    res: Response,
    data: unknown,
    message: string = 'Resource created',
  ): Response => {
    return res.status(201).json({ message, data });
  },
  noContent: (res: Response, message: string = 'No content'): Response => {
    return res.status(204).send({ message });
  },
};
