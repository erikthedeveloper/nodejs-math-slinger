# MathSlinger

A simple MathAsker/MathAnswerer system. 

The MathAsker sends a series of random arithmetic expressions to the MathAnswerer, which will compute the results.

- The MathAsker and MathAnswerer are separate NodeJS services
- The MathAsker generating random addition expressions of two positive integers, e.g. "2+3="
- The MathAnswerer computing and returning the correct mathematical result for the each expression it receives
- The MathAnswerer successfully processing requests from two MathAskers concurrently at a rate of at least 1 req/sec from each MathAsker (2 req/sec in aggregate)
- The MathAnswerer and MathAsker should log all messages they generate and receive

## Installation/Requirements

- Requires node.js v4.x (for ease of node version management I've found [nvm](https://github.com/creationix/nvm) to be :+1:)

```
git clone https://github.com/erikthedeveloper/nodejs-math-slinger.git
cd nodejs-math-slinger
npm install
```

## Start the Server/Simulation

`npm start` will start the server listening on the default port (3000).

`npm run simulation` will start the server **and** spawn two bots (3 separate processes). The bots will procede to request solutions to randomly generated mathematical solutions of varying difficulties.

![image](https://cloud.githubusercontent.com/assets/1240178/10477503/e7edbef4-7213-11e5-98b5-518cfd3be636.png)

## Run Tests

`npm test` will set `NODE_ENV=test` and run all tests.

![image](https://cloud.githubusercontent.com/assets/1240178/10477586/8696f3e0-7214-11e5-9eec-30d5957e03ac.png)

## UML Diagrams

#### Sequence Diagram
![mathslinger - uml sequence diagram](https://cloud.githubusercontent.com/assets/1240178/10477662/2fddc21c-7215-11e5-95a2-3c3cd4aa0532.png)

#### Activity Diagram
![mathslinger - uml activity diagram](https://cloud.githubusercontent.com/assets/1240178/10477663/2fdea646-7215-11e5-91b0-12d81241ea2a.png)
