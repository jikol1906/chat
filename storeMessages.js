const jsonReader = require('jsonfile');



module.exports.write = function(data) {
    jsonReader.readFile(__dirname + '/messages.json')
        .then(({lastMessages}) => {

            console.log(lastMessages.length);

            if(lastMessages.length >= 20) {
                lastMessages.shift();
            }

            lastMessages.push(data);

            jsonReader.writeFile(__dirname + '/messages.json',{lastMessages})
                .then(res => console.log('complete'))
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error));
};



