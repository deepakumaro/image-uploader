const MongoClient = require('mongodb').MongoClient;


const getImagesController = {};

const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'files_db';
let db ;

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
 
  console.log("Connected successfully to server");
   db = client.db(dbName);

});


getImagesController.getFile = async () => {

let aggregateQuery = [
  {
    $lookup : {
      from : "photos.chunks",
      localField : "_id",
      foreignField : "files_id",
      as : "chunks"
    }
  },{
    $unwind:"$chunks"
  },
  {
    $project: {
      filename:1,
      "data" : "$chunks.data"
    }
  }
];

  let images = await db.collection("photos.files").aggregate(aggregateQuery).toArray();

  // res.set("Content-Type","image/jpg");
  return images;

}
  module.exports = getImagesController;