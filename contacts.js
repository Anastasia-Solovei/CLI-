const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "db/contacts.json");

const readContacts = async () => {
  try {
    const result = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(result);

    return contacts;
  } catch (error) {
    const contacts = "[]";

    return contacts;
  }
};

function listContacts() {
  return readContacts();
}

async function getContactById(contactId) {
  const contacts = await readContacts();

  const [result] = contacts.filter((contact) => contact.id === contactId);
  return result;
}

async function removeContact(contactId) {
  const contacts = await readContacts();

  const indexOfContactToRemove = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (indexOfContactToRemove === void 0) {
    return contactId;
  }

  if (indexOfContactToRemove && indexOfContactToRemove !== -1) {
    contacts.splice(indexOfContactToRemove, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return indexOfContactToRemove;
  }
}

async function addContact(name, email, phone) {
  const contacts = await readContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
