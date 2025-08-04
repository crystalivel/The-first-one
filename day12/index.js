const readline = require('readline');
const fs = require('fs');
const { json } = require('stream/consumers');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,         }); 
function seacharry() {
  rl.question('Input the name of the contact: ', (inputName) => {
    try {
      const contactlist = fs.readFileSync('contactlist.json', 'utf-8');
      const data = JSON.parse(contactlist); // data should be an array of objects

      const person = data.find(
        (contact) => contact.name.toLowerCase() === inputName.toLowerCase()
      );

      if (person) {
        console.log('Contact found:');
        console.log(person);
        footer()
      } else {
        console.log('Contact not found.');
        footer()
      }

    } catch (err) {
      console.error('Error reading contact list:', err.message);
      footer()
    }})}
// read contactlist 
function displayInfo(){
    console.log(`####### Contact ########`)
            const contactlist = fs.readFileSync('contactlist.json')
            data = JSON.parse(contactlist)
        console.log(data)
                    footer()
    }
//search contact 
//save contact 
    function saveContact (contact){
            let data = []
            if (fs.existsSync('contactlist.json')){
                const contactlist = fs.readFileSync('contactlist.json')
                data = JSON.parse(contactlist)
                data.push(contact)
                fs.writeFileSync('contactlist.json', JSON.stringify(data, null, 2));
            } 
    }
// collect info 
function requestInfo(){ 
rl.question('input the name\n', (name) => {
    rl.question(`input the phone number\n`,(phoneNumber) => {
        if (isNaN(phoneNumber)){
            rl.setPrompt(`${phoneNumber} is not a number`)
            rl.prompt()
            rl.on('line',(phoneNumber) => { if (isNaN(phoneNumber)) {
                rl.setPrompt(`wrong try again`)
                rl.prompt()
                } else {
                    const contact = {
                        name : name,
                        phoneNumber: phoneNumber
                    }
                    
                    saveContact(contact)
                    console.log(`${contact.name} contact has been saved`)
                    footer()
                } 
            } )
        }else {
            const contact = {
            name : name,
            phoneNumber: phoneNumber
                            }
                    console.log(`${contact.name} contact has been saved`)
                    footer()
                    saveContact(contact)
            }
         
    }) 
})
}
function mainOp(){
    rl.question(`#########  Pick a programe: \n 1- Create Contact \n 2- Display Contact \n 3- Search Contact \n 4- Exit \n `,(Response) => {
        switch (Response){
            case ('1'): 
            requestInfo()
            break;
            case ('2'):
            displayInfo()
            break;
            case('3'):
            seacharry()
            break;
            case('4'):
            rl.close()  
            break;
            default:
            console.log(`INVALID INPUT`)     
            footer()
            }
    })
}
mainOp()
    function footer(){
        rl.question(`0-GO back | 1- Exit`,(Response)=> {
            switch (Response) {
                case('0'):
                mainOp()
                break;
                case('1'):
                rl.close()
                break;
            }
            })}