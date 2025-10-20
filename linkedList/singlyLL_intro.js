class Node{
    constructor(data , next = null){
        this.data = data;
        this.next = next;
    }
}

class SinglyLinkedList{
    // init a new empty singlyLinkedList
    constructor(){
        this.head = null;
    }
    insertInFront(data){
        // create new Node using data and pointer.
        const newNode = new Node(data, this.head);
        // assign the head pointer that points to first element of ll
        // to this newNode.
        // this.head -> node1 -> node2 -> node3 -> null.....
        this.head = newNode;
    }
    insertToBack(data){
        // create a new node with the given data
        const newNode = new Node(data);
        // yeah from the constructor its head points to null..
        if(this.isEmpty()){
            // this is check on node since the object made 
            // from class will be a ll node and if there exists nothing, if its empty..
            this.head = newNode;
            // make this new Node as the head..
            return;
        }
        // Ie there exists a link and current store the address of 1st node.. 
        let current = this.head;
        // while node on which u stand has a hook to next block
        // keep moving forward and when its not..
        while(current.next !== null){
            current = current.next;
        }
        // us simply assign the next pointer pointing to null to
        // this newNode created and by def newNode already points to nul.
        current.next = newNode;

    }
   // the task of this method is simple..
   // its to give data if the index of the node was given..
    get(index){
        // handling the edge case if index passed is less than 0.
        if(index < 0){
            throw new Error("Index must be non-negative.");
        }
        // if a valid index , then assign the address to first node to
        // current variable.
        // create another variable name curIndex its just for keeping track for the
        // index of node current is currently pointing to..
        let current = this.head;
        let currentIndex = 0;

        while(currentIndex < index && current !== null){
            current = current.next;
            currentIndex++;
            // keep moving forward and increment Index var
            // along with it.
        }
        // After the loop, if `current` is null, it means we went past the
        // end of the list. This happens if the index was greater than or
        // equal to the list's length.
        if(current == null){
            throw new Error("Index out of bounds.");
        }
        return current.data;
    }

    // predicate is a function to test each node's data.

    search(predicate){
        let current = this.head;
        while( current !== null){
            // if not at the end of sll
            if(predicate(current.data)) {
                return current.data;
            }
            current = current.next;
        }
        return null
    }

    delete(target){
        if (this.isEmpty()){
            throw new Error(`Can't delete from an empty list`);
        }

        // Case 1: The head node is the target
        if(this.head.data === target){
            this.head = this.head.next;
            return;
        }
        let current = this.head;
        let previous = null;
        
        // traverse the list to find the target
        while(current !== null && current.data !== target){
            previous = current;
            current = current.next;
        }

        // case 2 target not found
        if(current == null){
            throw new Error(`no element with value ${target} was found.`);
        }
        previous.next = current.next;
    }
    deleteFromFront(){
        if (this.isEmpty()){
            throw new Error("Cannot delete from an empty list.");
        }
        // get the first element
        const data = this.head.data;
        // so the reference to 1st node now refers to next of 1st node i.e node 2
        this.head = this.head.next;
        // right it returns the removed element
        return data;
    }

    isEmpty(){
        // straight enough .. if end points to null and 1st node is null 
        // then ll is empty.
        return this.head == null;
    }
    size(){
        let count = 0;
        let current = this.head;
        while(current != null){
            count++;
            current = current.next;
        }
        return count;
    }
    traverse(callback){
        let current = this.head;
        const result = [];
        while(current !== null){
            result.push(callback(current.data));
            current = current.next;
        }
        return result;
    }
    toString(){
        if (this.isEmpty()){
            return "empty";
        }
        // the callback converts each data item to its string representation
        const stringify = (data) => JSON.stringify(data);
        return this.traverse(stringify).join(" -> ");
    }
}

const list = new SinglyLinkedList();
console.log("Is list empty?", list.isEmpty());
console.log("List:" , list.toString());

// 2. Add items to the list
list.insertInFront(10);
list.insertToBack(20);
list.insertInFront(5);
list.insertToBack({id: 30 , name: "thirty"});

// checking the state of list.
console.log("List:" , list.toString());
console.log("List size:" , list.size());
console.log("Is list Empty" , list.isEmpty());

// get and item by index
try{
    const item = list.get(2);
    console.log("Item at index 2:" , item);
} catch(e){
    console.error(e.message);
}

// search for an item:
const foundItem = list.search(data => typeof data == 'object' && data.id == 30);
console.log("Found item:" , foundItem);

const notFound = list.search(data => data === 99);
console.log("Item 99 found:" , notFound);

// Delete items
try{
    list.delete(10);
    console.log("After deleting 10:" , list.toString());

    const deletedFront = list.deleteFromFront();
    console.log("Deleted from front:" , deletedFront);
    console.log("After deleting front:" , list.toString());
}
catch(e){
    console.error(e.message);
}

