import ContactCollection from '../db/models/Contact.js';

export const getAllContacts = () => ContactCollection.find();
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

  return rawResult.value;
};

export const deleteContact = (contactId) =>
  ContactCollection.findOneAndDelete({ _id: contactId });
