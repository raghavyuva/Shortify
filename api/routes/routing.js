const multer = require('multer');
const path = require("path");
const { connection } = require("../config/db.conf");
let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads/')),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

let upload = multer({ storage, limits: { fileSize: 1048576 * 10 } })

module.exports = (app) => {
    app.post("/article", upload.single("myfile"), (req, res) => {
        console.log(req.body);
        if (Object.keys(req.body).length === 0) {
            return res.status(500).send({
                message: "fields should not be empty"
            })
        } else {
            const { publishedBy, title, content, } = req.body;
            var created_at = new Date().toISOString().slice(0, 10);
            console.log(created_at);
            let a_ID = Math.random().toString(36).replace('0.', "shortify" || '');
            try {
                let fileName = req.file.path.substring(req.file.path.lastIndexOf("/") + 1);
                connection.query(`INSERT INTO ARTICLE VALUES('${fileName}','${publishedBy}','${title}',"${content}",'${a_ID}','${created_at}')`, (err, rows, fields) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({
                            message: "error in inserting"
                        })
                    } else {
                        console.log(rows);
                        if (rows) {
                            return res.status(200).send({
                                message: "successfully uploaded article",
                                article: rows
                            })
                        }
                    }
                })
            } catch (error) {
                console.log(error);
                return res.status(500).send({
                    message: "error in executing query for you"
                })
            }
        }
    })


    app.get("/article", (req, res) => {
        try {
            connection.query(`SELECT * FROM ARTICLE`, (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({
                        message: "error getting value"
                    })
                } else {
                    if (rows) {
                        return res.status(200).send({
                            message: "Articles are",
                            articles: rows
                        })
                    }
                }
            })
        } catch (error) {
            return res.status(500).send({
                message: "error getting articles"
            })
        }
    })


    app.put("/article", (req, res) => {
        try {
            if (Object.keys(req.body).length === 0) {
                return res.status(500).send({
                    message: "fields should not be empty"
                })
            } else {
                const { title, content, a_ID } = req.body
                connection.query(`UPDATE  ARTICLE SET  title='${title}',content="${content}" WHERE a_ID="${a_ID}" `, (err, rows, fields) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({
                            message: "error updating article"
                        })
                    } else {
                        if (rows) {
                            return res.status(200).send({
                                message: "Article updated",
                                articles: rows
                            })
                        }
                    }
                })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "error updating article"
            })
        }
    })


    app.delete("/article", (req, res) => {
        try {
            console.log(req.body)
            if (Object.keys(req.body).length === 0) {
                return res.status(500).send({
                    message: "fields should not be empty"
                })
            } else {
                const { a_ID } = req.body;
                console.log(a_ID)
                connection.query(`DELETE FROM ARTICLE WHERE a_ID='${a_ID}'`, (err, rows, fields) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({
                            message: "error DELETING article"
                        })
                    } else {
                        return res.status(200).send({
                            message: "Article deleted",
                            articles: rows
                        })
                    }
                })
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "error deleting article"
            })
        }
    })


    app.get("/article/:id/comment", (req, res) => {
        try {
            connection.query(`SELECT * FROM COMMENT WHERE a_ID='${req.params.id}'`, (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({
                        message: "error getting value"
                    })
                } else {
                    if (rows) {
                        return res.status(200).send({
                            message: "Comments  are",
                            comments: rows
                        })
                    }
                }
            })
        } catch (error) {
            return res.status(500).send({
                message: "error getting articles"
            })
        }
    })


    app.post("/article/:id/comment", (req, res) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(500).send({
                message: "fields should not be empty"
            })
        } else {
            const { publishedBy, comment } = req.body;
            const a_ID = req.params.id
            try {
                connection.query(`INSERT INTO COMMENT VALUES('${publishedBy}','${comment}','${a_ID}')`, (err, rows, fields) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({
                            message: "error in inserting"
                        })
                    } else {
                        console.log(rows);
                        if (rows) {
                            return res.status(200).send({
                                message: "successfully commented",
                                article: rows
                            })
                        }
                    }
                })
            } catch (error) {
                console.log(error);
                return res.status(500).send({
                    message: "error in executing query for you"
                })
            }
        }
    })


    app.post("/article/:id/like", (req, res) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(500).send({
                message: "fields should not be empty"
            })
        } else {
            const { likedBy } = req.body;
            const a_ID = req.params.id
            try {
                connection.query(`INSERT INTO LIKES VALUES('${likedBy}','${a_ID}')`, (err, rows, fields) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({
                            message: "error in inserting"
                        })
                    } else {
                        console.log(rows);
                        if (rows) {
                            return res.status(200).send({
                                message: "successfully liked",
                                likes: rows
                            })
                        }
                    }
                })
            } catch (error) {
                console.log(error);
                return res.status(500).send({
                    message: "error in executing query for you"
                })
            }
        }
    })


    app.get("/article/:id/likes", (req, res) => {
        try {
            connection.query(`SELECT * FROM LIKES WHERE a_ID='${req.params.id}'`, (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({
                        message: "error getting value"
                    })
                } else {
                    if (rows) {
                        return res.status(200).send({
                            message: "likes  are",
                            likes: rows
                        })
                    }
                }
            })
        } catch (error) {
            return res.status(500).send({
                message: "error getting likes for the article"
            })
        }
    })

    app.delete("/article/:id/like", (req, res) => {
        try {
            if (Object.keys(req.body).length === 0) {
                return res.status(500).send({
                    message: "fields should not be empty"
                })
            } else {
                const { likedBy } = req.body;
                const a_ID = req.params.id
                connection.query(`DELETE FROM LIKES WHERE a_ID='${a_ID}' and likedBy='${likedBy}' `, (err, rows, fields) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({
                            message: "error DELETING like"
                        })
                    } else {
                        console.log("deleted")
                        return res.status(200).send({
                            message: "like deleted",
                            articles: rows
                        })
                    }
                })
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "error deleting like"
            })
        }
    })



    app.post("/contact", (req, res) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(500).send({
                message: "fields should not be empty"
            })
        } else {
            const { EMAIL, FullName, message } = req.body;
            const a_ID = req.params.id
            try {
                connection.query(`INSERT INTO CONTACT VALUES('${EMAIL}','${FullName}','${message}')`, (err, rows, fields) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({
                            message: "error in inserting"
                        })
                    } else {
                        console.log(rows);
                        if (rows) {
                            return res.status(200).send({
                                message: "successfully SENT MESSAGE",
                                message: rows
                            })
                        }
                    }
                })
            } catch (error) {
                console.log(error);
                return res.status(500).send({
                    message: "error in executing query for you"
                })
            }
        }
    })
}

