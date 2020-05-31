// deleting any undefined or null values in packet

function packetCleanup(packet){

    for (let key in packet){
        if(key === undefined || key === '' || key === null){
            delete packet[key]
        }
    }

    return packet

}

module.exports = packetCleanup