class Node {
    constructor(data){
        this.data = data;
        this.next = null;
        this.prev = null;
    }

    // append a node after this one..
    append(nextNode) {
        this.next = nextNode;
        if(nextNode != null){
            nextNode.prev = this;
        }
    }
    // prepend a node before this one.. 
    prepend(prevNode){
        this.prev = prevNode;
        if(prevNode !== null){
            prevNode.next = this;
        }
    }
}

class DoublyLinkedList{
    
    constructor(){
        this.head = null;
        this.tail = null;
    }

    isEmpty(){
        return this.head === null;
    }
    insertInFront(data){
        const newNode = new Node(data);
        if(this.head == null){
            // List is empty
            this.head = newNode;
            this.tail = newNode;
        }
        else{
            newNode.append(this.head);
            // makes a 2 way bind nice.
            this.head = newNode;
            // set this new node as new head after it's next is prevHead.

        }
    }

    insertToBack(data){
        const newNode = new Node(data);
        if(this.tail == null){
            // List is empty
            this.head = newNode;
            this.tail = newNode;
        }
        else{
            // List is not empty
            newNode.prepend(this.tail);
            // this is reverse bind <- and then ->
            // newNode.prev = this.tail and this.tail.next = newNode;
            this.tail = newNode;
        }
    }
    deleteFromFront(){
        if(this.isEmpty()){
            throw new Error("Delete on an empty list.");
        }
        const data = this.head.data;
        // get the data of 1st node i.e front
        this.head = this.head.next;
        // the reference to 1st node points to 2nd node.

        if(this.head === null){
            this.tail = null;
        }
        else{
            this.head.prepend(null);
        }
        return data;
    }

    deleteFromBack(){
        // same like delete from front but logic is reversed.
        if(this.isEmpty()){
            throw new Error("Delete on an empty list.");
        }
        const data = this.tail.data;
        this.tail = this.tail.prev;

        if(this.tail == null){
            this.head = null;
        }
        else{
            this.tail.append(null);
        }
        return data;
    }

    delete(target){
        const node = this._search(target);
        if(node === null){
            throw new Error(`No element with value ${target} was found in the list`);
        }
        // Case 1: Node is head
        if (node.prev == null){
            this.head = node.next;
            if(this.head == null){
                this.tail = null;
            }
            // list is now empty
            else{
                this.head.prepend(null);
            }
            // this.head.prev = null;
         
        }
            // case 2 : Node is the tail
        else if(node.next === null){
            this.tail = node.prev;
            // we know tail is not null (because node.prev was not null)
            this.tail.append(null);
            // this.tail.next = null
        
        }
        else {
            node.prev.append(node.next);
        }
        // This single line handles both links:
            // node.prev.next = node.next;
            // node.next.prev = node.prev;

    }
}