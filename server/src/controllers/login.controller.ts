import { findByNameAndPassword, findByName, registerUser } from '../database/db.service';
import { sign, verify } from 'jsonwebtoken';
const config = require('../../config.json');

export async function login(req: any, res: any) {
    const email = req.body.email;
    const password = req.body.password;
    console.log(`Try to login with email: ${email} and password: ${password};`);
    const user = await findByNameAndPassword(email, password);
    if (!user) {
        res.send({
            error: "Wrong user data"
        });
    } else {
        const jwtToken = sign({email: email}, config.secret);
        res.send({token: jwtToken});
    }
}


export async function registration(req: any, res: any) {
    const email = req.body.email;
    const password = req.body.password;
    console.log(`Try to registrate user with email: ${email} and password: ${password};`);
    const user = await findByName(email);
    if (!user) {
        await registerUser({
            email: email,
            password: password
        });
        res.sendStatus(200);
    } else {
        res.send({error: 'There is already user with such email'});
    }
}