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
}