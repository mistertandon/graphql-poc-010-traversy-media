require("dotenv").config();
const express = require("express");
const schema = require("./schema/schema.js");
const port = process.env.PORT || 5000;
const { graphqlHTTP } = require("express-graphql");

const app = express();
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development"?true:false
}))

app.listen(port, () => console.log(`server started on port ${port}`));