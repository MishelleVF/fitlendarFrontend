import { StyleSheet } from 'react-native';

export const LoginStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '100%',
  },
  button: {
    backgroundColor: '#4285F4',
    padding: 10,
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  googleButton: {
    backgroundColor: 'white',
    borderColor: '#4285F4',
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  googleButtonText: {
    color: '#4285F4',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  logo: {
    marginBottom: 20,
  },
  forgotPassword: {
    color: '#4285F4',
    marginTop: 10,
  },
  createAccount: {
    color: '#4285F4',
    marginTop: 10,
  },
});

export const homeStyle = StyleSheet.create({
    view: {
        flex : 1,
        alignContent : 'center',
        justifyContent : 'center',
    },
    text: {
        fontSize : '26px',
        fontWeight : 'Blob',
    },
});

export const exercisesStyle = StyleSheet.create({
    view: {
        flex : 1,
        alignContent : 'center',
        justifyContent : 'center',
    },
    text: {
        fontSize : '26px',
        fontWeight : 'Blob',
    },
});

export const sugestionsStyle = StyleSheet.create({
    view: {
        flex : 1,
        alignContent : 'center',
        justifyContent : 'center',
    },
    text: {
        fontSize : '26px',
        fontWeight : 'Blob',
    },
});

export const profileStyle = StyleSheet.create({
    view: {
        flex : 1,
        alignContent : 'center',
        justifyContent : 'center',
    },
    text: {
        fontSize : '26px',
        fontWeight : 'Blob',
    },
});