import express from "express";
import UserM from "../models/user";
import cottage from "../models/cottage";
import reservation from "../models/reservation";
import mongoose, { Mongoose } from "mongoose";

export class OwnerController {
  getInfo = (req: express.Request, res: express.Response) => {
    let username = req.body.username;

    UserM.findOne({ username: username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  saveData = (req: express.Request, res: express.Response) => {
    const username = req.body.username;

    const toUpdate: any = {};

    for (const key in req.body) {
      if (key !== "username" && req.body[key] !== "") {
        toUpdate[key] = req.body[key];
      }
    }

    if (req.file) {
      toUpdate.image = req.file.filename;
    }

    UserM.updateOne({ username }, { $set: toUpdate })
      .then((result) => res.json(true))
      .catch((err) => {
        console.log(err);
        res.json(false);
      });
  };

  getMyCottages = (req: express.Request, res: express.Response) => {
    let username = req.body.username;

    cottage
      .find({ owner: username })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  updateCottage = (req: express.Request, res: express.Response) => {
    let { id, name, location, price } = req.body;

    let image = req.file ? req.file.filename : undefined;

    const updateQuery: any = {};

    if (name && name !== "") {
      updateQuery.$set = updateQuery.$set || {};
      updateQuery.$set.name = name;
    }

    if (location && location !== "") {
      updateQuery.$set = updateQuery.$set || {};
      updateQuery.$set.location = location;
    }

    if (price && price !== "") {
      updateQuery.$set = updateQuery.$set || {};
      updateQuery.$set.price = price;
    }

    if (image) {
      updateQuery.$push = { images: image };
    }

    cottage
      .updateOne({ _id: id }, updateQuery)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  deleteCottage = (req: express.Request, res: express.Response) => {
    let _id = req.body._id;

    cottage
      .deleteOne({ _id: _id })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  createCottage = (req: express.Request, res: express.Response) => {
    let owner = req.body.owner;
    let name = req.body.name;
    let location = req.body.location;
    let pr = req.body.price;

    let price = parseInt(pr, 10);

    let imageNames: String[] = [];

    if (req.files) {
      for (let file of req.files as Express.Multer.File[]) {
        imageNames.push(file.filename);
      }
    }

    const newCot = new cottage({
      owner: owner,
      name: name,
      location: location,
      price: price,
      images: imageNames,
    })
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  myRes = (req: express.Request, res: express.Response) => {
    let owner = req.body.owner;

    reservation
      .find({ owner: owner, pending: "waiting" })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  approveRes = (req: express.Request, res: express.Response) => {
    let _id = req.body._id;

    reservation
      .updateOne({ _id }, { $set: { pending: "approved" } })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  rejectRes = (req: express.Request, res: express.Response) => {
    let _id = req.body._id;

    reservation
      .updateOne({ _id }, { $set: { pending: "rejected" } })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };
}
