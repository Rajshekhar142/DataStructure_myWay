// a single song in our queue
class QueueNode{
    constructor(song){
        this.song = song; // e.g , { id : "uuid-123" , title: 'Song Title' }
        this.next = null;
        this.prev = null;
    }
}

// Manages the queue
class MusicQueue{
    constructor(){
        this.head = null;
        this.tail = null;
        this.currentlyPlaying = null; // our current song pointer
        // This Map is our "database" for O(1) node lookup
        this.nodeMap = new Map();
        // so does this mean u fetch the data from database and store the value in map or something?
    }

    // methods to addSong , playNext, playPrev
    /**
     * Adds a new song to the end (tail) of the queue.
     * @param {object} song - The song object (must have an 'id' and 'title')
     */
    addSong(song){
        
        if(!song || typeof song.id === 'undefined'){
            console.error("Invalid song object. Must have and 'id' .");
            return;
        }
        if(this.nodeMap.has(song.id)){
            console.warn(`Song "${song.title}" is already in the queue. `);
            return; // Don't add duplicates
        }
        const newNode = new QueueNode(song);
        this.nodeMap.set(song.id , newNode);

        if(this.head == null){
            // List is empty
            this.head = newNode;
            this.tail = newNode;
        }
        else{
            // Add to the tail (end)
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        console.log(`Added : ${song.title}`);

    }
    /**
     * plays the next song from the front (head) of the queue.
     * @returns {object|null} The song object, or null if queue is empty.
     */

    playNext(){
        if(this.head === null){
            console.log("Playlist/Queue is empty. Nothing to play next.");
            return null;
        }
        let songToPlay;
        if(this.currentlyPlaying === null){
            // if nothing is playing , start from the head
            this.currentlyPlaying = this.head;
            songToPlay = this.currentlyPlaying.song;
        }
        else if (this.currentlyPlaying.next === null){
            // if we are at the end, stop or loop (we'll stop)
            console.log("End of playlist.");
            return null;
        }
        else{
            // Move to the next song
            this.currentlyPlaying = this.currentlyPlaying.next;
            songToPlay = this.currentlyPlaying.song;
        }
        console.log(`playing: ${songToPlay.title}`);
        return songToPlay;
        
    }

    /**
     * Removes and returns the last song from the end (tail) of the queue.
     * (This is an O(1) operation, useful for a "play last added" feature).
     * @returns {object|null} The song object, or null if queue is empty.
     */

    playPrev(){
        if(this.head === null){
            console.log("Queue is empty. Nothing to play previous.");
            return null;
        }
        let songToPlay;
        if(this.currentlyPlaying === null || this.currentlyPlaying.prev === null){
            // if nothing is playing , or we're at the start , we can't go back
            console.log("At the start of the playlist.");
            return null;
        }
        else{
            // Move to the previous song
            this.currentlyPlaying = this.currentlyPlaying.prev;
            songToPlay = this.currentlyPlaying.song;

        }
        console.log(`playing : ${songToPlay.title}`);
        return songToPlay;
        
    }

    removeSong(songId){
        // 1. Find the node in O(1) time
        const nodeToRemove = this.nodeMap.get(songId);
        if(!nodeToRemove) return; // Not in the queue
        // **Crucial check**: What if we remove the *currently playing* song?
        // We must move the pointer before deleting!
        if (this.currentlyPlaying === nodeToRemove) {
            if (nodeToRemove.next) {
                this.currentlyPlaying = nodeToRemove.next;
            } else if (nodeToRemove.prev) {
                this.currentlyPlaying = nodeToRemove.prev;
            } else {
                // It was the only song; playlist is now empty
                this.currentlyPlaying = null;
            }
        }

        // 2. Adjust the 'prev' node's 'next' pointer
        if(nodeToRemove.prev){
            nodeToRemove.prev.next = nodeToRemove.next;
            // so if 3rd points to 5th
            // i should also make 5 th point backward to 3rd right?
            
        }
        else{
            // this was the head node
            this.head = nodeToRemove.next;
        }
        // 3. Adjust the 'next' node's 'prev' pointer
        if (nodeToRemove.next){
            nodeToRemove.next.prev = nodeToRemove.prev;
        }
        else{
            // this was the tail node
            this.tail = nodeToRemove.prev;
        }
        // 4. Remove from our lookup map
        this.nodeMap.delete(songId);
    }

printQueue() {
    if (this.head === null) {
        console.log("Queue: [empty]");
        return;
    }
    let current = this.head;
    const songs = [];
    while (current) {
        let title = current.song.title;
        // Add a marker to the currently playing song
        if (current === this.currentlyPlaying) {
            title = `▶ ${title} ◀`; 
        }
        songs.push(title);
        current = current.next;
    }
    console.log(`Queue: ${songs.join(' <-> ')}`);
}
}

// Testing of the code Begins here..
// --- TEST SCRIPT ---

// 1. Define our songs
// const song1 = { id: '11', title: 'The Weeknd - Bapatized in Fear' };
// const song2 = { id: '2', title: 'Vai Vai Trair' };
// const song3 = { id: '3', title: 'Life is Good' };
// const song4 = { id: '4', title: 'Look at me' };
// const song5 = { id: '5', title: 'The Weeknd - Is there Someone else or not?' };

// // needs to be exported for test cases..
// const linearRef = [];

// linearRef.push(song1);
// linearRef.push(song2);
// linearRef.push(song3);
// linearRef.push(song4);
// linearRef.push(song5);

// // 2. Create the player and add songs
// console.log("--- Adding Songs ---");
// const player = new MusicQueue();
// player.addSong(song1);
// player.addSong(song2);
// player.addSong(song3);
// player.addSong(song4);
// player.addSong(song5);
const SONG_COUNT = 10000;

// needs to be exported for test cases..
const linearRef = [];

// 2. Create the player
const player = new MusicQueue();

console.log(`--- Adding ${SONG_COUNT} Songs ---`);

// 3. Create a loop to generate and add songs
for (let i = 1; i <= SONG_COUNT; i++) {
    // Create a new song object
    const newSong = {
        id: 's' + i, // 's1', 's2', 's3', ...
        title: `Song ${i}`
    };

    // Add to the slow array
    linearRef.push(newSong);

    // Add to the fast MusicQueue
    // player.addSong(newSong);
}

console.log("--- Song Loading Complete ---");
// player.printQueue(); // Print initial state

// // 3. Test playNext and playPrev
// console.log("\n--- Testing Play Controls ---");
// player.playNext(); // Start playing
// player.printQueue();

// player.playNext(); // Play next
// player.printQueue();

// player.playPrev(); // Go back
// player.printQueue();

// console.log("\n--- Going to End of Playlist ---");
// player.playNext();
// player.playNext();
// player.playNext(); // Should be at the last song
// player.printQueue();
// player.playNext(); // Try to play past the end

// // 4. Test the O(1) removeSong (from the middle)
// console.log("\n--- Testing O(1) Remove (Middle) ---");
// console.log("Removing (3)...");
// player.removeSong('3');
// player.printQueue(); // Check if it's gone

// // 5. Test removing the *currently playing* song
// console.log("\n--- Testing Remove (Current Song) ---");
// console.log("Playing 'Is there Someone else or not?'...");
// player.playPrev(); // Go back to Is there Someone else or not?
// player.playPrev(); 
// player.printQueue(); 

// console.log("Removing (2) *while* it's playing...");
// player.removeSong('2'); // Pointer should move to the *next* song Look at me
// player.printQueue();

// console.log("\n--- Testing Playlist Integrity ---");
// console.log("Playing next from 'The Weekend - Bapatized in Fear'...");
// player.playPrev(); // Go to start
// player.playNext(); // Should skip the removed songs and go to 'Imagine'
// player.printQueue();

module.exports =  {linearRef , player, MusicQueue};