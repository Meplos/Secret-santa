const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.port || 8000;
const app = express();

let people = [
  "Alexandre",
  "Celia",
  "Cloe",
  "Orane",
  "Audrey",
  "Elian",
  "Lea",
  "Nina",
  "Loena",
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("../views/index.ejs");
});

app.post("/", (req, res) => {
  console.log(req.body.santa);
  shuffle();
  const name = getNameAndRemove(req.body.santa);
  res.status(200).render("../views/gift.ejs", { name });
});

app.listen(PORT, () => console.log("App listening"));

function getNameAndRemove(name) {
  const popName = people.pop();
  console.log(name);
  console.log(people);
  if (popName.toLowerCase() === name.toLowerCase()) {
    people.push(popName);
    return getNameAndRemove(name);
  }
  return popName;
}

function shuffle() {
  let j, x, i;
  for (i = people.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = people[i];
    people[i] = people[j];
    people[j] = x;
  }
  return people;
}
