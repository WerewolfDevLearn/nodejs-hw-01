const fs = require('fs/promises');
const path = require('node:path');
const crypto = require('crypto');

const contactsPath = path.resolve('./db/contacts.json');
async function getContacts() {
  try {
    const respons = await fs.readFile(contactsPath, 'utf-8');
    const contactList = JSON.parse(respons);
    return contactList;
  } catch (error) {
    console.log(error);
  }
}

async function writeContacts(arrContacts) {
  await fs.writeFile(contactsPath, JSON.stringify(arrContacts, null, 2));
}

async function listContacts() {
  try {
    const contactList = await getContacts();
    console.table(contactList);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contactList = await getContacts();
    const contact = contactList.find(contact => contact.id === contactId);
    console.table(contact);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contactList = await getContacts();
    const isID = contactList.some(contact => contact.id === contactId);
    if (!isID) {
      console.error(`No such contact with id:${contactId}`);
      return;
    }
    const filtredContacts = contactList.filter(contact => contact.id !== contactId);
    await writeContacts(filtredContacts);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contact = { id: crypto.randomUUID(), name, email, phone };
    const contactList = await getContacts();
    contactList.push(contact);
    writeContacts(contactList);
    console.table(contactList);
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getContacts,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
