import * as contactServices from '../services/contacts.js';

import createHttpError from 'http-errors';

import parsePaginationsParams from '../utils/parsePaginationsParams.js';
import parseSortParams from '../utils/parseSortParams.js';

import { sortFields } from '../db/models/Contact.js';
import parseContactFilterParams from '../utils/filters/parseContactFilterParams.js';

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationsParams(req.query);
  const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFields });
  const filter = parseContactFilterParams(req.query);

  const data = await contactServices.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

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
    status: 201,
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
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const data = await contactServices.deleteContact(contactId);

  if (!data) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};
