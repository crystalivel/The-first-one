const fs = require ('fs');

    function readFileAsync(filePath,newData){
        return new Promise ((resolve, reject) => {
            fs.writeFile (filePath,newData => {
                if (err) {
                    reject (`Error reading file ${err.message}`);
                } else {
                    resolve('File written successfully');
                }
            });
        });
    }