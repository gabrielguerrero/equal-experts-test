
Equal Experts test hash 5b8d0fd276b6d288905ed2f63a934e057e8feca2

# Running the app
You must have node 20.0.0 or higher installed on your machine
See https://nodejs.org/en/download/prebuilt-installer for instructions on how to install node on your machine.
, and npm or yarn or pnpm installed.
pnpm can be installed by running `npm i -g pnpm`
yarn can be installed by running `npm i -g yarn`

pnpm is the preferred package manager for this project, but yarn or npm should be ok as well.

You will also need docker installed on your machine to run the database.
https://www.docker.com/products/docker-desktop/

I could have made it in memory but I wanted to show that I can use a database as well,
because the position I'm a prospect for is node backend position. 

# Checkout app 
```
git clone git@github.com:gabrielguerrero/equal-experts-test.git 
cd equal-experts-test
```
# using pnpm 
```
pnpm i
Start up a database, if needed using './start-database.sh'
pnpm db:push
pnpm dev
```
# using npm
```
npm i
Start up a database, if needed using './start-database.sh'
npm run db:push
npm run dev
```
# using yarn
```
yarn
Start up a database, if needed using './start-database.sh'
yarn db:push
yarn dev
```
# running test

pnpm
```
pnpm test
```
yarn
```
yarn test
```
npm
```
npm run test
```


