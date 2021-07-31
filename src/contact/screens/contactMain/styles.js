import Colors from '../../../configs/Colors';

export default {
  header: {
    container: {
      height: 56,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginTop: 20,
    },
    title: {
      fontSize: 17,
      fontWeight: 'bold',
    },
  },
  card: {
    container: {
      flexDirection: 'row',
      height: 50,
      alignItems: 'center',
    },
    ml10: {
      marginLeft: 10,
    },
    horizontalLine: {
      height: 1,
      borderWidth: 0.5,
      borderColor: Colors.main.grey,
    },
    loading: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
};
