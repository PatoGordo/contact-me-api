import { Request, Response } from "express";
import db from "../../database/mysql";
import { GenerateId } from "../../utils/GenerateId";

class KeysController {
  constructor() {}

  public getOne(req: Request, res: Response) {
    const { key } = req.params;

    db.query(
      "SELECT * FROM api_keys WHERE id = ?",
      [key],
      (err, result, fields) => {
        res.json({
          key: result[0],
        });
      }
    );
  }

  public set(req: Request, res: Response) {
    const { adm_key, role } = req.params;

    const validRoles = ["admin", "write", "read"];

    db.query(
      "SELECT * FROM api_keys WHERE id = ?",
      [adm_key],
      (err, result, fields) => {
        if (result.length <= 0) {
          return res.status(400).json({
            message: "This key does not exists",
          });
        }

        if (result[0].role !== "admin") {
          return res.status(400).json({
            message: "This key have not admin permission",
          });
        }

        if (!validRoles.includes(role)) {
          return res.status(400).json({
            message: "This is not a valid role to create",
          });
        }

        const key = {
          id: GenerateId(24),
          role,
        };

        db.query(
          "INSERT INTO api_keys (id, role) VALUES (?, ?)",
          [key.id, key.role],
          (err, result, fields) => {
            if (err) {
              return res.status(400).json({
                err,
              });
            }

            return res.status(200).json({
              result: key,
            });
          }
        );
      }
    );
  }
}

export default new KeysController();
