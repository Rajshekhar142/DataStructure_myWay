# 📈 O(n) vs. O(1): The Live Performance-Toggle Project

This project is a hands-on experiment in a real Express.js server that proves the *massive* performance impact of choosing the right data structures.

We set out to answer one question: **"Does my choice of data structure *really* matter for a simple 'remove song' feature?"**

By toggling one line of code in our server's `/delete` route, we proved that it **absolutely does.** We compared a "simple" Array-based removal to a more "complex" Doubly Linked List + Map implementation and saw a **10x performance gain** (0.54ms vs 0.05ms) when deleting from a 10,000-song playlist.

---

## 💡 What We Proved: The "Why"

This project was a battle between two different time complexities:

### 1. 🐢 The "Slow" Way: Array (`linearRef`) - $O(n)$

When we used a simple array, a `DELETE /song/s9500` request forced our server to do **two $O(n)$ (Linear) operations**:

1.  **`findIndex()` ($O(n)$):** To find the song with `id: 's9500'`, the server had to loop through the array, checking **9,500 items** one by one.
2.  **`splice()` ($O(n)$):** After finding it, `splice()` had to remove the item and then **shift 500 items** (from 9,501 to 10,000) one position to the left to fill the gap.

This work scales *directly* with the size of the playlist. More songs = more work.

### 2. 🚀 The "Fast" Way: `MusicPlayer` (DLL + Map) - $O(1)$

When we used our `MusicPlayer` class, the *same* `DELETE /song/s9500` request performed **three $O(1)$ (Constant) operations**:

1.  **`nodeMap.get()` ($O(1)$):** The **`Map`** performed a hash lookup. It *instantly* calculated the memory address for `'s9500'` and found the node in a single step.
2.  **Pointer Swap ($O(1)$):** The **`DoublyLinkedList`** logic just re-wired the neighbors. It told song #9,499 "your `next` is now #9,501" and told #9,501 "your `prev` is now #9,499". This is just two pointer changes.
3.  **`nodeMap.delete()` ($O(1)$):** The `Map` instantly removed the reference to the node.

This work is *constant*. The time to delete song #9,500 was the same as deleting song #1. The size of the playlist **did not matter.**

---

## 🛠️ How The Code is Set Up

The project consists of two main parts that are loaded into an Express server.

1.  **The Data Structures (`baseDataStructure.js`)**
    * **`linearRef`:** A single, massive array of 10,000 song objects.
        ```javascript
        // [{id: 's1', title: 'Song 1'}, {id: 's2', ...}, ...]
        const linearRef = []; 
        ```
    * **`player` (MusicQueue):** A custom class that holds 10,000 songs and maintains *two* structures:
        * A **`DoublyLinkedList`** for tracking play order ($O(1)$ `playNext`/`playPrev`).
        * A **`Map`** for instant ID-based lookup ($O(1)$ `removeSong`).

2.  **The Server (`index.js`)**
    * A simple Express server.
    * It imports both `linearRef` and `player`.
    * It has one main route: `DELETE /song/:id`.
    * **This route is where the magic happens.** You can toggle which implementation is active just by commenting/uncommenting the code block.

---

## 🧪 How to Test It Yourself

Follow these steps to replicate our findings.

### Step 1: Install & Run the Server

First, get the server running from your terminal:

```bash
# Install dependencies (if you haven't)
npm install

# Run the server
node index.js

The server will log that it's "Adding 10,000 Songs..." and then listen on its port.

Step 2: Configure the "Slow" TestIn your index.js file, make sure the Array (linearRef) logic is uncommented in your delete route:JavaScript// Example in your index.js delete route

app.delete('/song/:id', (req, res) => {
    const { id } = req.params;
    const startTime = performance.now();

    // --- 🐢 SLOW O(n) METHOD ---
    const indexToRemove = linearRef.findIndex(song => song.id == id);
    if(indexToRemove > -1){
        linearRef.splice(indexToRemove,1);
    }
    // ----------------------------

    // --- 🚀 FAST O(1) METHOD ---
    // player.removeSong(id);
    // ----------------------------

    const endTime = performance.now();
    res.json({ timeTaken_ms: (endTime - startTime) });
});


Step 3: Run the Test (Array)Open a second terminal (leave the server running). We will use curl to delete a song near the end of the list to see the worst-case performance.Bash# Send a DELETE request for song #9,500
curl -X DELETE "http://localhost:3000/song/s9500"
You will get an instant response in your terminal:JSON{"timeTaken_ms":0.54832...} 
Note this time. This is the $O(n)$ cost.Step 4: Configure and Run the "Fast" TestNow, let's see the difference.Stop your server (Ctrl+C).Go back to your index.js and swap the comments:JavaScript// --- 🐢 SLOW O(n) METHOD ---
// const indexToRemove = linearRef.findIndex(song => song.id == id);
// if(indexToRemove > -1){
//     linearRef.splice(indexToRemove,1);
// }
// ----------------------------

// --- 🚀 FAST O(1) METHOD ---
player.removeSong(id);
// ----------------------------
Restart the server: node index.js.Go back to your second terminal and run the exact same command:Bash# Send the *same* DELETE request for song #9,500
curl -X DELETE "http://localhost:3000/song/s9500"
You will get another instant response:JSON{"timeTaken_ms":0.05104...}
This is the $O(1)$ cost. You just proved that by choosing the right data structure, you made the exact same feature 10 times faster.