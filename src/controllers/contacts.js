import * as contactServices from '../services/contacts.js';

import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res) => {
  const data = await contactServices.getAllContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts with DB',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const data = await contactServices.getContactById(contactId);

  if (!data) {
    throw createHttpError(404, 'Contact not found');

    // return res.status(404).json({
    //   message: 'Contact not found',
    // });
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const data = await contactServices.addContact(req.body);
  res.status(201).json({
    status: '201',
    message: 'Successfully created a contact!',
    data,
  });
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await contactServices.updateContact(contactId, req.body, {
    upsert: true,
  });

  if (!data) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  const status = data.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a contsct!`,
    data,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactServices.updateContact(contactId, req.body);

  if (!result) {
    createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.data,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await contactServices.deleteContact(contactId);

  if (!data) {
    createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
