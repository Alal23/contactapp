import ContactDetail from './View';
import {connect} from 'react-redux';
import {getContactDetail, delContact} from '../../contactActions';

const mapStateToProps = state => ({
  getContactDetailResponse: state.contact.getContactDetailResponse,
  getContactDetailFetch: state.contact.getContactDetailFetch,
  delContactFetch: state.contact.delContactFetch,
  delContactError: state.contact.delContactError,
  contactAction: state.contact.action,
});

const mapDispatchToProps = {
  getContactDetail: payload => getContactDetail(payload),
  delContact: payload => delContact(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetail);
