import { Contact } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../index.js';

export const getAllContacts = async ({
  page = 2,
  perPage = 4,
  sortBy = 'name',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
}) => {
  page = Number(page);
  perPage = Number(perPage);

  const skip = (page - 1) * perPage;

  const totalItems = await Contact.countDocuments(filter);

  const contacts = await Contact.find(filter)
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder === SORT_ORDER.ASC ? 1 : -1 })
    .exec();
  const paginationData = calculatePaginationData({
    perPage,
    page,
    totalItems,
  });
  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

export const createContact = async (contactData) => {
  const newContact = await Contact.create(contactData);
  return newContact;
};
export const patchContact = async (contactId, updateData) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    updateData,
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedContact;
};
export const deleteContact = async (contactId) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};