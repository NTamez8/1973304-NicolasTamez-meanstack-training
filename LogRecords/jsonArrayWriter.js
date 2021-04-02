let fs = require('fs');
var stream;
var     path;


var jsonWriter = class JSONWriter{
     
    open(filePath)
    {
        path = filePath;
        if(fs.existsSync(filePath))
        {
            let length = fs.readFileSync(filePath).toString().length;
            stream = fs.createWriteStream(filePath,{flags:'r+',start:length-1});
            stream.write(',')
            
        }
        else
        {
            stream =  fs.createWriteStream(filePath,{flags:'w'});    
            stream.write('['); 
            
        }
        
     
    }

    close()
    {
        stream.end(()=>{

            let length = fs.readFileSync(path).length;
            let temp = fs.createWriteStream(path,{flags:'r+',start:length-1});
            temp.write(']');

        });
      

        /*
        this.stream.write(']');
        this.stream.end();*/
    }

    writeJsonItem(jsonString)
    {
        stream.write(jsonString);
        stream.write(',');
    }


   
}


module.exports = new jsonWriter();