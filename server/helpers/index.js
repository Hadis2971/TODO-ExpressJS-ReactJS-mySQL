const _generateTimestamp = () => {
    /*
    let time = new Date().toUTCString();
    let timestamp = time.slice(0, (time.length - 4));
    return timestamp;*/

    let date  = new Date();
    let month = date.getMonth() + 1;
    let day   = date.getDate();
    let year  = date.getFullYear();
    let time = year + "-" + month + "-" + day;
    return time; 
};


module.exports = {
    getTimestamp: () => _generateTimestamp()
}