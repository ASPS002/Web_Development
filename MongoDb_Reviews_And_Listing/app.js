// const { MongoClient } = require("mongodb");

// // const assert = require('assert');
// // Replace the uri string with your connection string.
// const uri = "mongodb://localhost:27017";// run mongod in terminal to get connection to this port and then run mongo in another terminal to see various dbs you created using show dbs

// const dbName = "sample_airbnb";

// const client = new MongoClient(uri);


//CREATE

// Insert One Listing i.e One data at a time

// async function createListing(client, newListing){
//   const result = await client.db(dbName).collection("listingsAndReviews").insertOne(newListing);
//   console.log(`New listing created with the following id: ${result.insertedId}`);
//   client.close();
// }
// createListing(client,
//   {
//       name: "Lovely Loft",
//       summary: "A charming loft in Paris",
//       bedrooms: 1,
//       bathrooms: 1
//   }
// );

// Insert Many Listing i.e Many data at a time


// async function createMultipleListings(client, newListings){
//   const result = await client.db(dbName).collection("listingsAndReviews").insertMany(newListings);

//   console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
//   console.log(result.insertedIds);   
//   client.close();    
// }

// createMultipleListings(client, [
//   {
//       name: "Infinite Views",
//       summary: "Modern home with infinite views from the infinity pool",
//       property_type: "House",
//       bedrooms: 5,
//       bathrooms: 4.5,
//       beds: 5
//   },
//   {
//       name: "Private room in London",
//       property_type: "Apartment",
//       bedrooms: 1,
//       bathroom: 1
//   },
//   {
//       name: "Beautiful Beach House",
//       summary: "Enjoy relaxed beach living in this house with a private beach",
//       bedrooms: 4,
//       bathrooms: 2.5,
//       beds: 7,
//       last_review: new Date()
//   }
// ]);

// READ

// async function findOneListingByName(client, nameOfListing) {
//   const result = await client.db(dbName).collection("listingsAndReviews").findOne({ name: nameOfListing });

//   if (result) {
//       console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
//       console.log(result);
//   } else {
//       console.log(`No listings found with the name '${nameOfListing}'`);
//   }
//   client.close();
// }

// findOneListingByName(client, "Infinite Views");

//QUERY

// async function findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
//   minimumNumberOfBedrooms = 0,
//   minimumNumberOfBathrooms = 0,
//   maximumNumberOfResults = Number.MAX_SAFE_INTEGER
// } = {}) {
//   const cursor = client.db("sample_airbnb").collection("listingsAndReviews").find(
//                           {
//                               bedrooms: { $gte: minimumNumberOfBedrooms },
//                               bathrooms: { $gte: minimumNumberOfBathrooms }
//                           }
//                           ).sort({ last_review: -1 })
//                           .limit(maximumNumberOfResults);

//   const results = await cursor.toArray();

//   if (results.length > 0) {
//       console.log(`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms:`);
//       results.forEach((result, i) => {
//           date = new Date(result.last_review).toDateString();

//           console.log();
//           console.log(`${i + 1}. name: ${result.name}`);
//           console.log(`   _id: ${result._id}`);
//           console.log(`   bedrooms: ${result.bedrooms}`);
//           console.log(`   bathrooms: ${result.bathrooms}`);
//           console.log(`   most recent review date: ${new Date(result.last_review).toDateString()}`);
//       });
//   } else {
//       console.log(`No listings found with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`);
//   }
//   client.close();
// }

// findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
//   minimumNumberOfBedrooms: 4,
//   minimumNumberOfBathrooms: 2,
//   maximumNumberOfResults: 5
// });

// UPDATE 

// async function updateAllListingsToHavePropertyType(client) {
//   const result = await client.db("sample_airbnb").collection("listingsAndReviews")
//                       .updateMany({ property_type: { $exists: false } }, 
//                                   { $set: { property_type: "Unknown" } });
//   console.log(`${result.matchedCount} document(s) matched the query criteria.`);
//   console.log(`${result.modifiedCount} document(s) was/were updated.`);
//   client.close();
// }

// updateAllListingsToHavePropertyType(client);

// DELETE

// async function deleteListingByName(client, nameOfListing) {

//   const result = await client.db(dbName).collection("listingsAndReviews")
//           .deleteMany({ name: nameOfListing });
//   console.log(`${result.deletedCount} document(s) was/were deleted.`);
//   client.close();
// }

// deleteListingByName(client, "Lovely Loft");


//-----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------

//Mongoose


const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/sample_airbnb")//it will co to locannectlhost having port 27017 and then search for sample_airbnb db and if it will not find one it will create one









