import { calculatePaginationData } from '../utils/calculatePaginationData.js';

import { Contact } from '../db/models/contactModel.js';
import { SORT_ORDER } from '../constants/index.js';

export const fetchAllContacts = async ({
  page,
  perPage,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
  userId,
}) => {

  const limit = perPage; 
  const skip = page > 0 ? (page - 1) * perPage : 0; 

  
  const contactsQuery = Contact.find({ userId });
  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  } 
  
  if (typeof filter.isFavourite === 'boolean') {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  } 


  
  const [totalItems, contacts] = await Promise.all([
    Contact.find({ userId }).merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
  

  const paginationData = calculatePaginationData(totalItems, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};



export const fetchContactById = async (id, userId) => {
  return await Contact.findOne({ _id: id, userId });
};


export const createContact = async (payload) => { 
  const contact = await Contact.create(payload); 
  return contact;
};

export const updateContact = async (contactId, payload, userId) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, userId }, 
    payload,
    {
      new: true,           
      runValidators: true 
    }
  );

  return updatedContact; 
};

export const deleteContact = async (id, userId) => {
  const deleted = await Contact.findOneAndDelete({ _id: id, userId });
  return deleted;
};