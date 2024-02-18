import contactsService from "../services/contactsServices.js";
import {createContactSchema, updateContactSchema} from '../schemas/contactsSchemas.js'

export const getAllContacts = (req, res) => {
    try{
        const contacts = contactsService.listContacts();
        res.status(200).json(contacts);

    }
    catch(error){
        res.status(500).json({ message : error.message })
    }
};

export const getOneContact = (req, res) => {
    try {
        const contactId = req.params.id;
        const contact =contactsService.getContactById(contactId);

        if(contact){
            res.status(200).json(contact);
        }
        else{
            res.status(404).json({ message: "Not Found" })
        }
    }
    catch(error){
        res.status(500).json({ message: message.error})
    }
};

export const deleteContact = (req, res) => {
    try{
        const contactId = req.params.id;
        const deletedContact = contactsService.removeContact(contactId);

        if(deletedContact){
            res.status(200).json(deletedContact);
        }
        else{
            res.status(404).json({ message: "Not Found"})
        }
    }
    catch(error){
        res.status(500).json({message : message.error})
    }
};

export const createContact = (req, res) => {
    try{
        const {error, value} = createContactSchema.validate(req.body);

        if(error){
            res.status(400).json({message : error.message})
            return
        }
        const newContact = contactsService.addContact(value);
        res.status(201).json(newContact);
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
};

export const updateContact = (req, res) => {
    try{
        const contactId = req.params.id;
        const{error, value} = updateContactSchema.validate(req.body);

        if(error){
            res.status(400).json({message : error.message})
            return;
        }
        const updatedContact = contactsService.updateContact(contactId, value);
        if(!updatedContact){
            res.status(404).json({ message: "Not Found"})
            return;
        }
        res.status(200).json(updatedContact)
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
};
