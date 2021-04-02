let logger = require('./logger');
let lineReader = require('readline-sync');
let readNewEmp = 1;
logger.OpenLogger();
while(readNewEmp == 1)
{
    logger.getUserInput();
    readNewEmp = lineReader.questionInt('Enter 1 to another log or any other number to exit ');
}
logger.CloseLogger();
