import ContactCollection from '../db/models/Contact.js';

import calculatePaginationData from '../utils/calculatePaginationData.js';

import { SORT_ORDER } from '../constants/possibleSorts.js';

export const getContacts = async ({
  page,
  perPage,
  sortBy = '_id',
  sortOrder = SORT_ORDER[0],
  filter = {},
}) => {
  const skip = (page - 1) * perPage;

  const contactQuery = ContactCollection.find();

  if (filter.isFavourite !== undefined) {
    contactQuery.where('isFavourite', filter.isFavourite);
  }
  if (filter.userId) {
    contactQuery.where('userId').eq(filter.isFavourite);
  }

  const contacts = await contactQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const totalContacts = await ContactCollection.find()
    .merge(contactQuery.getQuery())
    .countDocuments();

  console.log(totalContacts);

  const paginationData = calculatePaginationData({
    page,
    perPage,
    totalContacts,
  });

  return {
    contacts,
    page,
    perPage,
    totalContacts,
    ...paginationData,
  };
};
export const getContact = (filter) => ContactCollection.findById(filter);
export const addContact = (payload) => ContactCollection.create(payload);

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = (contactId) =>
  ContactCollection.findOneAndDelete({ _id: contactId });
