// exerciseStyle.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  contentContainer: {
    paddingTop: 30,
    paddingBottom: 250,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    backgroundColor: '#BBF247',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  form_title: {
    marginBottom: 20,
    fontSize: 40,
    marginTop: 10,
  },
  from_button: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  from_button_enviar: {
    backgroundColor: '#BBF247',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginHorizontal: 40,
  },
  from_button_cerrar: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginHorizontal: 40,
  },
  form_text_input: {
    marginBottom: 15,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  form_text_input_title: {
    marginBottom: 2,
  },
});
