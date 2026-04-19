import express from "express";
import fs from "fs";
import path from "path";
import UserM from "../models/user";
import request from "../models/request";

export class AdminController {
  login = (req: express.Request, res: express.Response) => {
    let u = req.body.username;
    let p = req.body.password;

    UserM.findOne({ username: u, password: p, valid: true })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  getInfo = (req: express.Request, res: express.Response) => {
    let u = req.body.username;

    UserM.findOne({ username: u })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  allOwners = (req: express.Request, res: express.Response) => {
    let type = "owner";

    UserM.find({ type: type})
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  allTourists = (req: express.Request, res: express.Response) => {
    let type = "tourist";

    UserM.find({ type: type})
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  create = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let gender = req.body.gender;
    let type = req.body.type;
    let address = req.body.address;
    let contact = req.body.contact;
    let email = req.body.email;
    let card = req.body.card;
    let valid = true;

    let image = req.file ? req.file.filename : "default.jpg";

    let user = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      type: type,
      address: address,
      contact: contact,
      email: email,
      image: image,
      card: card,
      valid: valid,
    };

    new UserM(user)
      .save()
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  approve = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let gender = req.body.gender;
    let type = req.body.type;
    let address = req.body.address;
    let contact = req.body.contact;
    let email = req.body.email;
    let card = req.body.card;
    let valid = true;
    let image = req.body.image ? req.body.image : "default.jpg";

    let user = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      type: type,
      address: address,
      contact: contact,
      email: email,
      image: image,
      card: card,
      valid: valid,
    };

    new UserM(user)
      .save()
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  deny = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let gender = req.body.gender;
    let type = req.body.type;
    let address = req.body.address;
    let contact = req.body.contact;
    let email = req.body.email;
    let card = req.body.card;
    let valid = false;
    let image = req.body.image ? req.body.image : "default.jpg";

    let user = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      type: type,
      address: address,
      contact: contact,
      email: email,
      image: image,
      card: card,
      valid: valid,
    };

    new UserM(user)
      .save()
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  delete = (req: express.Request, res: express.Response) => {
    let username = req.body.username;

    UserM.deleteOne({ username: username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  deleteRqst = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    request.deleteOne({ username: username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  }

  deactivate = (req: express.Request, res: express.Response) => {
    let username = req.body.username;

    UserM.updateOne({ username: username }, { $set: { valid: false } })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  edit = (req: express.Request, res: express.Response) => {
    let updateData: any = {};

    let user = req.body.toEdit;

    if (req.body.username !== "") updateData.username = req.body.username;
    if (req.body.password !== "") updateData.password = req.body.password;
    if (req.body.firstname !== "") updateData.firstname = req.body.firstname;
    if (req.body.lastname !== "") updateData.lastname = req.body.lastname;
    if (req.body.gender !== "") updateData.gender = req.body.gender;
    if (req.body.type !== "") updateData.type = req.body.type;
    if (req.body.address !== "") updateData.address = req.body.address;
    if (req.body.contact !== "") updateData.contact = req.body.contact;
    if (req.body.email !== "") updateData.email = req.body.email;
    if (req.body.card !== "") updateData.card = req.body.card;

    if (req.file) {
      updateData.image = req.file.filename;
    }

    UserM.updateOne({ username: user }, updateData)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  rqst = (req: express.Request, res: express.Response) => {
    request
      .find()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };
}
