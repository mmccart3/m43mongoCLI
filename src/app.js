const yargs = require("yargs");

const {client,connect} = require("./db/connection");
const Movie = require("./utils/index")

async function app(yargsinput) {
    const movieCollection = await connect();
    if (yargsinput.create) {
        console.log("Entering Create");
        const newMovie = new Movie (yargsinput.title, yargsinput.actor);
        await newMovie.create(movieCollection);
        // code to add movie put here
    } else if (yargsinput.read) {
        console.log("Entering Read");
        // code to list movies goes here
        const results = await movieCollection.find({}).toArray();
        console.table(results);

    } else if (yargsinput.update) {
        console.log("Entering update");
        const myQuery = {title: yargsinput.title};
        const myUpdate ={$set: { actor: yargsinput.actor}};
        const result = await movieCollection.updateOne(myQuery,myUpdate);
        // console.log(result);
        if (result.modifiedCount === 1) {
            console.log ("Actor update successful");
        } else {
            console.log("update unsuccessful");
        }
        // code to update movie detail goes here
    } else if (yargsinput.delete) {
        console.log("Entering Delete");
        // code to delete a movie goes here
        const myQuery = {title: yargsinput.title};
        const result = await movieCollection.deleteOne(myQuery);
        // console.log(result);
        if (result.deletedCount === 1 ) {
            console.log ("Film successfully deleted");
        } else {
            console.log ("Film not deleted");
        }
    } else {
        console.log("Command not recognised.")
    };
    await client.close();
};

app(yargs.argv);