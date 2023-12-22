Za instalaciju biblioteka:

1. npm install (instalira sve biblioteke)

Za lokalno pokretanje:

1. npm run local (pokrece lokalno aplikaciju koja koristi lokalno pokrenut bekend na http://localhost:3000)

Ili 2. npm run remote (pokrece lokalnu aplikaciju koja koristi remote deplojovani bekend)

Za deploy aplikacije na server:

1. node deploy.js SSH_SIFRA_ZA_REMOTE_SERVER

Za pokretanje Aplikacija na serveru, koristimo pm2 paket iz nodejs-a. Sledece komande koristimo nakon sto smo se povezali preko SSH-a.

Frontend: pm2 start npm --name "kmk-web" -- run remote
Bekend: pm2 start npm --name "kmk-api" -- run start:prod
