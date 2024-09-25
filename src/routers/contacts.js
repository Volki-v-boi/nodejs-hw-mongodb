import { Router } from 'express';

import * as contactControllers from '../controllers/contacts.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

import {
  createContactSchema,
  contactPatchSchema,
} from '../validation/contacts.js';

import isValidId from '../middlewares/isValidId.js';

const contactsRouter = Router();

contactsRouter.get(
  '/',
  ctrlWrapper(contactControllers.getAllContactsController),
);

contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactControllers.getContactByIdController),
);

contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(contactControllers.addContactController),
);

contactsRouter.put(
  '/:contactId',
  isValidId,
  validateBody(createContactSchema),
  ctrlWrapper(contactControllers.upsertContactController),
);

contactsRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(contactPatchSchema),
  ctrlWrapper(contactControllers.patchContactController),
);

contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactControllers.deleteContactController),
);

export default contactsRouter;
