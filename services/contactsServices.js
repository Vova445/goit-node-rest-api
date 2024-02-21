import fs from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "../db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "utf8" });
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading contacts:", error);
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    return contact || null;
  } catch (error) {
    console.error("Error contact ID:", error);
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(data);
    const removedContact = contacts.find((c) => c.id === contactId);
    const updatedContacts = contacts.filter((c) => c.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return removedContact || null;
  } catch (error) {
    console.error("Error removing contact:", error);
    return null;
  }
}

async function addContact(name, email, phone) {
  try {
      const data = await fs.readFile(contactsPath, { encoding: "utf8" });
      const contacts = JSON.parse(data);
      const newContact = { id: Date.now().toString(), name, email, phone };
      contacts.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return newContact;
  } catch (error) {
      console.error("Error adding contact:", error);
      return null;
  }
}


async function updContact(contactId, updatedData) {
    try {
      const data = await fs.readFile(contactsPath, { encoding: "utf8" });
      let contacts = JSON.parse(data);
      const index = contacts.findIndex((contact) => contact.id === contactId);
  
      if (index === -1) {
        return null;
      }
  
      const updatedContact = { ...contacts[index], ...updatedData };
      contacts[index] = updatedContact;
  
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  
      return updatedContact;
    } catch (error) {
      console.error("Error updating contact:", error);
      return null;
    }
  }
  

  export { listContacts, getContactById, removeContact, addContact, updContact };