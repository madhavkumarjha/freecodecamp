require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let Person = require("./models/person.models");

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "John Doe",
    age: 25,
    favoriteFoods: ["Pizza", "Burger"]
  });

  person.save((err, data) => {
    if (err) return console.error(err);
    done(null, data)
  });
};


const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, function (err, person) {
    if (err) return console.error(err);
    done(null, person
    )
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, personData) {
    if (err) return console.error(err);
    done(null, personData);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, personData) {
    if (err) return console.error(err);
    done(null, personData);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, function (err, personData) {
    if (err) return console.error(err);
    done(null, personData);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, function (err, personData) {
    if (err) return console.error(err);
    personData.favoriteFoods.push(foodToAdd);
    personData.save(function (err, updatedData) {
      if (err) return console.error(err);
      done(null, updatedData);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, function (err, personData) {
    if (err) return console.error(err);
    done(null, personData);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndDelete(personId, (err, deletedPerson) => {
    if (err) {
      console.error("Error deleting person:", err);
      return done(err);
    }
    done(null, deletedPerson);
  });
};


const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({name:nameToRemove},(err,deletedPersons)=>{
    if (err) {
      console.error("Error deleting person:", err);
      return done(err);
    }
    done(null, deletedPersons);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch})
  .sort({ name: 1 })
  .limit(2)
  .select("-age")
  .exec((err, data) => {
      if (err) return done(err);
      done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
