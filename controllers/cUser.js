const { User } = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Ajv = require('ajv');
var ajv = new Ajv();

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        res.status(200).send({
            messege: "Response Success",
            data: users

        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: {
                messege: "Error",
            },
        });
    }
};

exports.getUsersByemail = async (req, res) => {
    try {

        const users = await User.findOne({
            where: { email: req.query.email },
            tributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        res.status(200).send({
            messege: "Response Success",
            data:
                users

        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: {
                messege: req.query.email,
            },
        });
    }
};

exports.deleteUsers = async (req, res,) => {
    try {


        const users = await User.destroy({
            where: {
                id: req.params.id
            },
        });

        res.status(200).send({
            messege: "data Success deleted",
            data: users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: {
                messege: "Error",
            },
        });

    }
};

exports.register = async (req, res) => {
    try {
        const { email, fullName, password, fotoProfile, phone, address } = req.body;
        const schema = {
            "properties": {
                "fullName": { "minimum": 3 },
                "email": { "format": "email" },
                "password": { "minimum": 8 },
            }
        };
        const validate = ajv.compile(schema);
        const valid = validate(req.body)
        if (valid) {
            // email is Exist?

            const findEmail = await User.findOne({
                where: {
                    email
                }
            });

            if (findEmail) {
                return res.status(400).send({
                    error: {
                        message: "email already been existed",
                    },
                });
            }
            const saltRound = 10;
            const hashPassword = await bcrypt.hash(password, saltRound);

            const user = await User.create({ email, fullName, password: hashPassword, fotoProfile, phone, address });
            const token = jwt.sign({
                id: user.id
            }, "primakk0615");

            res.status(200).send({
                messege: "Response Success",
                data: {
                    email, token
                }
            })




        } else {
            res.send({
                messege: 'Invalid: ' + ajv.errorsText(validate.errors)
            })
        }
    } catch (error) {
        res.status(500).send({
            error: {
                messege: "Response Gagal"
            }
        });

    }
}

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body
        const user = await User.findOne({
            where: {
                email
            }
        });

        if (user) {
            const checkPassword = await bcrypt.compare(password, user.password);
            if (checkPassword) {
                const token = jwt.sign({
                    id: user.id
                }, "primakk0615");

                res.status(200).send({
                    messege: "Login Berhasil",
                    data: {
                        email, token, user
                    }
                });
            } else {
                res.status(400).send({
                    error: {
                        message: "email atau password salah",
                    },
                });
            }
        } else {
            res.status(400).send({
                error: {
                    message: "email atau password salah",
                },
            });
        }
    } catch (error) {
        res.status(400).send({
            error: {
                messege: "Response gagal"
            }
        })
    }
}

exports.changeProfile = async (req, res) => {
    try {
        // const fileName = req.files.fileImage.path;
        // const arrayFileName = fileName.split("\\");
        // const imgName = arrayFileName[1];
        const users = await User.findOne({
            where: {
                id: req.query.id
            }
        })
        const user = await User.update({ fotoProfile: req.files.fileImage.path }, {
            where: {
                id: req.query.id
            }


        });
        res.status(200).send({
            messege: "Profile berhasil diganti",
            data: users
        });
    } catch (error) {
        res.status(400).send({
            error: {
                messege: error
            }
        })
    }
}