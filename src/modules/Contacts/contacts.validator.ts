import { NextFunction, Request, Response } from "express";

class ContactsValidator {
  public get(req: Request, res: Response, next: NextFunction) {
    const { key } = req.params;

    if (!key || key.trim() === "") {
      return res.status(400).json({
        message: '"key" is a required parameter in url',
      });
    }

    next();
  }

  public getOne(req: Request, res: Response, next: NextFunction) {
    const { key, id } = req.params;

    if (!key || key.trim() === "") {
      return res.status(400).json({
        message: '"key" is a required parameter in url',
      });
    }

    if (!id || id.trim() === "") {
      return res.status(400).json({
        message: '"id" is a required parameter in url',
      });
    }

    next();
  }

  public set(req: Request, res: Response, next: NextFunction) {
    const { name, email, message } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        message: '"name" is a required parameter in body',
      });
    }

    if (!email || email.trim() === "") {
      return res.status(400).json({
        message: '"email" is a required parameter in body',
      });
    }

    if (!message || message.trim() === "") {
      return res.status(400).json({
        message: '"message" is a required parameter in body',
      });
    }

    next();
  }

  public delete(req: Request, res: Response, next: NextFunction) {
    const { key, id } = req.params;

    if (!key || key.trim() === "") {
      return res.status(400).json({
        message: '"key" is a required parameter in url',
      });
    }

    if (!id || id.trim() === "") {
      return res.status(400).json({
        message: '"id" is a required parameter in url',
      });
    }

    next();
  }
}

export default new ContactsValidator();
