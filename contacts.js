const fs = require('fs').promises;
const path = require('path');
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, './db/contacts.json');

const listContacts = async () => {
  const dataString = await fs.readFile(contactsPath, 'utf8');
  const data = JSON.parse(dataString);
  return data;
}

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find(contact => contact.id === String(contactId));
  console.table(contact);
  return contact ? contact : null;
}

const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };  
  if(allContacts.find(newContact => name.toLowerCase() === newContact.name.toLowerCase())) {
    console.log(`${name} is already in contacts.`);
    return;
  }
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  console.table(allContacts);
  return newContact;
}

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const newContacts = allContacts.filter(contact => contact.id !== contactId);
  console.table(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return newContacts;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
}
