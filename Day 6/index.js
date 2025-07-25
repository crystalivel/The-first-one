function maskify(cc) { 
    cc = cc.toString();
    let ccLength = cc.length 
    let cutlength = ccLength - 4 
    let hash = "#"
    
    if (ccLength < 4 ){
        return cc 
    } else {
        return hash.repeat(cutlength) + cc.slice(cutlength,ccLength)
    }

}