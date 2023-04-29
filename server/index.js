require("dotenv").config();
const colors = require("colors");
const express = require("express");
const schema = require("./schema/schema.js");
const { graphqlHTTP } = require("express-graphql");

const { connectDB } = require("./config/db.js");
connectDB();
const port = process.env.PORT || 5000;

const app = express();
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development" ? true : false
}))

app.listen(port, () => console.log(`server started on port ${port}`));