# MathSlinger

A simple Producer/Consumer system.

The MathAsker (Producer) sends a series of random arithmetic expressions to the MathAnswerer (Consumer), which will compute the results.

- The MathAsker and MathAnswerer are separate NodeJS services
- The MathAsker generating random mathematical expressions of varying difficulty and length, e.g. `2+3=`, `37-90*2=`, `3^2+64-2/4-80+40=`
- The MathAnswerer computes and returns the correct mathematical result for the each expression it receives
- The MathAnswerer successfully processes requests from two MathAskers concurrently at a rate of at least 1 req/sec from each MathAsker (2 req/sec in aggregate)
- The MathAnswerer and MathAsker log all messages they generate and receive

#### Endpoints

- `GET /math?expression={encodeURIComponent('1+2=')}`

#### Supported Operations

- `+` Addition
- `-` Subtraction
- `*` Multiplication
- `/` Division
- `^` Exponents

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

## Next Steps

- [x] :scissors: :fire: :scissors: code for POST /evaluate in favor of GET /math (simplicity)
- [x] Refactor. Refactor. Refactor.
- [ ] Support parenthesis in equations (i.e. `(2*(3+4)/4)-(2^2/(4*20)=`)
- [ ] Respond w/ JSON
- [x] ESLint
- [ ] Refactor. Refactor. Refactor.
- [ ] Web Client w/ React (Calculator)
- [ ] Node v0.12.x branch via Babel/Webpack
- [ ] ES6+ branch via Babel/Webpack :)
- [ ] Refactor. Refactor. Refactor.
- [ ] Deploy

## Run Tests

`npm test` sets `NODE_ENV=test` and runs all tests.
`npm test -- --watch` runs tests and watches files for changes.
`npm run lint` will lint the project using [ESLint](http://eslint.org/) and the rules defined in `.eslintrc`.

![image](https://cloud.githubusercontent.com/assets/1240178/10477586/8696f3e0-7214-11e5-9eec-30d5957e03ac.png)

```
  Math Evaluator Service [integration]
    GET /math
      ✓ expects expression in query string
      ✓ should accept and evaluate a basic addition expression
      ✓ should accept and evaluate a lengthy addition expression
      ✓ should reject invalid expressions
      ✓ should only accept GET requests
    POST /evaluate @deprecated
      ✓ should return 404 NOT FOUND

  MathBot - Requester of Mathematical Solutions
    ✓ Accepts options and is humanized via "name"
    ✓ should request a "solution" to an "expression" via HTTP "/evaluate"

  expressionEvaluator
    #validateExpression
      ✓ should pass for a simple addition expression
      ✓ should pass for a simple subtraction expression
      ✓ should enforce the ending "="
      ✓ should not allow any whitespace
    #evaluateExpression
      ✓ evaluates simple addition expressions
      ✓ evaluates addition/substraction expressions
      ✓ evaluates multiplication/division expressions
      ✓ evaluates exponent expressions

  expressionGenerator
    #randomExpression
      ✓ should generate a random, simple addition expression
      ✓ should allow specifying count of numbers involved (length)

  Infix to Postfix Converter
    ✓ Should convert simple addition
    ✓ should convert all sorts of infix goodies to postfix...
    ✓ should reject expressions containing negative numbers

  Postfix Evaluator
    ✓ does math
```

## UML Diagrams

#### Sequence Diagram
![mathslinger - uml sequence diagram](https://cloud.githubusercontent.com/assets/1240178/10477662/2fddc21c-7215-11e5-95a2-3c3cd4aa0532.png)

#### Activity Diagram
![mathslinger - uml activity diagram](https://cloud.githubusercontent.com/assets/1240178/10477663/2fdea646-7215-11e5-91b0-12d81241ea2a.png)
