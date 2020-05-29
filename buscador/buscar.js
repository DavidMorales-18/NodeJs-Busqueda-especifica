let path = 'API_IT.CEL.SETS_DS2_es_csv_v2_1004854.csv';
const csv = require("csvtojson");
const colors = require('colors');


async function getData(file) {
    try {
        const datos = await csv().fromFile(file);
        let data = []
        for (var i = 2; i < datos.length; i++) {
            data.push(datos[i])
        }
        return data;
    } catch (error) {
        error = "Error 200"
        return error;
    }
}
async function getCountry(pais, cod) {
    for (var i = 0; i < pais.length; i++) {
        let va = Object.values(pais[i]);
        if (va[1] == cod) {
            return true
        }
    }
}

async function getCountry(pais, cod) { ///ingresar al metodo
    for (var i = 0; i < pais.length; i++) {
        let va = Object.values(pais[i]);
        if (va[1] == cod) {
            return true
        }
    }
}

async function getCountr(pais, cod) {
    for (var i = 0; i < pais.length; i++) {
        let va = Object.values(pais[i]);
        if (va[1] == cod) {
            return va[0]
        }
    }
}
async function getEle(pais, cod) {
    for (var i = 0; i < pais.length; i++) {
        let va = Object.values(pais[i]);
        if (va[1] == cod) {
            return va[2]
        }
    }
}

async function imprimir(path, cod, year) {
    let pais = await getData(path);
    //console.log(pais);
    if (pais != "Error 200") {
        let Country = await getCountry(pais, cod);
        let ele = await getEle(pais, cod);

        if (Country == true) { //verdadero 

            if (year >= 1964 && year <= 2019) {

                let Countr = await getCountr(pais, cod);
                console.log("   ____________________________________________________________________________________________________".bgGreen);

                console.log("| ".bgGreen + `\n` + "| ".bgGreen + "    " + `::::Archivo ${path} cargado correctamente::::`.bgCyan);
                console.log("| ".bgGreen + `     Datos : `.brightYellow + `${ele}`.bgBlue.brightYellow);
                console.log("| ".bgGreen + `     Codigo-Pais: `.brightYellow + `${cod}`.brightCyan);
                console.log("| ".bgGreen + `     Pais: `.brightYellow + `${Countr}`.brightCyan);
                console.log("| ".bgGreen + `     Año: `.brightYellow + `${year}`.brightCyan);


                console.log("   ____________________________________________________________________________________________________".bgGreen);




            } else {
                console.log('\n     ' + `Al momento no existe registros para el año: ${year} `.bgRed);
            }
        } else {
            console.log('\n     ' + `No existe el codigo de pais: ${cod} en la base de datos. `.bgRed);
        }
    } else {
        console.log(`\n `, `::::No existe el archivo ${path} !::::`.bgRed)
    }


}

module.exports = {
    imprimir

}