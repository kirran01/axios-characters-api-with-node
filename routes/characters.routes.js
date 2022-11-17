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
      res.render("characters/list-characters", {
        characters: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});

router.get("/characters/:id", (req, res, next) => {
  axios
    .get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then((axiosRes) => {
      let axiosResult = axiosRes.data;
      res.render("characters/details-character", {
        axiosResult,
      });
    })
    .catch((err) => console.error(err));
});

router.post("/characters/create", (req, res) => {
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

router.get("/characters/:id/edit-character", (req, res) => {
  axios
    .get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then((character) => {
      let thisCharacter = character.data;
      res.render("characters/edit-character.hbs", { thisCharacter });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/characters/:id/edit-character", (req, res) => {
  axios
    .put(
      `https://ih-crud-api.herokuapp.com/characters/${req.params.id}`,
      req.body
    )
    .then(() => {
      res.redirect(`/characters`);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/characters/:id/delete", (req, res) => {
  axios
    .delete(
      `https://ih-crud-api.herokuapp.com/characters/${req.params.id}`,
      req.body
    )
    .then(() => {
      res.redirect("/characters");
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;

// https://ih-crud-api.herokuapp.com/characters
