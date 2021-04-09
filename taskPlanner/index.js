const http = require('http');
const url = require('url');
const fs = require('fs');

const displayTopHalf = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
    <title>Display</title>
</head>
<body>
<div class='container'>
    <h1 class='text-center'>Welcome to display</h1>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
     
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link"  href="/">Add Tasks</a>
          </li>
        </ul>
       
        
      </div>
    </div>
  </nav>
    <form method="get" action='/delete'>
        <label>Delete Task</label><input type='text' name='ID' id='ID' class="form-control"/><input type='submit' value='delete'/>
    </form>
    <table class="table">
        <thead>
            <tr>
                <td>Emp ID</td>
                <td>Task ID</td>
                <td>Task</td>
                <td>Date</td>
            </tr>
        </thead>
        <tbody>

      `
const displayBottomHalf = `  </tbody>
</table>
</div>
</body>
</html>`;

const htmlTop = `<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
        <title>Task Planner</title>
    </head>

    <body>
        <div class='container'>
        <h1 class='text-center'>Welcome to task planner</h1>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
             
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link"  href="/display">View Tasks</a>
                  </li>
                </ul>
               
                
              </div>
            </div>
          </nav>
      
            <h2 class='text-center'>Add Task</h2>
            <form method="get" action='/add'>
                <label>Emp Id: </label><input type="text" name="EmpID" id="EmpID" class="form-control" required><br>
                <label>Task ID: </label><input type="text" name="TaskID" id="TaskID" class="form-control" required><br>
                <label>Task: </label><textarea name="task" id="task" cols="30" rows="10" class="form-control" required></textarea><br>
                <label>Deadline: </label><input type="date" name="Deadline" id="Deadline" class="form-control"><br>
                <input type="submit" value='Add Task'>
            </form>
        </div>
        <script>
          
        `;

const htmlBottom = `</script>
       
</body>

</html>`;
const htmlInValid = `if(true)
alert('id is already used')`



const server = http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;

    if (path == '/') {
       
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(htmlTop);
        let temp = url.parse(req.url, true).query;

        if (temp.error == 'true')
            res.write(htmlInValid);
       

        res.write(htmlBottom);
        res.end();
    } else if (path == '/add') {
        const paramaters = url.parse(req.url, true).query;
        const jsonValues = {
            'EID': paramaters.EmpID,
            'TID': paramaters.TaskID,
            'Task': paramaters.task,
            'Deadline': paramaters.Deadline
        };

        if (fs.existsSync('Task.json')) {
            tempArray = JSON.parse(fs.readFileSync('Task.json'));
            for (let x = 0; x < tempArray.length; x++) {
                if (paramaters.TaskID == tempArray[x].TID) {
                    res.statusCode = 302;
                    res.setHeader('Location', '/?error=true');
                    return res.end();
                } else if (x == tempArray.length - 1) {
                    stringJSON = JSON.stringify(jsonValues);
                    lengthOfFile = fs.readFileSync('Task.json').length;
                  let stream =  fs.createWriteStream('Task.json',{flags:'r+',start:lengthOfFile-1});
                  stream.write(','+stringJSON+']');
                  stream.end();
                  /*
                    id = fs.openSync('Task.json','a');
                    bufferV = Buffer.from(','+stringJSON+']','utf8');
                   
                    fs.writeSync(id,bufferV,0,bufferV.length,-1);
                    fs.closeSync(id);*/
                    /*
                    jsonWriter.open('Task.json');
                    jsonWriter.writeJsonItem(JSON.stringify(jsonValues));
                    jsonWriter.close();*/
                    res.statusCode = 302;
                    res.setHeader('Location', '/?error=false');
                    return res.end();
                }
            }
            if(tempArray.length == 0)
            {
                stringJSON = JSON.stringify(jsonValues);
                fs.writeFileSync('Task.json','['+stringJSON+']');
                    //lengthOfFile = fs.readFileSync('Task.json').length;
                    //id = fs.openSync('Task.json');
                    //fs.writeSync(id,stringJSON,position = lengthOfFile-1);
                    //fs.closeSync(id);
                    /*
                    jsonWriter.open('Task.json');
                    jsonWriter.writeJsonItem(JSON.stringify(jsonValues));
                    jsonWriter.close();*/
                    res.statusCode = 302;
                    res.setHeader('Location', '/?error=false');
                    return res.end();
            }

        } else {
           
            stringJSON = JSON.stringify(jsonValues);
          /*  lengthOfFile = fs.readFileSync('Task.json').length;
            id = fs.openSync('Task.json');
            fs.writeSync(id,stringJSON,position = lengthOfFile-1);
            fs.closeSync(id);*/
            fs.writeFileSync('Task.json','[' + stringJSON + ']');
            res.statusCode = 302;
            res.setHeader('Location', '/?error=false');
            return res.end();
        }


      
    } else if (path == '/delete') {
        const paramaters = url.parse(req.url, true).query;
        const id = paramaters.ID;
     
        data = JSON.parse(fs.readFileSync('Task.json'));
        let newArray = [];
        if (data.length > 1) {

            newArray = data.filter(json => json.TID != id);
          
            fs.writeFileSync('Task.json', '[');
            for (let x = 0; x < newArray.length; x++) {
                fs.writeFileSync('Task.json', JSON.stringify(newArray[x]), {
                    flag: 'a'
                });
                
                if (x == newArray.length - 1) {
                   
                    fs.writeFileSync('Task.json', ']', {
                        flag: 'a'
                    });

                    res.statusCode = 302;
                    res.setHeader('Location', '/display');
                    return res.end();

                } else {
                    fs.writeFileSync('Task.json', ',', {
                        flag: 'a'
                    });
                    
                }

            }

        } else if (data.length == 1) {
            if (data[0].TID == id) {

                fs.writeFileSync('Task.json', '[]');
                res.statusCode = 302;
                res.setHeader('Location', '/display');
                return res.end();
            } else {

                res.statusCode = 302;
                res.setHeader('Location', '/display');
                return res.end();
            }
        } else {
            res.statusCode = 302;
            res.setHeader('Location', '/display');
            return res.end();
        }






    } else if (path == '/display') {


        if (fs.existsSync('./Task.json')) {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(displayTopHalf);

            
            jsonData = JSON.parse(fs.readFileSync('Task.json'));
            tableContent = ``;


            for (let x = 0; x < jsonData.length; x++) {
                tableContent += `<tr>
                <td>${jsonData[x].EID}</td>
                <td>${jsonData[x].TID}</td>
                <td>${jsonData[x].Task}</td>
                <td>${jsonData[x].Deadline}</td>
                </tr>`
            }
            res.write(tableContent);
            res.write(displayBottomHalf);
            res.end();
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(displayTopHalf);

            res.write(displayBottomHalf);
            res.end();
        }

    }

});


server.listen(8080, () => console.log('listening on port 8080'));