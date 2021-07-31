import ContactUpdate from './View';
import {connect} from 'react-redux';
import {updateContact, getContactDetail} from '../../contactActions';

const mapStateToProps = state => ({
  contactAction: state.contact.action,
  updateContactFetch: state.contact.updateContactFetch,
  updateContactError: state.contact.updateContactError,
  getContactDetailResponse: state.contact.getContactDetailResponse,
  getContactDetailError: state.contact.getContactDetailError,
});

const mapDispatchToProps = {
  updateContact: payload => updateContact(payload),
  getContactDetail: payload => getContactDetail(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUpdate);
