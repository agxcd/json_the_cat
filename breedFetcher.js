const request = require("request");
const fs = require("fs");

const fetchBreedDescription = function (breedName, callback) {
  const url = "https://api.thecatapi.com/v1/breeds/search?q=" + breedName;
  request(url, (error, response, body) => {
    if (error) {
      console.log("There is an error occurred: ", error);
      return;
    }
    const data = JSON.parse(body);
    if (response.statusCode === 200) {
      if (!data[0]) {
        let noDesc = "The breed you typed: " + breedName + " is not found!";
        return callback(noDesc, null);
      } else {
        let desc = data[0].description;
        return callback(null, desc);
      }
    }
  });
};

module.exports = { fetchBreedDescription };
