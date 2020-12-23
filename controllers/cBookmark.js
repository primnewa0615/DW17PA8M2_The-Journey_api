const { journey, User, Bookmark } = require("../models");

exports.bookmark = async (req, res) => {
    try {
        // const existBookmark = await Bookmark.findAll({
        //     where: {
        //         idUser: req.body.idUser,
        //         idJourney: req.body.idJourney
        //     }
        // });

        // if (existBookmark) {
        //     return res.status(400).send({
        //         messege: "Journey ini sudah ada didaftar Bookmark"
        //     })
        // };
        const bm = await Bookmark.create(req.body);

        res.status(200).send({
            messege: "Bookmark berhasil",
            data: bm
        })
    } catch (error) {
        res.status(500).send({
            messege: error,

        })
    }
}

exports.getBookmark = async (req, res) => {
    try {
        const bm = await Bookmark.findAll({
            where: {
                idUser: req.query.idUser
            },
            include: {
                model: journey,
                as: "journey",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                }
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            }
        })

        res.status(200).send({
            messege: "response Success",
            data: bm
        })
    } catch (error) {
        res.status(400).send({

            messege: error

        })
    }
}

exports.deleteBookmark = async (req, res) => {
    try {
        const bm = await Bookmark.destroy({
            where: {
                id: req.query.id
            }
        });
        res.status(200).send({
            messege: "Bookmark berhasil dihapus",
            data: bm,
        })
    } catch (error) {
        res.status(400).send({
            messege: error
        })
    }
}

exports.getExistBookmark = async (req, res) => {
    try {
        const bm = await Bookmark.findOne({
            where: {
                idUser: req.params.idUser,
                idJourney: req.params.idJourney
            },
            include: {
                model: journey,
                as: "journey",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                }
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            }
        })

        res.status(200).send({
            messege: "response Success",
            data: bm
        })
    } catch (error) {
        res.status(400).send({

            messege: error

        })
    }
}