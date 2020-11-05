const request = require("request");
const fs = require("fs");

const searchBreed = process.argv[2];
const url = "https://api.thecatapi.com/v1/breeds/search?q=" + searchBreed;
const path = "./bread.json";

request(url, (error, response, body) => {
  if (error) {
    console.log("There is an error occurred: ", error);
    return;
  }
  const data = JSON.parse(body);
  if (response.statusCode === 200) {
    fs.writeFile(path, body, (err) => {
      if (err) {
        throw err;
      }

      if (!data[0]) {
        console.log("The breed you typed: " + searchBreed + " is not found!");
      } else {
        console.log(data[0].description);
      }
    });
  }
});
