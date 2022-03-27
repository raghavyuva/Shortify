const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { connection } = require("../config/db.conf");
let jwt_token = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$"

module.exports = (app) => {
    app.post("/register", (req, res) => {
        if (Object.keys(req.body).length === 0) {
            res.status(500).send({
                message: "fields should not be empty"
            })
        } else {
            const { username, email, password, gender } = req.body;
            connection.query(`SELECT * FROM USER WHERE EMAIL="${email}" `, (err, rows) => {
                if (err) {
                    console.log(err);
                    return res.status(422).send({
                        message: "error creating"
                    })
                } else {
                    if (rows?.length > 0) {
                        return res.status(422).send({
                            message: "email already exists"
                        }) 
                    } else {
                        bcrypt.hash(password, 10, ((err, hash) => {
                            if (err) {
                                return res.status(422).send({
                                    message: "hash error"
                                })
                            } else { 
                                let sqlquery = `INSERT INTO USER VALUES('${email}' ,'${hash}','${username}','${gender}')`
                                connection.query(sqlquery, (err, rows, fields) => {
                                    if (err) {
                                        console.log(err);
                                        console.log(sqlquery);

                                        return res.status(422).send({
                                            message: "error inserting values "
                                        })
                                    } else {
                                        const token = jwt.sign({ email: email, id: username }, jwt_token, { expiresIn: "48d" })

                                        return res.status(200).send({
                                            message: "successfully created",
                                            user: rows,
                                            token: token
                                        })
                                    }
                                })
                            }
                        }))
                    }
                }
            })
        }
    })

    app.post('/login', (req, res, next) => {
        connection.query(`SELECT * FROM USER WHERE EMAIL="${req.body.email}"`, (err, user, fields) => {
            if (err) {
                console.log(err);
                return res.status(404).send({
                    message: "error getting info"
                })
            } else {
                if (user.length < 1) {
                    console.log(user);
                    return res.status(404).send({
                        message: "Email Does not exists"
                    })
                } else {
                    bcrypt.compare(req.body.password, user[0].PASSWORD, (err, result) => {
                        if (err) {
                            return res.status(500).send({
                                message: "Authentication Failed"
                            })
                        }
                        if (result) {
                            const token = jwt.sign(
                                { email: user[0].EMAIL, id: user[0].USERNAME },
                                jwt_token,
                                { expiresIn: "48d" }
                            )
                            // console.log('auth success', token)
                            return res.status(200).send({
                                message: "Auth successfull",
                                token: token,
                                user: user[0]
                            })
                        }
                        return res.status(500).send({
                            message: "Authentication Failed"
                        })

                    })
                }
            }
        })
    })
}

