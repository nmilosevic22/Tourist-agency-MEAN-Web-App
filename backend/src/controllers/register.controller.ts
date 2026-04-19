import express from 'express'
import ReqModel from '../models/request'

export class RegisterController {

    createReq = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let gender = req.body.gender;
        let type = req.body.type;
        let address = req.body.address;
        let contact = req.body.contact;
        let email = req.body.email;

        const image = req.file?.filename;

        let card = req.body.card

        let rqst = {
            username : username,
            password : password,
            firstname : firstname,
            lastname : lastname,
            gender : gender,
            type : type,
            address : address,
            contact : contact,
            email : email,
            image : image,
            card : card
        }

        new ReqModel(rqst).save().then(ok=>{
            res.json({message: "ok"})
        }).catch(err=>{
            console.log(err)
            res.json({message: "fail register"})
        })
    }

}