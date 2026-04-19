import express from "express";
import UserM from "../models/user";
import CottageM from "../models/cottage";
import reservation from "../models/reservation";

export class UserController {
  login = (req: express.Request, res: express.Response) => {
    let u = req.body.username;
    let p = req.body.password;

    UserM.findOne({ username: u, password: p, valid: true, type : {$ne : "admin"} })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  emailCheck = (req: express.Request, res: express.Response) => {
    let e = req.body.email;

    UserM.findOne({ email: e })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  usernameCheck = (req: express.Request, res: express.Response) => {
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

  countOwners = (req: express.Request, res: express.Response) => {
    UserM.countDocuments({ type: "owner" })
      .then((count) => {
        res.json(count);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  countTourists = (req: express.Request, res: express.Response) => {
    UserM.countDocuments({ type: "tourist" })
      .then((count) => {
        res.json(count);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  countCottages = (req: express.Request, res: express.Response) => {
    CottageM.countDocuments()
      .then((count) => {
        res.json(count);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  last30 = (req: express.Request, res: express.Response) => {
    reservation.find()
      .then((allRes) => {
        let count = allRes.filter((resv) => {
          if (!resv.start || !resv.reserved) return false;

          let today = new Date();
          let startDay = new Date();
          startDay.setDate(today.getDate() - 30);

          return resv.reserved >= startDay && resv.reserved <= today;
        }).length;

        res.json(count);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  last7 = (req: express.Request, res: express.Response) => {
    reservation.find()
      .then((allRes) => {
        let count = allRes.filter((resv) => {
          if (!resv.start || !resv.reserved) return false;

          let today = new Date();
          let startDay = new Date();
          startDay.setDate(today.getDate() - 7);

          return resv.reserved >= startDay && resv.reserved <= today;
        }).length;

        res.json(count);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  lastDay = (req: express.Request, res: express.Response) => {
    reservation.find()
      .then((allRes) => {
        let count = allRes.filter((resv) => {
          if (!resv.start || !resv.reserved) return false;

          let today = new Date();
          let startDay = new Date();
          startDay.setDate(today.getDate() - 1);

          return resv.reserved >= startDay && resv.reserved <= today;
        }).length;

        res.json(count);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  searchCottage = (req: express.Request, res: express.Response) => {
    let nameSearch = req.body.name;
    let locationSearch = req.body.location;

    if (nameSearch != "" && locationSearch == "") {
      CottageM.find({ name: nameSearch })
        .then((cottages) => {
          res.json(cottages);
        })
        .catch((err) => {
          console.log(err);
          res.json(null);
        });
    } else if (nameSearch == "" && locationSearch != "") {
      CottageM.find({ location: locationSearch })
        .then((cottages) => {
          res.json(cottages);
        })
        .catch((err) => {
          console.log(err);
          res.json(null);
        });
    } else if (nameSearch != "" && locationSearch != "") {
      CottageM.find({ name: nameSearch, location: locationSearch })
        .then((cottages) => {
          res.json(cottages);
        })
        .catch((err) => {
          console.log(err);
          res.json(null);
        });
    } else {
      CottageM.find()
        .then((cottages) => {
          res.json(cottages);
        })
        .catch((err) => {
          console.log(err);
          res.json(null);
        });
    }
  };

  checkOldPass = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    let password = req.body.password;

    UserM.findOne({ username: username, password: password })
      .then((user) => {
        console.log("Found user:", user);
        if (user) {
          return res.json(true);
        } else {
          return res.json(false);
        }
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  changePass = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    let password = req.body.password;

    UserM.updateOne({ username: username }, { $set: { password: password } })
      .then((result) => {
        if (result.matchedCount === 0) {
          res.json(true);
        } else {
          res.json(true);
        }
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  allCottages = (req: express.Request, res: express.Response) => {
    CottageM.find()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  allOwners = (req: express.Request, res: express.Response) => {
    let type = 'owner'

    UserM.find({type : type})
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };

  allTourists = (req: express.Request, res: express.Response) => {
    let type = 'tourist'

    UserM.find({type : type})
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json(null);
      });
  };
}
