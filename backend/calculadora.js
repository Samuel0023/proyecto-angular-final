'use strict'



console.log("Hola Mundo Con Node Js");


var params = process.argv.slice(2);

console.log(params);

var numero1 = parseFloat(params[0]);

var numero2 = parseFloat(params[1]);

let json = {
    'suma': `${numero1 + numero2}`,
    'resta': `${numero1 - numero2}`,
    'multiplicacion': `${numero1 * numero2}`,
    'division': `${numero1/numero2}`

}


let plantilla = `
    la suma  es          : ${json.suma}

    la resta es          : ${json.resta}

    la multiplicacion es : ${json.multiplicacion}

    la division es       : ${json.division}
`;

console.log(plantilla);

console.log(json);