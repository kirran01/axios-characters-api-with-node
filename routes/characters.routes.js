const router = require("express").Router();
const axios = require("axios");

/* GET home page */

router.get("/characters/create", (req, res) => {
  res.render("characters/create-character.hbs");
});

router.get("/characters", (req, res, next) => {
  axios
    .get("https://ih-crud-api.herokuapp.com/characters")
    .then((responseFromAPI) => {
      // console.log(responseFromAPI)
      res.render("characters/list-characters", {
        characters: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});

router.get("/characters/:id", (req, res, next) => {
  axios
    .get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then((responseFromAPI) => {
      // console.log("details: ", responseFromAPI.data)
      res.render("characters/details-character", {
        character: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});

router.post("/characters/create", (req, res) => {
  //   if (req.body.debt === "true") {
  //     req.body.debt = true;
  //   } else {
  //     req.body.debt = false;
  //   }
  axios
    //   in this instance, req.body is already the object with appropriate key val pairs
    //   so we can just send the entire req.body into axios.post and it will insert it.
    .post("https://ih-crud-api.herokuapp.com/characters", req.body)
    .then(() => {
      res.redirect("/characters");
    })
    .catch((err) => {
      console.log(err);
    });
});



module.exports = router;

// https://ih-crud-api.herokuapp.com/characters
