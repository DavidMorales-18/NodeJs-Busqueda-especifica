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

async function getCountry(pais, cod) {
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
        if (va[1] === cod) {
            return pais
        }
    }
}

async function getSuscrip(pais, cod, year) {
    for (var i = 0; i < pais.length; i++) {
        let va = Object.values(pais[i]);
        if (va[1] == cod) {
            suscrip = va[year - 1956]
            return suscrip
        }
    }
}


async function getMedia(pais, year) {
    let sum = 0;
    let prom = 0
    for (var i = 0; i < pais.length; i++) {
        let va = Object.values(pais[i]);
        let num = Number(va[year - 1956])
        if (num > 0) {
            prom++;
            sum = sum + num;
        }
    }
    if (prom > 0) {
        prom = (sum / prom).toFixed(3)
        return prom
    }
}




async function getTop5Mayor(pais, year, suscriPais) {
    let top = [];
    for (let dato of pais) {
        dato = Object.values(dato);
        suscrip = Number(dato[year - 1956]);
        if (suscrip > suscriPais) {
            let datos = {
                Pais: dato[0],
                Suscripciones: suscrip
            }
            top.push(datos);
        }
        top.sort(function(a, b) {
            return (a.Suscripciones - b.Suscripciones)
        })
        top = top.slice(0, 5)
    }
    return top
}





async function getTop5Menor(pais, year, suscriPais) {
    let top = [];
    for (let dato of pais) {
        dato = Object.values(dato);
        suscrip = Number(dato[year - 1956]);
        if (suscrip < suscriPais) {
            let datos = {
                Pais: dato[0],
                Suscripciones: suscrip
            }
            top.push(datos);
        }
        top.sort(function(a, b) {
            return (b.Suscripciones - a.Suscripciones)
        })
        top = top.slice(0, 5)
    }
    return top
}
async function getTop5(pais, year) {
    let top = [];
    let num = 0;
    for (let dato of pais) {
        dato = Object.values(dato);
        suscrip = Number(dato[year - 1956]);
        if (suscrip > num) {
            let datos = {
                Pais: dato[0],
                Suscripciones: suscrip
            }
            top.push(datos);
        }
        num = suscrip;
        top.sort(function(a, b) {
            return (b.Suscripciones - a.Suscripciones)
        })
        top = top.slice(0, 5)
    }
    return top
}

async function imprimir(path, cod, year) {
    let pais = await getData(path);
    if (pais != "Error 200") {
        let Country = await getCountry(pais, cod);
        if (Country == true) {
            if (year >= 1964 && year <= 2019) {
                console.log(" -----------------------------------------------------------------------------------------".bgGreen);
                console.log("| ".bgGreen + `\n` + "| ".bgGreen + "    " + `::::Archivo ${path} cargado correctamente::::`.bgCyan);
                console.log("| ".bgGreen + `     Pais: `.brightYellow + `${cod}`.brightCyan);
                console.log("| ".bgGreen + `     Año: `.brightYellow + `${year}`.brightCyan);
                let Countr = await getCountr(pais, cod);

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