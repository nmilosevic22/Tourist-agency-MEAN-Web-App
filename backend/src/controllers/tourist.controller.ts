import express from 'express'
import UserM from '../models/user'
import CottageM from '../models/cottage';
import ReservationM from '../models/reservation';

export class TouristController {

    getInfo = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        UserM.findOne({ username: username }).then(user => {
            res.json(user);
        }).catch((err) => {
            console.log(err)
            res.json(null)
        })
    }

    saveData = (req: express.Request, res: express.Response) => {
        const username = req.body.username;

        const toUpdate: any = {};

        for (const key in req.body) {
            if (key !== 'username' && req.body[key] !== '') {
                toUpdate[key] = req.body[key];
            }
        }

        if (req.file) {
            toUpdate.image = req.file.filename;
        }

        UserM.updateOne({ username }, { $set: toUpdate })
            .then(result => res.json(true))
            .catch(err => {
                console.log(err);
                res.json(false);
            });
    }

    getCottages = (req: express.Request, res: express.Response) => {
        CottageM.find().then(cottages => {
            res.json(cottages)
        }).catch(err => {
            console.log(err);
            res.json(false);
        });
    }

    searchCottage = (req: express.Request, res: express.Response) => {
        let name = req.body.name;
        let location = req.body.location;

        if (name == "" && location == "") {
            CottageM.find().then(cottages => {
                console.log(cottages);
                res.json(cottages)
            }).catch(err => {
                console.log(err);
                res.json(false);
            });
        }

        else if (name != "" && location == "") {
            CottageM.find({ name: name }).then(cottages => {
                console.log(cottages);
                res.json(cottages)
            }).catch(err => {
                console.log(err);
                res.json(false);
            });
        }

        else if (name == "" && location != "") {
            CottageM.find({ location: location }).then(cottages => {
                console.log(cottages);
                res.json(cottages)
            }).catch(err => {
                console.log(err);
                res.json(false);
            });
        }

        else if (name != "" && location != "") {
            CottageM.find({ name: name, location: location }).then(cottages => {
                console.log(cottages);
                res.json(cottages)
            }).catch(err => {
                console.log(err);
                res.json(false);
            });
        }
    }

    getCottage = (req: express.Request, res: express.Response) => {
        let name = req.body.name;

        CottageM.findOne({ name: name }).then(cottage => {
            res.json(cottage);
        }).catch((err) => {
            console.log(err)
            res.json(null)
        })
    }

    getUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        UserM.findOne({ username: username }).then(user => {
            res.json(user);
        }).catch((err) => {
            console.log(err)
            res.json(null)
        })
    }

    createRes = (req: express.Request, res: express.Response) => {
        let data = req.body;

        new ReservationM(data).save().then(data => {
            if (data) {
                res.json(true)
            } else {
                res.json(false)
            }
        }).catch((err) => {
            console.log(err)
            res.json(null)
        })
    }

    checkRes = (req: express.Request, res: express.Response) => {
        console.log(req.body);

        let name = req.body.name;
        let startDate = new Date(req.body.start);
        let endDate = new Date(req.body.end);

        ReservationM.find({ name: name, pending : {$ne : "rejected"} }).then(reserv => {

            let check = false;

            for (let r of reserv) {
                console.log(r);
                if (r.start != null && r.end != null) {
                    if ((startDate < r.end && endDate > r.start)) {
                        check = true;
                    }
                }
            }

            console.log(check);

            res.json(check)

        }).catch((err) => {
            console.log(err)
            res.json(null)
        })
    }

    myRes = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let today = new Date();

        ReservationM.find({ tourist: username, end : {$gt : today} }).then(reserv => {
            res.json(reserv);
        }).catch((err) => {
            console.log(err)
            res.json(null)
        })
    }

}