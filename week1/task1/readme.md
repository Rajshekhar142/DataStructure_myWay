# O(n) vs. O(1) Search Performance Test

This project demonstrates the critical performance difference between searching a large dataset stored in an **Array ($O(n)$ - Linear Time)** versus a **Map ($O(1)$ - Constant Time)**.

A simple Express.js server is used to simulate API requests for a specific user ID from a in-memory dataset of 1,000,000 users.

---

## Prerequisites

Before you begin, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v18.x or later recommended)
* [npm](https://www.npmjs.com/) (which comes with Node.js)

---

## 1. Installation

1.  Clone this repository or download the source files.
2.  Open your terminal and navigate to the project directory.
3.  Install the necessary dependencies (e.g., `express`):

    ```bash
    npm install
    ```

---

## 2. Running the Server

1.  In your terminal, start the server:

    ```bash
    node index.js
    ```
    *(Note: If you named your file `server.js` or something else, use that name instead.)*

2.  You should see a confirmation message, such as:
    `Server listening on port 3000. Data generation complete.`

The server will first generate the 1,000,000-item dataset into both an Array and a Map. This may take a second, after which it will be ready to accept requests.

---

## 3. How to Test and Observe

Once the server is running, open your web browser or use a tool like `curl` or Postman to test the two endpoints. We will search for a user near the end of the dataset to see the most dramatic difference.

### Test 1: The "Slow" O(n) n O(logn) Array Search

### kindly uncomment and comment the code for whatever search u wanna implement..
### if using linear uncomment binary search and if using binary uncomment linear search.

This endpoint must loop through the array to find the matching user.

* **URL:** `http://localhost:3000/user/array/900000`

### Test 1.1: The "better" O(logn) Array Search

This endpoint must loop through the array to find the matching user.

* **URL:** `http://localhost:3000/user/array/900000`

### Test 2: The "Fast" O(1) Map Search

This endpoint performs a direct lookup by key from the map.

* **URL:** `http://localhost:3000/user/map/900000`

---

## 4. Expected Results 📈

You will see a *dramatic* difference in the `timeTaken` reported in the JSON response for each request.

* **Array $O(n)$ Test:**
    You'll notice a clear delay. The `timeTaken` will be in the range of **1-3 milliseconds** (e.g., `1.84... ms`). This is because the server had to check, on average, 900,000 items