import ContactCreate from './View';
import {connect} from 'react-redux';
import {addContact} from '../../contactActions';

const mapStateToProps = state => ({
  contactAction: state.contact.action,
  addContactFetch: state.contact.addContactFetch,
  addContactError: state.contact.addContactError,
});

const mapDispatchToProps = {
  addContact: payload => addContact(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactCreate);
