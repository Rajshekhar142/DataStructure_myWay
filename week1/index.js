const express = require("express");
const app = express();

// approach 1 
const userArray = [];
for(let i = 0 ;  i < 1000000; i++){
    userArray.push({
        index: i,
        uniqueIdentifier: `user${i}`
    })
}

const mp = new Map();
for(val of userArray){
    mp.set(val.index , val)
}


app.get("/" , (req,res)=>{
    res.send("server is on the run")
})

app.get("/user/array/:id" , (req,res)=>{
    const tick = performance.now();
    console.log(tick);
    // since req.params.id always return a string and later there is strict equallity checker.
    const id = parseInt(req.params.id);
    console.log(id);
    console.log(userArray[0].index);
    // implementing linear search ..
    // for(let i = 0 ; i < userArray.length ; i++){
        
    //     if(userArray[i].index === id){
    //         const tock = performance.now();
    //         console.log(tock);
    //         return res.status(200).send(`user id : ${id} found in time: ${tock - tick}`)
    //     }
                    
    // }
    // time for binary search..
    let low = 0 ;
    let high = userArray.length-1;
    while(low <= high){
// this is like using linear search in binary search bs not good..
        // if(userArray[low].index == id){
        //     return res.status(200).send(`found user ${id} in ${tick - performance.now()}ms`)
        // }
        // if(userArray[high].index == id){
        //     return res.status(200).send(`found user ${id} in ${tick - performance.now()}ms`)
        // }
        mid = Math.floor((low + high)/2)
        if(userArray[mid].index < id){
            low = mid+1;
        }
        else if (userArray[mid].index > id){
            high = mid-1 ;
        }
        else{
            return res.status(200).send(`found user ${id} in ${performance.now() - tick}ms`)
        }
    }
    return res.status(500).send("No element with given id found .. try again.");


})

app.get("/user/map/:id" , (req,res)=>{
    try{
    const id = parseInt(req.params.id);
    const tick = performance.now();
    const user = mp.get(id);
    const tock = performance.now();
    console.log(`${tock - tick}`);
    res.status(200).send(`user id : ${id} found in ${tock - tick}ms`)
    }catch(error){
        throw new Error(error);
    }
   

})
app.listen(3000 , (req,res)=> {
    console.log("server is up and running at port 4000")
})