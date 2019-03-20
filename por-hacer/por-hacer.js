const fs = require('fs');

let listadoPorHacer = [];

let guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile("db/data.json", data, err => {
        if (err) throw new Error('No se pudo grabar', err);
    })
}

let cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}

let crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    }
    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}


let getListado = (completado = 2) => {
    return new Promise((resolve, reject) => {
        cargarDB();
        let listado = [];

        if (!Number(completado) && completado != 0) {
            reject('El valor ingresado debe ser un número');
            return [];
        }
        if (completado > 2 || completado < 0) {
            reject('El valor ingresado debe ser entre 0, 1 o 2');
            return [];
        }
        switch (completado) {
            case 0:
                listado = listadoPorHacer.filter(tarea => {
                    return tarea.completado == false;
                });
                resolve(listado);
            case 1:
                listado = listadoPorHacer.filter(tarea => {
                    return tarea.completado == true;
                });
                resolve(listado);
            default:
                resolve(listadoPorHacer);
        }

    })
}


let actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

let borrar = (descripcion) => {
    cargarDB();

    let listadoNuevo = listadoPorHacer.filter(tarea => { tarea.descripcion !== descripcion });

    if (listadoNuevo.length === listadoPorHacer.length) {
        return false;
    } else {
        listadoPorHacer = listadoNuevo;
        guardarDB();
        return true;
    }

}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}































