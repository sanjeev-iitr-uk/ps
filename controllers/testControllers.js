// const Post = require('../models/post');
const Person = require('../models/person');
const testHelpers = require('../helpers/testHelpers');

const { trimString } = testHelpers;

exports.insertController = (req, res) => {
  const { name, email, contact } = req.body;
  const userName = trimString(name);
  const userEmail = trimString(email);
  const userContact = trimString(contact);

  const person = new Person({
    name: userName,
    email: userEmail,
    contact: userContact,
  });
  person
    .save()
    .then(() => {
      // console.log(result);
      console.log('Record saved successfully !');
      res.status(200).send('Record saved successfully !');
    })
    .catch((err) => {
      throw err;
    });
};
