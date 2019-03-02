1. clone
2. cd quiniela2018
3. cd sql
4. on mySQL, create a DB user account with the credentials admin:admin
5. use SQL script to create the database in your environment.
6. npm install
7. cd ngx-admin
8. npm install
9. npm run build
10. cd ..
For development:
11.a. npm start 
    (using nodemon to make live reload when changes are done)
Prod:
11. node index.js



Pasos para deploy a Prod

En el ambiente local:
1. cd ~/quiniela2018/ngx-admin/
2. npm run build:Prod

En el ambiente local: (solo si si se instaló alguna dependencia para ~/index.js o ~/api/*.js)
1. cd ~/quiniela2018/
2. npm install

Para subir al server:

En el servidor:
1. /etc/systemd/system/
2. sudo systemctl stop quiniela.service

En la local:
3. subir ~/quiniela2018/index.js -> admin@[ec2-instance]:/home/quinielaApp/
4. subir ~/quiniela2018/api/*.js -> admin@[ec2-instance]:/home/quinielaApp/api/

En el servidor: (solo si si se instaló alguna dependencia para ~/index.js o ~/api/*.js)
5. cd /home/admin/quinielaApp/
6. npm install

En la local:
7. subir y reemplazar ~/quiniela2018/ngx-admin/dist/ -> admin@[ec2-instance]:/home/quinielaApp/ngx-admin/dist/

En el servidor:
8. /etc/systemd/system/
9. sudo systemctl start quiniela.service
10. sudo systemctl status quiniela.service (tiene que salir active)