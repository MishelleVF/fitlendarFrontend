import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#141618',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#F4F4F4',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#F4F4F4',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  button: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#BBF247',
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#141618',
    fontWeight: 'bold',
  },
  googleButton: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
  },
  googleButtonText: {
    color: '#141618',
    fontWeight: 'bold',
  },
});
