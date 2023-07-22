const express=require("express");
const axios=require("axios")
const numberRouter=express.Router();
numberRouter.get("/",async(req,res)=>{
    let arr=[]
    let url=req.query.url
    const promise1 = new Promise((resolve, reject) => {
        setTimeout(resolve, 500, {data:{numbers:[]}});
      });
    
    if(typeof url==="object"){
        const isValidUrl = urlString=> {
            try { 
                return Boolean(new URL(urlString)); 
            }
            catch(e){ 
                return false; 
            }
        }
   
        
        for(let j=0;j<url.length;j++){  
            if(isValidUrl(url[j])){
                let promise2=axios.get(url[j]);
                await Promise.race([promise1,promise2]).then((res)=>{arr=[...arr,...res.data.numbers]})
            }
        }
        let sortAndUnique=[...new Set(arr)].sort((a,b)=>a-b)
        console.log(sortAndUnique,arr)
        res.send(sortAndUnique)
        return
    }
    let promise2=axios.get(url)
    await Promise.race([promise1,promise2]).then((res)=>{arr=[...res?.data?.numbers]})
    let sortAndUnique=[...new Set(arr)].sort((a,b)=>a-b)
    console.log(sortAndUnique,arr)
    res.send(sortAndUnique)

})

module.exports={
    numberRouter
}