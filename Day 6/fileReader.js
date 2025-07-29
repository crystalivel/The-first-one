const fs = require ('fs');

    function readFileAsync(filePath){
        return new Promise ((resolve, reject) => {
            fs.readFile (filePath,(err,data) => {
                if (err) {
                    reject (`Error reading file ${err.message}`);
                } else {
                    resolve(data);
                }
            });
        });
    }
    