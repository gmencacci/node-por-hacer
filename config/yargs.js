const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
}

const completado = {
    alias: 'c',
    default: true,
    desc: 'Marca como completado o pendiente la tarea'
}

const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion,
        completado
    })
    .command('borrar', 'Borra una tarea de la lista', {
        descripcion
    })
    .command('listar', 'Lista las tareas', {
        completado: {                      
            alias: 'c',
            desc: 'Marca el tipo de tarea que se desea listar',            
            default: 2
        }
    })
    .help()
    .argv;


module.exports = {
    argv
}
