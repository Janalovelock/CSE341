/* jshint esversion: 8 */

const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "Contacts API",
  },
  host: "localhost:4000",
  schemes: ["http"],
};
const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

//generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
