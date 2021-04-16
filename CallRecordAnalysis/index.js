const mongoose = require('mongoose');
const fs = require('fs');
mongoose.Promise = global.Promise;
let url =  'mongodb://localhost:27017/meanstack'

const mongooseDbOption ={       // to avoid warning 
    useNewUrlParser: true,
    useUnifiedTopology: true
}
let items = getItemsToAdd();
mongoose.connect(url,mongooseDbOption);  
addItemsToDB(items,mongoose.connection);

function getItemsToAdd()
{
   let data = fs.readFileSync(__dirname + '/call_data.json');
   let parsedData = JSON.parse(data.toString());
    return parsedData;

}

async function addItemsToDB(itemsToAdd,db)
{
    //console.log(itemsToAdd);
    //let db = mongoose.connection;
    db.on('error',(err)=>console.log(err));
   await db.once('open',()=>{
        let callData = new mongoose.Schema({
            _id:Number,
            source:String,
            destination:String,
            sourceLocation:String,
            destinationLocation:String,
            callDuration:String,
            roaming:String,
            callCharge:Number
    
        });
        
      
        test(itemsToAdd,callData)
        
       
    });
}
async function test(items,schema)
{
    let Call = mongoose.model('Call',schema);
        
        for(let x = 0; x < items.length; x++)
        {
            let nItem = new Call(items[x]);
         await nItem.save();
           
          
        }
        mongoose.disconnect();
}



