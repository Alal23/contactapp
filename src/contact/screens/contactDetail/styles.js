import Colors from '../../../configs/Colors';

export default {
  container: {
    alignItems: 'center',
    marginBottom: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContent: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rightContent: {
    flex: 1,
    alignItems: 'flex-end',
  },
  horizontalLine: {
    height: 1,
    borderWidth: 0.5,
    borderColor: Colors.main.grey,
    marginHorizontal: 16,
    marginTop: 8,
  },
  mb16: {
    marginBottom: 16,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  bottomContent: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 0,
    alignItems: 'flex-end',
  },
  btnEdit: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.main.lightblue,
    alignItems: 'center',
    justifyContent: 'center',
  },
};
