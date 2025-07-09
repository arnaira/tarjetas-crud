@echo off
echo Iniciando Backend NestJS...
cd tarjetas-backend
start cmd /k "npm install && npm run start:dev"
cd ..

echo Iniciando Frontend Angular...
cd tarjetas-frontend
start cmd /k "npm install && ng serve"
cd ..

echo Todo está corriendo en nuevas ventanas de consola.
pause
