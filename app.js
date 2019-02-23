// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
//
// const url = 'mongodb://localhost:27017';
//
// const dbName = 'fruitsDB';
// const client = new MongoClient(url,{useNewUrlParser : true});
//
// client.conect(function(err){
//   assert.equal(null,err);
//   console.log("Connected successfully to server");
//
//   const db = client.db(dbName);
//
//   client.close();
// });

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB",{useNewUrlParser : true});

const fruitSchema = new mongoose.Schema ({
  name : {
    type : String,
    required :[true, "why no name"]
  },
  rating : {
    type : Number,
    min : 1,
    max : 7
  },
  review : String
});

const personSchema = new mongoose.Schema({
  name : String,
  age : Number,
  favoriteFruit : fruitSchema
})

const Fruit = mongoose.model("Fruit", fruitSchema);
const Person = mongoose.model("Person",personSchema);

const fruit = new Fruit({
  name : "Apple",
  rating : 7,
  review : "great"
});

fruit.save();

const person = new Person({
    name : "John",
    age : 22,
    favoriteFruit : banana
});

const banana = new Fruit({
  name : "banana",
  rating : 4,
  review : "siper"
});

const orange = new Fruit({
  name : "orange",
  rating : 7,
  review : "sensational"
});

Fruit.insertMany([fruit,banana,orange],(err)=>{
  if (err) {
    console.log(err);
  }else{
      console.log("success");
  }
});

Fruit.find((err,fruits)=>{
  if (err){
    console.log(err);
  }else{
    mongoose.connection.close();
    fruits.forEach((fruit)=>{
      console.log(fruit.name);
    })
  }
});

Fruit.updateOne({_id : 1}, {name: "Peach"},(err)=>{
  if (err){
    console.log(err);
  } else{
    console.log("successfully updated");
  }
});

Fruit.deleteOne({_id : 3}, (err) =>{
  if (err){
    console.log(err);
  } else{
    console.log("Delete success");
  }
});

Fruit.deleteMany({name : "Apple",rating: 7}, (err) =>{
  if (err){
    console.log(err);
  } else{
    console.log("Delete success");
  }
});
