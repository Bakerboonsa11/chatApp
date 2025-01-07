module.exports=async =(fn)=>{
     return (req,res,next)=>{
        try{
           fn(req,res,next)
        }
        catch(error){
            next(error)
        }
     }
}