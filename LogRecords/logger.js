let rls = require('readline-sync');
let jsonWriter = require('./jsonArrayWriter');

let logger = class Logger {

    OpenLogger() {
        jsonWriter.open('emp.json');
        debugger;
    }

    getUserInput() {
       let emp = {};
       let date = new Date().toLocaleDateString();
       let time = new Date().toLocaleTimeString();
        debugger;

        emp.fName = rls.question('Enter first name ');
        emp.lName = rls.question('Enter last name ');
        emp.gender = rls.question('Enter gender ');
        emp.email = rls.questionEMail('Enter email ');

        debugger;
        emp.date = date;
        emp.time = time;
        debugger;
        let empString = JSON.stringify(emp);
        jsonWriter.writeJsonItem(empString);


    }
    CloseLogger() {
        jsonWriter.close();
        debugger;
    }

}



module.exports = new logger();