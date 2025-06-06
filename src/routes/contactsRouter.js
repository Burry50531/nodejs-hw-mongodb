import express from 'express';
import {
  getContactsController,
  handleGetContactById,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contactsControllers.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { addContactSchema, updateContactSchema } from '../validation/contactsValidation.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = express.Router();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(handleGetContactById));

router.post(
  '/',
  validateBody(addContactSchema), 
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;