//const dir = require('../index');
const Course = require('../models/courseModel');

module.exports.index = async (req,res,next)=>{

    res.render('index')
}

module.exports.addPage = async (req,res,next)=>{

    res.render('add')
}

module.exports.addCourse = async (req,res,next)=>{
    try{
        let course = new Course();
        course._id = req.body.cId;
        course.courseName = req.body.cName;
        course.description = req.body.desc;
        course.amount = req.body.amount;
        course = await course.save();
        res.redirect('/')
    }
    catch(err)
    {
        next(err);
    }
}

module.exports.updatePage = async (req,res,next)=>{

    res.render('update',{invalid:false})
}

module.exports.updateCourse = async (req,res,next)=>{

    try
    {
        let id = req.body.cId;
        let newAmount = req.body.amount;
        let courseToUpdate = await Course.findOne({_id:id});
        
      
        if(courseToUpdate == null)
        {
            let invalid = true;
            res.render('update',{invalid});
        }
        else
        {
            courseToUpdate.amount = newAmount;
            courseToUpdate = await courseToUpdate.save();
            res.redirect('/')
        }

        
    }
    catch(err)
    {
        next(err);
    }


 
}

module.exports.deletePage = async (req,res,next)=>{

    res.render('delete')
}

module.exports.deleteCourse = async (req,res,next)=>{

    try
    {
        let id = req.body.cId;
        let newAmount = req.body.amount;
        let courseToDelete = await Course.findOne({_id:id});
        
       
        if(courseToDelete == null)
        {
            let invalid = true;
            res.render('delete',{invalid});
        }
        else
        {
           
            await courseToDelete.delete();
            res.redirect('/')
        }

        
    }
    catch(err)
    {
        next(err);
    }


 

}

module.exports.fetchPage = async (req,res,next)=>{

    try{
        let courses = await Course.find();
        res.render('fetch',{courses})
    }
    catch(err)
    {
        next(err);
    }
    
}