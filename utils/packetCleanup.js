// deleting any undefined or null values in packet

function packetCleanup(packet){

    for (const key in packet){
        if(key === undefined || key === '' || key === null){
            delete key
        }
    }

    return packet

}

module.exports = packetCleanup