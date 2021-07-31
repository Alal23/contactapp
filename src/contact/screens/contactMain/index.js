import ContactMain from './View';
import {connect} from 'react-redux';
import {getContact, resetContact} from '../../contactActions';

const mapStateToProps = state => ({
  getContactResponse: state.contact.getContactResponse,
  getContactFetch: state.contact.getContactFetch,
});

const mapDispatchToProps = {
  getContact: () => getContact(),
  resetContact: () => resetContact(),
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactMain);
