import { Request, Response } from "express";
import db from "../../database/mysql";

class ContactsController {
  constructor() {}

  public get(req: Request, res: Response) {
    const { key } = req.params;

    const validRolesToWrite = ["admin", "write", "read"];

    db.query(
      "SELECT * FROM api_keys WHERE id = ?",
      [key],
      (err, result, fields) => {
        if (result.length <= 0) {
          return res.status(400).json({
            message: "This key does not exists",
          });
        }

        if (!validRolesToWrite.includes(result[0].role)) {
          return res.status(400).json({
            message: "This key have not permission to read",
          });
        }

        db.query("SELECT * FROM contacts", (err, result, fields) => {
          if (err) {
            return res.status(400).json({
              err,
            });
          }

          res.json({
            contacts: result,
          });
        });
      }
    );
  }

  public getOne(req: Request, res: Response) {
    const { id, key } = req.params;

    const validRolesToWrite = ["admin", "write", "read"];

    db.query(
      "SELECT * FROM api_keys WHERE id = ?",
      [key],
      (err, result, fields) => {
        if (result.length <= 0) {
          return res.status(400).json({
            message: "This key does not exists",
          });
        }

        if (!validRolesToWrite.includes(result[0].role)) {
          return res.status(400).json({
            message: "This key have not permission to read",
          });
        }

        db.query(
          "SELECT * FROM contacts WHERE id = ?",
          [Number(id)],
          (err, result, fields) => {
            if (err) {
              return res.status(400).json({
                err,
              });
            }

            res.json({
              contacts: result,
            });
          }
        );
      }
    );
  }

  public set(req: Request, res: Response) {
    const { name, email, message } = req.body;

    db.query(
      `INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`,
      [name, email, message],
      (err, result, fields) => {
        if (err) {
          return res.status(400).json({
            err,
          });
        }

        res.json({
          message: "Contact added with success",
          contact: {
            name,
            email,
            message,
          },
        });
      }
    );
  }

  public delete(req: Request, res: Response) {
    const { key, id } = req.params;

    const validRolesToWrite = ["admin", "write"];

    db.query(
      "SELECT * FROM api_keys WHERE id = ?",
      [key],
      (err, result, fields) => {
        if (result.length <= 0) {
          return res.status(400).json({
            message: "This key does not exists",
          });
        }

        if (!validRolesToWrite.includes(result[0].role)) {
          return res.status(400).json({
            message: "This key have not permission to write",
          });
        }

        db.query(
          "DELETE FROM contacts WHERE id = ?",
          [Number(id)],
          (err, result, fields) => {
            if (err) {
              return res.status(400).json({
                err,
              });
            }

            res.json({
              message: `The contact with id "${id}" was successfully deleted`,
            });
          }
        );
      }
    );
  }
}

export default new ContactsController();
