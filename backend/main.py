import time
import requests
import speech_recognition as sr

from dotenv import load_dotenv

load_dotenv('.env.local')

# Zoom API credentials
API_KEY = 'YOUR_API_KEY'
API_SECRET = 'YOUR_API_SECRET'

# Zoom meeting details
MEETING_ID = 'MEETING_ID'
MEETING_PASSWORD = 'MEETING_PASSWORD'

# Speech recognition language
LANGUAGE = 'en-US'


def join_zoom_meeting():
    # Generate Zoom JWT token
    jwt_token = generate_jwt_token()

    # Create a Zoom meeting join URL
    join_url = create_zoom_meeting_url(jwt_token)

    # Open the Zoom meeting URL in a web browser
    # You may need to install the 'webbrowser' package for this to work
    import webbrowser
    webbrowser.open(join_url)


def generate_jwt_token():
    import jwt

    # Generate JWT token using API Key and Secret
    payload = {
        'iss': API_KEY,
        'exp': int(time.time()) + 3600  # Token expires in 1 hour
    }
    token = jwt.encode(payload, API_SECRET, algorithm='HS256')

    return token.decode('utf-8')


def create_zoom_meeting_url(jwt_token):
    # Create a Zoom meeting join URL using JWT token
    url = f'https://api.zoom.us/v2/users/me/meetings'
    headers = {
        'Authorization': f'Bearer {jwt_token}',
        'Content-Type': 'application/json'
    }
    data = {
        'topic': 'Speech to Text Meeting',
        'type': 1,
        'password': MEETING_PASSWORD
    }

    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 201:
        join_url = response.json()['join_url']
        return join_url


def speech_to_text(language='en-US'):
    r = sr.Recognizer()

    with sr.Microphone() as source:
        print("Speak something...")
        audio = r.listen(source)

    try:
        if language.startswith('en'):
            # For English recognition
            text = r.recognize_google(audio, language='en-US')
        elif language.startswith('de'):
            # For German recognition
            text = r.recognize_google(audio, language='de-DE')
        else:
            print("Unsupported language.")
            return None

        return text

    except sr.UnknownValueError:
        print("Speech recognition could not understand audio.")
    except sr.RequestError as e:
        print(
            "Could not request results from the speech recognition service; {0}".format(e))

    return None


def process_audio():
    while True:
        text = speech_to_text(LANGUAGE)
        if text is not None:
            print('You said: ' + text)
            # Do something with the text (e.g., store it, process it further)
        else:
            print('No speech detected.')

        time.sleep(1)


if __name__ == '__main__':
    join_zoom_meeting()
    process_audio()
