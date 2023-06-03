// const { MongoClient } = require("mongodb");
const assert = require('assert');
// we're importing the assert function from the Node.js assert module and assigning it to a variable called assert.
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

mongoose.connect("mongodb://localhost:27017/sample_airbnb")//it will connect to local host having port 27017 and then search for sample_airbnb db and if it will not find one it will create one
 


// Inserting
const listingSchema = new mongoose.Schema({
  
    name:String,
    summary:String,
    propertyType:String,
    bedrooms:Number,
    bathrooms:Number,
    beds:Number,
    lastReview: Date

});

const Listing = mongoose.model("Listing", listingSchema); // First create Listing model using ListingSchema

const listing_1 = new Listing({      // Create new listing object
    name: "Beautiful Beach House",
    summary: "Enjoy relaxed beach living in this house with a private beach",
    propertyType:"Beach House",
    bedrooms: 4,
    bathrooms: 2.5,
    beds: 7,
    lastReview: new Date()
});

//listing_1.save();

const breakfastSchema =  mongoose.Schema({
    eggs: {
      type: Number,
      min: [1, 'Too few eggs'],
      max: 6
    },
    bacon: {
      type: Number,
    //   required: [true, 'Why no bacon?']
    },
    drink: {
      type: String,
    //   enum: ['Coffee', 'Tea'],
      required: function() {
        return this.bacon > 3;
      }
    }
  });
  const Breakfast = mongoose.model('Breakfast', breakfastSchema);

const personSchema = new mongoose.Schema({
    name:String,
    age:Number,
    favouriteBreakfast:breakfastSchema

});

const Person = mongoose.model("Person",personSchema)

const person_1 = new Person({
    name:"John",
    age:21
})

// person_1.save();

const person_2 = new Person({
    name:"Peter",
    age:38
})
const person_3 = new Person({
    name:"Tom",
    age:13
})

// This has become deprecated now, Model.insertMany() no longer accepts a callback

// Person.insertMany([person_2, person_3],function(err){
// // function(err) passed to check if there is any error pushing the data to Person model
//     if(err){
//         console.log(err);
//     } else {
//        console.log("successful");
//     }
// });

//New syntax

// Person.insertMany([person_2, person_3])
//   .then((result) => {
//     console.log(result); // array of inserted documents
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// Reading
// Find all person : MyModel.find({});

// Person.find({Person}).then((result)=>{
//   console.log(result);
// }).catch((error)=>{
//     console.error(error);
// });


// find all documents named Peter and at least 18 years of age
// console.log("Querying for Peter with age >= 18");

// Person.find({ name: "Peter", age: { $gte: 18 } }).then((result)=>{
//   console.log(result);
// }).catch((error)=>{
//   console.error(error);
// });
  
//Looping over Person

// Person.find({Person}).then((result)=>{// arrow function
//   //console.log(result);
    
//      result.forEach(function(item){
//         console.log(item.name);
//   });
//   mongoose.connection.close();
// }).catch((error)=>{
//     console.error(error);
// });

// DATA VALIDATION USING MONGOOSE
  
  const badBreakfast = new Breakfast({
    eggs: 2,
    bacon: 0,
    drink: 'Milk'
  });

//   badBreakfast.save();
  
  let error = badBreakfast.validateSync();
//   assert.equal(error.errors['drink'].message,
//     '`Milk` is not a valid enum value for path `drink`.');
  
  badBreakfast.eggs = 7;

  badBreakfast.bacon = 1;
  error = badBreakfast.validateSync();
  //assert.equal(error.errors['bacon'].message, 'Why no bacon?');

  badBreakfast.drink = null;

  
  error = badBreakfast.validateSync();
//   console.log(error);
  //assert.equal(error.errors['drink'].message, 'Path `drink` is required.');
  
  
// UPDATING AND DELETING DATA WITH MONGOOSE

// UPDATING

// Breakfast.updateOne({_id:"645bbcdad107e2eff527349b"},{drink:"Milk"}).then((result)=>{// first parameter is for identifying the object and second one is being updated

//     console.log(result);
//   }).catch((error)=>{
//     console.error(error);
// });

//DELETING

// Breakfast.deleteOne({_id:"645bbcdad107e2eff527349b"}).then((result)=>{// first parameter is for identifying the object and second one is being updated

//     console.log(result);
//   }).catch((error)=>{
//     console.error(error);
// });


// ESTABLISHING RELATIONSHIPS AND EMBEDDING DOCUMENTS USING MONGOOSE

// const goodBreakfast = new Breakfast({
//     eggs: 2,
//     bacon: 0,
//     drink: 'Milk'
//   });

// goodBreakfast.save();

// const person_4 = new Person({
//     name:"Ujjwal",
//     age:21,
//     favouriteBreakfast:goodBreakfast// embedded one model into another
// });

// person_4.save();






