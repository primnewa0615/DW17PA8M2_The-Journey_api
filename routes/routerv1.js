
const express = require("express");
const router = express.Router();
const multyParty = require('connect-multiparty');

const MultyPartyMidleWare = multyParty({ uploadDir: 'imgUpload' });

const { bookmark, getBookmark, deleteBookmark, getExistBookmark } = require("../controllers/cBookmark");
const { getUsers, deleteUsers, register, login, getUsersByemail, changeProfile } = require("../controllers/cUser");
const { getJourney, addJourney, tempFile, getJourneyByTitle, getJourneyByMonth, getJourneyById, uploadImgJourney } = require("../controllers/cJourney");

// USER
router.get("/user", getUsers);
router.get("/userByEmail", getUsersByemail);
router.delete("/user/:id", deleteUsers);
router.post("/register", register);
router.post("/login", login);
router.patch("/change-profile", MultyPartyMidleWare, changeProfile);


//Journey

router.post("/addJourney", MultyPartyMidleWare, addJourney);
router.get("/journey", getJourney);
router.get("/journey/:id", getJourneyById);
router.get("/journeyByTitle", getJourneyByTitle);
router.get("/orderByMonth/:month", getJourneyByMonth);
router.post("/tempFileImg", MultyPartyMidleWare, tempFile);
router.post("/uploadImgJourney", MultyPartyMidleWare, uploadImgJourney);

//Bookmark

router.post("/bookmark", bookmark);
router.get("/bookmark", getBookmark);
router.delete("/bookmark", deleteBookmark);
router.get("/getExistBookmark/:idUser/:idJourney", getExistBookmark);

module.exports = router;