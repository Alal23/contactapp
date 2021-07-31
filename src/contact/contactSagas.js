import {takeLatest, put, call, take} from 'redux-saga/effects';
import {RESPONSE_STATUS} from '../utils/contants';
import {
  GET_CONTACT,
  GET_CONTACT_DETAIL,
  DELETE_CONTACT,
  ADD_CONTACT,
  UPDATE_CONTACT
} from './contactConstants';
import {
  getContactSuccess,
  getContactFailed,
  getContactDetailSuccess,
  getContactDetailFailed,
  delContactSuccess,
  delContactFailed,
  addContactSuccess,
  addContactFailed,
  updateContactSuccess,
  updateContactFailed,
} from './contactActions';
import {
  getContactApi,
  getContactDetailApi,
  delContactApi,
  addContactApi,
  updateContactApi,
} from './contactApis';

function* getContact() {
  try {
    const response = yield call(getContactApi);
    switch (response.status) {
      case RESPONSE_STATUS.SUCCESS:
        yield put(getContactSuccess(response.data));
        break;
      case RESPONSE_STATUS.NEED_ACTION:
        yield put(getContactFailed(response.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getContactFailed(response.data));
        break;
      default:
    }
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        default:
          yield put(getContactFailed(error.response));
          break;
      }
    } else {
      yield put(getContactFailed(error.response));
    }
  }
}

function* getContactDetail(params) {
  try {
    const response = yield call(getContactDetailApi, {
      ...params.payload,
    });
    switch (response.status) {
      case RESPONSE_STATUS.SUCCESS:
        yield put(getContactDetailSuccess(response.data));
        break;
      case RESPONSE_STATUS.NEED_ACTION:
        yield put(getContactDetailFailed(response.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getContactDetailFailed(response.data));
        break;
      default:
    }
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        default:
          yield put(getContactDetailFailed(error.response));
          break;
      }
    } else {
      yield put(getContactDetailFailed(error.response));
    }
  }
}

function* delContact(params) {
  try {
    const response = yield call(delContactApi, {
      ...params.payload,
    });
    switch (response.status) {
      case RESPONSE_STATUS.SUCCESS:
        yield put(delContactSuccess(response.data));
        break;
      case RESPONSE_STATUS.NEED_ACTION:
        yield put(delContactFailed(response.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(delContactFailed(response.data));
        break;
      default:
    }
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        default:
          yield put(delContactFailed(error.response));
          break;
      }
    } else {
      yield put(delContactFailed(error.response));
    }
  }
}

function* addContact(params) {
  try {
    const response = yield call(addContactApi, {
      ...params.payload,
    });
    switch (response.status) {
      case RESPONSE_STATUS.SUCCESS:
        yield put(addContactSuccess(response.data));
        break;
      case 201:
        yield put(addContactSuccess(response.data));
        break;
      case RESPONSE_STATUS.NEED_ACTION:
        yield put(addContactFailed(response.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(addContactFailed(response.data));
        break;
      default:
    }
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        default:
          yield put(addContactFailed(error.response));
          break;
      }
    } else {
      yield put(addContactFailed(error.response));
    }
  }
}

function* updateContact(params) {
  try {
    const response = yield call(updateContactApi, {
      ...params.payload,
    });
    switch (response.status) {
      case RESPONSE_STATUS.SUCCESS:
        yield put(updateContactSuccess(response.data));
        break;
      case 201:
        yield put(updateContactSuccess(response.data));
        break;
      case RESPONSE_STATUS.NEED_ACTION:
        yield put(updateContactFailed(response.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(updateContactFailed(response.data));
        break;
      default:
    }
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        default:
          yield put(updateContactFailed(error.response));
          break;
      }
    } else {
      yield put(updateContactFailed(error.response));
    }
  }
}

export default [
  takeLatest(GET_CONTACT, getContact),
  takeLatest(GET_CONTACT_DETAIL, getContactDetail),
  takeLatest(DELETE_CONTACT, delContact),
  takeLatest(ADD_CONTACT, addContact),
  takeLatest(UPDATE_CONTACT, updateContact),
];
