# Google Sign In POC

## Set up app:
npm i

## Run app
npm run dev

* You wont be able to sign in with your google account because i you still need a client id *


### How to get a client id
    - Sign in to your google sign in: https://console.cloud.google.com/
    - Create a new product
    - Select the newly created project
    - Click on credentials
    - Select OAuth Client ID
    - Application type is web application
    - Give it a name, 
    - URLs 1 is: http://localhost:5173
    - On Authorized javascript origins, URLs 1 is: http://localhost:5173/ and URLs 2 is http://localhost
    - Do the same for Authorized redirect URLs respectively.
    - Then click create, you will see you client id on the 4th column of the OAuth 2.0 Client IDs.

### How to set up client id on the app
    - Create a .env file
    - Add VITE_CLIENT_GOOGLE_ID = 'what ever your client ID is.'
    - The run the app.

# Don't hesitate if you have any questions.
