import * as CONST from './contactConstants';

export const getContact = () => ({
  type: CONST.GET_CONTACT,
});
export const getContactSuccess = payload => ({
  type: CONST.GET_CONTACT_SUCCESS,
  payload,
});

export const getContactFailed = payload => ({
  type: CONST.GET_CONTACT_FAILED,
  payload,
});

export const resetContact = () => ({
  type: CONST.RESET_CONTACT,
});

export const getContactDetail = payload => ({
  type: CONST.GET_CONTACT_DETAIL,
  payload,
});
export const getContactDetailSuccess = payload => ({
  type: CONST.GET_CONTACT_DETAIL_SUCCESS,
  payload,
});

export const getContactDetailFailed = payload => ({
  type: CONST.GET_CONTACT_DETAIL_FAILED,
  payload,
});

export const delContact = payload => ({
  type: CONST.DELETE_CONTACT,
  payload,
});

export const delContactSuccess = payload => ({
  type: CONST.DELETE_CONTACT_SUCCESS,
  payload,
});

export const delContactFailed = payload => ({
  type: CONST.DELETE_CONTACT_FAILED,
  payload,
});

export const addContact = payload => ({
  type: CONST.ADD_CONTACT,
  payload,
});

export const addContactSuccess = payload => ({
  type: CONST.ADD_CONTACT_SUCCESS,
  payload,
});

export const addContactFailed = payload => ({
  type: CONST.ADD_CONTACT_FAILED,
  payload,
});

export const updateContact = payload => ({
  type: CONST.UPDATE_CONTACT,
  payload,
});

export const updateContactSuccess = payload => ({
  type: CONST.UPDATE_CONTACT_SUCCESS,
  payload,
});

export const updateContactFailed = payload => ({
  type: CONST.UPDATE_CONTACT_FAILED,
  payload,
});
