# marsan_backend

Steps to run this project:
- Create `.env` file at the root folder
- Setup `.env` variables from `.env.example`:
------------
    NETWORK="LOCAL" | "TESTNET" | "MAINNET"
    
    DB_URL_TESTNET=''
    DB_URL_MAINNET=''
    DB_URL_LOCAL=''

    GOOGLE_EMAIL_LOGIN=''
    GOOGLE_EMAIL_PASSWORD=''
------------
- Run `npm ci` command
- Run `npm start` command