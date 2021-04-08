const http = require('http');
const url = require('url');
const fs = require('fs');
const jsonWriter = require('./jsonArrayWriter');
const jsonReader = require('./jsonArrayReader');

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


const server = http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;

    if (req.url == '/') {
        const html = fs.readFileSync('index.html');
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(html);
        res.end();
    } else if (path == '/add') {
        const paramaters = url.parse(req.url, true).query;
        const jsonValues = {
            'EID': paramaters.EmpID,
            'TID': paramaters.TaskID,
            'Task': paramaters.task,
            'Deadline': paramaters.Deadline
        };
        jsonWriter.open('Task.json');
        jsonWriter.writeJsonItem(JSON.stringify(jsonValues));
        jsonWriter.close();
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    } else if (path == '/delete') {
        const paramaters = url.parse(req.url, true).query;
        const id = paramaters.ID;
        jsonReader.open('./Task.json');
        let data = jsonReader.getAll();
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
                    res.statusCode = 302;
                    res.setHeader('Location', '/display');
                    return res.end();
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

        
        if (jsonReader.open('./Task.json')) {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(displayTopHalf);

            jsonData = jsonReader.getAll();
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
            res.end('end');
        }

    }

});


server.listen(8080, () => console.log('listening on port 8080'));