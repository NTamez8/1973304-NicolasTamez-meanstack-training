let fs = require('fs');
var stream;
var path;
var data;


var jsonReader = class JSONReader{
     
    open(filePath)
    {
        
        if(fs.existsSync(filePath))
        {
           data = fs.readFileSync(filePath);
           data = JSON.parse(data);
         
            
        }
        else
        {
            throw new Error('cannot find file');
        }
        
     
    }

    getJsonItem(index)
    {
        return data[index];
    }

    length()
    {
        return data.length;
    }


   
}


module.exports = new jsonReader();