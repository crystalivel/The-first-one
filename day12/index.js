const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,         }); 
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

rl.question('input the name', (name) => {
    rl.question(`input the phone number`,(phoneNumber) => {
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
                    rl.close();
                    saveContact(contact)
                    console.log(contact)
                } 
            } )
        }else {
            const contact = {
            name : name,
            phoneNumber: phoneNumber
                            }
            console.log(contact)
            saveContact(contact)
            rl.close();}
         
    }) 
})
