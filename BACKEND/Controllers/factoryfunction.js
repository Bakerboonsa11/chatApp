const catchAsync=require('../utils/asyncFun');
const appError=require('../utils/appError')
const appFeatures=require('../utils/appFeuture')
exports.createOne=(Model)=>catchAsync(

 async (req, res, next) => {

    console.log(req.body);
    const createdInstance = await Model.create(req.body);

    if (createdInstance) {
      return res.status(201).json({
        status: "success",
        message: " data is created successfully",
        data:createdInstance
      });
    }
 
    
}

) 


exports.deleteOne=(Model)=>catchAsync(async(req,res,next)=>{
    console.log('entered delete part')
     const deletedInstance= await Model.findByIdAndDelete(req.params.id);
     console.log(deletedInstance)
     if(!deletedInstance) {
      const error =new appError("there is no user with this id to delete",404)
      console.log("have to enter")
      console.log(error)
         next(error)
      
     }
     else{
         res.status(200).json({
       status:"success",
       data:null,
       userdeletedis:deletedInstance.name
     })
     }
     
})


exports.updateOne=(Model)=>catchAsync((async(req,res,next)=>{
  // console.log("entered update page")
  //  console.log(req.files)
   req.body.images=req.files
  //  console.log(req.body)
   const updatedInstance=await Model.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
 
     if(!updatedInstance){
      return next(new appError("there is no data with this info to update",404))
     }

     res.status(200).json({
      status:"success",
      updatedTo:updatedInstance
     })
}))

exports.getOne=(Model)=>catchAsync(async(req,res,next)=>{
  // console.log("entered get one ")
    const GetedInstance = await Model.findById(req.params.id);
    if(!GetedInstance){
      return next(new appError("there is no data with this is"),404)
    }

    res.status(200).json({
      status:"success",
      data:GetedInstance
      
    })
})
exports.getAll=(Model)=>catchAsync(async(req,res,next)=>{
  
        //  console.log('entered getalll')
         const feature=new appFeatures(Model.find(),req.query)
         .filter()
         .sort()
         .fields()
         .pagination();
         const instanceFiltered=await feature.databaseQuery
     
         if(!instanceFiltered){
            return next(new appError("there is no any data",404))
         }

        res.status(200).json({
            status:"success",
            length:instanceFiltered.length,
            instanceFiltered
        })
})



{{{{{{{{{{}}}