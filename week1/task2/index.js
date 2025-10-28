const express = require('express');
const {MusicQueue,linearRef , player} = require('./root/baseDataStructure');
const app = express();

// Our server's "in-memory" queue.
//  In a real app this might be per-user in a session.

const playerQueue = new MusicQueue();
// (We'd also have POST /add , POST /next, etc.)

app.delete('/queue/remove/:songId', (req,res)=>{
    const{songId} = req.params;
    // Implementation A -dll
    const tick = performance.now();
    player.removeSong(songId);
    const tock = performance.now();

    res.send(`Removed song in ${tock-tick}ms. (DLL)`);

    // // Implementation B: Arrays
    // const ticks = performance.now();
    // // 1. find the index (already O(n) slow)
    // const indexToRemove = linearRef.findIndex(song => song.id == songId);
    // if(indexToRemove >-1){
    //     // 2. Remove using splice (also O(n) slow)
    //     linearRef.splice(indexToRemove,1);
    // }
    // const tocks = performance.now();
    // res.send(`Removed song in ${tocks - ticks}ms . (Array)`)
})

app.listen(3000 , ()=>{
    console.log(`server is running on port 8000`);
})