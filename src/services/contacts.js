import ContactCollection from '../db/models/Contact.js';

export const getContacts = async ({ page, perPage }) => {
  const skip = (page - 1) * perPage;
  const data = await ContactCollection.find().skip(skip).limit(perPage);

  return data;
};
export const getContactById = (id) => ContactCollection.findById(id);
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
