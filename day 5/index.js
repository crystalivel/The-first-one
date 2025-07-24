const Myperson = {
    firstName: "Yassine",
    lastName: "Maati",
    age: 23,
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
        set fullName(changedFullname){
            const [first, last] = changedFullname.split(" ");
            this.firstName = first;
            this.lastName = last;
 
        }

}
    class person {
        constructor(name,age){
            this.name = name; 
            this.age = age;
        }
        compareAge(otherPerson){
            if (this.age > otherPerson.age){
                return `${this.name} is older than ${otherPerson.name}`
            }else if(this.age < otherPerson.age) {  
                return `${otherPerson.name} is older than ${this.name}`
            } else 
                return `they are the same age`
        }
    }
    const p1 = new person("john adams",20);
    const p2 = new person("lily adams",32);
    const p3 = new person("pere cottard",46); 


      class reccuringNumbers {
        constructor(arr,count){
        this.arr = arr;
        this.count = count; 
        }
        }
        
    const reccurant = new reccuringNumbers([1,2,3,4,5,6,7,8,9,1,5,6],0);
