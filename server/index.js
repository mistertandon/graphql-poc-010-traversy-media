require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 5000;
const { graphqlHTTP } = require("express-graphql");

const app = express();
// app.use('/graphql', graphqlHTTP({}))

app.listen(port, () => console.log(`server started on port ${port}`));