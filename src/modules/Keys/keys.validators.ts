import { NextFunction, Request, Response } from "express";

class KeysValidator {
  constructor() {}

  public getOne(req: Request, res: Response, next: NextFunction) {
    const { key } = req.params

    if(!key || key.trim() === '') {
      return res.status(400).json({
        message: '"key" is a required parameter in url'
      })
    }

    next()
  }

  public set(req: Request, res: Response, next: NextFunction) {
    const { adm_key, role } = req.params

    if(!adm_key || adm_key.trim() === '') {
      return res.status(400).json({
        message: '"adm_key" is a required parameter in url'
      })
    }

    if(!role || role.trim() === '') {
      return res.status(400).json({
        message: '"role" is a required parameter in url'
      })
    }

    next()
  }
}

export default new KeysValidator()
