import { Router } from 'express';

import * as contactControllers from '../controllers/contacts.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

import {
  createContactSchema,
  contactPatchSchema,
} from '../validation/contacts.js';

import authenticate from '../middlewares/authenticate.js';
import isValidId from '../middlewares/isValidId.js';

import { upload } from '../middlewares/multer.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

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
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(contactControllers.addContactController),
);

contactsRouter.put(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(contactControllers.upsertContactController),
);

contactsRouter.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(contactPatchSchema),
  ctrlWrapper(contactControllers.patchContactController),
);

contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactControllers.deleteContactController),
);

export default contactsRouter;
