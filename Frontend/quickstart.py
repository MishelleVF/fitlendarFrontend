from __future__ import print_function
import os.path
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

# Si se modifican estos alcances, elimine el archivo token.json.
SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

def main():
    """Muestra los próximos eventos del calendario."""
    creds = None
    # El archivo token.json almacena el token de acceso y el token de actualización del usuario.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # Si no hay credenciales válidas disponibles, el usuario inicia sesión.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=8080)  # Utilizar el puerto 8080
        # Guarda las credenciales para la próxima ejecución
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        service = build('calendar', 'v3', credentials=creds)

        # Llama a la API de Calendar
        print('Obteniendo los próximos 10 eventos')
        events_result = service.events().list(calendarId='primary', maxResults=10, singleEvents=True,
                                              orderBy='startTime').execute()
        events = events_result.get('items', [])

        if not events:
            print('No hay eventos próximos encontrados.')
            return

        # Muestra los próximos eventos
        for event in events:
            start = event['start'].get('dateTime', event['start'].get('date'))
            print(start, event['summary'])

    except Exception as error:
        print('Ha ocurrido un error: %s' % error)

if __name__ == '__main__':
    main()
