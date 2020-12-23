const { journey, User } = require("../models");
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');


exports.getJourney = async (req, res) => {
    try {
        const journies = await journey.findAll({
            include: {
                model: User,
                as: "User",
                attributes: {
                    exclude: ["updatedAt"],
                }
            },
            order: [
                ['createdAt', 'DESC']
            ],
            attributes: {
                exclude: ["updatedAt"],
            },
        });

        res.status(200).send({
            messege: "Response Success",
            data: {
                journies,
            },
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

exports.getJourneyById = async (req, res) => {
    try {
        const journies = await journey.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: User,
                as: "User",
                attributes: {
                    exclude: ["updatedAt"],
                }
            },
            order: [
                ['createdAt', 'DESC']
            ],
            attributes: {
                exclude: ["updatedAt"],
            },
        });

        res.status(200).send({
            messege: "Response Success",
            data: {
                journies,
            },
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

exports.getJourneyByMonth = async (req, res) => {
    try {
        const journies = await journey.findAll({
            where: {
                createdAt: {
                    [Op.like]: `%${req.params.month}%`,
                }
            },
            include: {
                model: User,
                as: "User",
                attributes: {
                    exclude: ["updatedAt"],
                }
            },
            order: [
                ['createdAt', 'DESC']
            ],
            attributes: {
                exclude: ["updatedAt"],
            }

        });

        res.status(200).send({
            messege: "Response Success",
            data: {
                journies,
            },
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

///////////////////////////////////////////////////////////////////////////////////////////////////

exports.getJourneyByTitle = async (req, res) => {
    try {
        const journies = await journey.findAll({
            where: {
                title: {
                    [Op.like]: `%${req.query.title}%`,
                }
            },
            include: {
                model: User,
                as: "User",
                attributes: {
                    exclude: ["updatedAt"],
                }
            },
            attributes: {
                exclude: ["updatedAt"],
            }
        });

        res.status(200).send({
            messege: "Response Success",
            data: {

                journies
            },
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

///////////////////////////////////////////////////////////////////////////////////////////////////
exports.tempFile = (req, res) => {
    var tempfile = req.files.upload
    var tempPathName = tempfile.path;

    const targetPathUrl = path.join(__dirname, "./imgUpload/" + tempfile.name);
    if (path.extname(tempfile.originalFilename).toLowerCase() === ".png" || ".jpg") {
        fs.rename(tempPathName, targetPathUrl, err => {
            res.status(200).json({
                uploaded: true,
                url: `http://localhost:5006/${tempPathName}`
            });
            if (err) return console.log(err);
        })
    }
}

exports.addJourney = async (req, res) => {
    try {
        const Journies = await journey.create(req.body);
        res.status(200).send({
            messege: "Journey berhasil ditambahkan",
            data: {
                Journies
            },
        });
    } catch (error) {
        res.status(500).send({
            error: {
                messege: error,
            },
        });
    }
}

exports.uploadImgJourney = async (req, res) => {
    try {
        const result = await journey.update({ img: req.file.img }, {
            where: {
                id: req.query.id
            }
        });

        res.status(200).send({
            messege: "Image Berhasil DiUpload"
        })
    } catch (error) {
        res.status(500).send({
            messege: error
        })
    }
}