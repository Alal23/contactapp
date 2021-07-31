import {combineReducers} from 'redux';
import * as CONST from './contactConstants';
import * as STATE from './contactInitialState';
import _ from 'lodash';

const contactInitialState = {
  ...STATE.getContactInitialState,
  ...STATE.getContactDetailInitialState,
  ...STATE.delContactInitialState,
  ...STATE.addContactInitialState,
  ...STATE.updateContactInitialState,
  action: '',
};

export const ContactReducers = (
  state = _.cloneDeep(contactInitialState),
  action,
) => {
  const {payload, type} = action;
  const actions = {
    [CONST.GET_CONTACT]: () => ({
      ...state,
      getContactFetch: true,
      action: type,
    }),
    [CONST.GET_CONTACT_SUCCESS]: () => ({
      ...state,
      getContactFetch: false,
      getContactResponse: payload.data,
      action: type,
    }),
    [CONST.GET_CONTACT_FAILED]: () => ({
      ...state,
      getContactFetch: false,
      getContactError: payload,
      action: type,
    }),
    [CONST.RESET_CONTACT]: () => ({
      ...state,
      ..._.cloneDeep(STATE.getContactInitialState),
      action: type,
    }),
    [CONST.GET_CONTACT_DETAIL]: () => ({
      ...state,
      getContactDetailFetch: true,
      action: type,
    }),
    [CONST.GET_CONTACT_DETAIL_SUCCESS]: () => ({
      ...state,
      getContactDetailFetch: false,
      getContactDetailResponse: payload.data,
      action: type,
    }),
    [CONST.GET_CONTACT_FAILED]: () => ({
      ...state,
      getContactDetailFetch: false,
      getContactDetailError: payload.data,
      action: type,
    }),
    [CONST.DELETE_CONTACT]: () => ({
      ...state,
      delContactFetch: true,
      action: type,
    }),
    [CONST.DELETE_CONTACT_SUCCESS]: () => ({
      ...state,
      delContactFetch: false,
      delContactResponse: payload.data,
      action: type,
    }),
    [CONST.DELETE_CONTACT_FAILED]: () => ({
      ...state,
      delContactFetch: false,
      delContactError: payload.data,
      action: type,
    }),
    [CONST.ADD_CONTACT]: () => ({
      ...state,
      addContactFetch: true,
      action: type,
    }),
    [CONST.ADD_CONTACT_SUCCESS]: () => ({
      ...state,
      addContactFetch: false,
      addContactResponse: payload.data,
      action: type,
    }),
    [CONST.ADD_CONTACT_FAILED]: () => ({
      ...state,
      addContactFetch: false,
      addContactError: payload.data,
      action: type,
    }),
    [CONST.UPDATE_CONTACT]: () => ({
      ...state,
      updateContactFetch: true,
      action: type,
    }),
    [CONST.UPDATE_CONTACT_SUCCESS]: () => ({
      ...state,
      updateContactFetch: false,
      updateContactResponse: payload.data,
      action: type,
    }),
    [CONST.UPDATE_CONTACT_FAILED]: () => ({
      ...state,
      updateContactFetch: false,
      updateContactError: payload.data,
      action: type,
    }),
    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};

export default combineReducers({
  contact: ContactReducers,
});
