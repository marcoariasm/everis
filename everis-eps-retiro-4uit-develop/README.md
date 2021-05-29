## Retiro4UIT

* http://localhost:4200/

* Pasos para levantar la app modo dev

**PASO 1:** levantar el servidor de mock
```bash
npm add-user --registry https://steps.everis.com/nexus/repository/ECNF.npm.hosted/ --scope=@ecnf --always-auth
```
NOTA: el usuario es el user corto de correo de everis sin el @ y la clave es la misma del correo.

**PASO 2:** levantar el servidor de mock
```bash
npm install
```
**PASO 3:** levantar el servidor de mock
```bash
npm run mock
```
**PASO 4:** levantar la app 
```bash
npm run start
```
