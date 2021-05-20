const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

// Path where the session data will be stored
const SESSION_FILE_PATH = './session.json';

// Load the session data if it has been previously saved
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

// Use the saved values
const client = new Client({
    session: sessionData
});

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});


client.on('message', msg => {

    var mensaje = msg.body.toLowerCase();


    if (mensaje.includes("gerard")) {

        msg.reply('Gerard maricon');
        client.sendMessage(msg.from,'he creado este bot solo para insultarte');
    }


    if (mensaje.includes("hola")) {

        msg.reply('Hola soy el bot de Alejandro');
        client.sendMessage(msg.from,'¿Que necesitas?');
        client.sendMessage(msg.from,'Escribe !hablar para hablar con Alejandro');
        client.sendMessage(msg.from,'Escribe !nada para dejar tranquilo a Alejandro');
    }

    if(mensaje == '!hablar'){

        client.sendMessage(msg.from,'Vale aviso a Alejandro');

    }

    if(mensaje == '!nada'){

        client.sendMessage(msg.from,'Pues nada adios');

        
    }

});

client.on('message_create', msj =>{
    
    if(msj.body.includes("!email")){
        var result = getEmail(msj.body);
        console.log(result)
        msj.reply("Email enviado a "+result);
    }
})

getEmail = (email) =>{

    var regex = /\{([^\]]+)}/g,
    match = regex.exec(email);
    return match[1];

}



client.initialize();