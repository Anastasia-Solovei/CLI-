const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  try {
    const result = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(result);

    return contacts;
  } catch (error) {
    const contacts = "[]";

    return contacts;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();

    const [result] = contacts.filter((contact) => contact.id === contactId);
    return result;
  } catch (error) {
    return error.message;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();

    const result = contacts.filter((contact) => contact.id !== contactId);

    if (result.length < contacts.length) {
      await fs.writeFile(contactsPath, JSON.stringify(result));
    } else {
      const message = `Contact was not found to delete!`;
      return message;
    }
  } catch (error) {
    return error.message;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: crypto.randomUUID(), name, email, phone };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
