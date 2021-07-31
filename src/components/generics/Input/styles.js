import Colors from '../../../configs/Colors';
export default {
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  inputContainer: {
    flex: 3,
    height: 40,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: Colors.main.grey,
    paddingLeft: 16,
  },
  errorInput: {
    fontSize: 12,
    color: Colors.main.bloodRed,
  },
  errorContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
};
