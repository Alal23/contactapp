import {all} from 'redux-saga/effects';
import contactSagas from '../contact/contactSagas';

export default function* rootSaga() {
  yield all([...contactSagas]);
}
