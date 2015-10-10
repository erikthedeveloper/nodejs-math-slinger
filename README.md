## MathSpitter

A simple MathAsker/MathAnswerer system. 

The MathAsker sends a series of random arithmetic expressions to the MathAnswerer, which will compute the results.

- The MathAsker and MathAnswerer are separate NodeJS services
- The MathAsker generating random addition expressions of two positive integers, e.g. "2+3="
- The MathAnswerer computing and returning the correct mathematical result for the each expression it receives
- The MathAnswerer successfully processing requests from two MathAskers concurrently at a rate of at least 1 req/sec from each MathAsker (2 req/sec in aggregate)
- The MathAnswerer and MathAsker should log all messages they generate and receive
