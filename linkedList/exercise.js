/*
6.1  Implement a delete_from_front method that removes and returns the head of
the list. Hint: This is an edge case in the general-purpose delete method.

6.2  Implement the traverse method for singly linked lists. The method should take a
function that can be applied to the data stored in the list and return a Python list
with the result of applying such a function.
*/

class Node{
    constructor(data){
        this.data = data;
        this.next = null;
    }
}
class singlyLL{
    constructor(head){
        this.head = null;
    }
    isEmpty(){
        return this.head === null;
    }
    addToFront(data){
        const n = new Node(data);
        n.next = this.head;
        this.head = n;
    }
    deletefromfront(){
        if(this.isEmpty()){
            throw new Error("can't delete from an empty linked list.");
        }
        let data = this.head.data;
        this.head = this.head.next;
        console.log(data);
        return data;

    }
    
    // Helper to see the list
    printList() {
        let current = this.head;
        let str = "HEAD -> ";
        while (current !== null) {
            str += `[ ${current.data} ] -> `;
            current = current.next;
        }
        str += "NULL";
        console.log(str);
    }
}

const list = new singlyLL();

list.addToFront(3);
list.addToFront(2);
list.addToFront(1);
list.printList(); // Output: HEAD -> [ 1 ] -> [ 2 ] -> [ 3 ] -> NULL

let deleted = list.deletefromfront();
console.log(`Deleted ${deleted}.`); // Output: Deleted 1.
list.printList(); // Output: HEAD -> [ 2 ] -> [ 3 ] -> NULL

deleted = list.deletefromfront();
console.log(`Deleted ${deleted}.`); // Output: Deleted 2.
list.printList(); // Output: HEAD -> [ 3 ] -> NULL

deleted = list.deletefromfront();
console.log(`Deleted ${deleted}.`); // Output: Deleted 3.
list.printList(); // Output: HEAD -> NULL

deleted = list.deletefromfront(); // Output: List is empty. Nothing to delete.
console.log(`Deleted ${deleted}.`); // Output: Deleted null.