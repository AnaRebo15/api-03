const express = require('express');
const app = express();
const puerto = process.env.PORT || 3000;

app.use(express.json());

let categorias = [
    {id:1,nombre:"Cocina", descripcion:"Elementos para cocinar"},
    {id:2,nombre:"Limpieza", descripcion:"Elementos para limpiar"},
    {id:3,nombre:"Electrónica", descripcion:"Elementos de electronica"},
    {id:4,nombre:"Ropa bebe", descripcion:"Elementos para bebe"},
    {id:5,nombre:"Línea blanca", descripcion:"Elementos de línea blanca"},
    {id:6,nombre:"Jardinería", descripcion:"Elementos para jardinería"},
    {id:7,nombre:"Salud", descripcion:"Elementos de salud"},
    {id:8,nombre:"Muebles", descripcion:"Elementos de mueblería"},
    {id:9,nombre:"Lácteos", descripcion:"Alimentos lácteos"},
    {id:10,nombre:"Licores", descripcion:"Licores"} 
];

app.get('/socios/v1/categorias', (req, res) => {
    //Todas las categorías
    // 1. Verificar si existen categorías
    if (categorias.length>0){
        // 2. Mostrarlas con un estado y mensaje
        res.status(200).json({
            estado:1,
            mensaje: "Existen categorías",
            categorias: categorias
        })
    }else{
        // 3. No existe, mostrar estado y mensaje
        res.status(404).json({
            estado:0,
            mensaje: "No existen categorías"
        })
    }
    // En formato JSON
    // Mostrar mensajes de estado del servidor
});

app.get('/socios/v1/categorias/:id', (req, res) => {
    //Solo una categoría
    const id = req.params.id;
    //Programación funcional
    const categoria = categorias.find(categoria => categoria.id == id);
    //Programación estructurada, es hacer el for, instrucción por instrucción

    if(categoria){
        //Si se encontró la categoría
        res.status(200).json({
            estado:1,
            mensaje: "Se encontró la categoría",
            categoria: categoria
        })
    }else{
        //No se encontró la categoría
        res.status(404).json({
            estado:0,
            mensaje: "No se encontró la categoría"
        })
    }

    res.send('Solo una categoría')
});

app.post('/socios/v1/categorias', (req, res) => {
    //Crear un recurso en el servidor - crear una categoría
    //id aleatorio que no se repita
    // nombre y descripcion vienen del BODY {JSON}
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;

    //const id = Math.round(Math.random(1000));
    //-----------------------------------------------------------------------------------
    let id;
    let categoriaExistente;

    // Genera un ID aleatorio único
    do {
        id = Math.round(Math.random() * 1000);
        categoriaExistente = categorias.find(categoria => categoria.id === id);
    } while (categoriaExistente);
    //-----------------------------------------------------------------------------------

    if(nombre==undefined || descripcion==undefined){
        res.status(400).json({
            estado: 0,
            mensaje: "BAD REQUEST - Faltan parámetros en la solicitud"
        })
    }else{
        const categoria = {id:id, nombre:nombre, descripcion:descripcion}
        let logitudInicial = categorias.length;
        categorias.push(categoria)
        // Comprobar que se creó la nueva categoría
        if(categorias.length > logitudInicial){
            // Todo OK de parte del cliente y servidor
            res.status(200).json({
                estado:1,
                mensaje:"Categoría creada",
                categoria:categoria
            })
        }else{
            res.status(500).json({
                estado:0,
                mensaje:"Ocurrió un error desconocido"
            })
        }
    }
});

app.put('/socios/v1/categorias/:id', (req, res) => {
    //Actualizar una categoría
    const id = req.params.id;
    const {nombre, descripcion} = req.body;
    
    if(nombre==undefined || descripcion==undefined){
        res.status(400).json({
            estado: 0,
            mensaje: "Faltan parámetros en la solicitud"
        })
    }else{
        const posActualizar = categorias.findIndex(categoria => categoria.id == id)
        if(posActualizar != -1){
            //Si encontro la categoría con el id buscado
            categorias[posActualizar].nombre = nombre;
            categorias[posActualizar].descripcion = descripcion;

            res.status(200).json({
                estado: 1,
                mensaje: "Categoría actualizada",
                categoria: categorias[posActualizar]
            })
        }else{
            //No se encontró
            res.status(404).json({
                estado: 0,
                mensaje: "Categoría no encontrada"
            })
        }
    }    
});

app.delete('/socios/v1/categorias/:id', (req, res) => {
    //Eliminar una categoría
    const id = req.params.id;
    const posEliminar = categorias.findIndex(categoria => categoria.id == id)
    
    if(posEliminar != -1){
        //Si encontro la categoría con el id buscado
        categorias.splice(posEliminar, 1); 

        res.status(201).json({
            estado: 1,
            mensaje: "Categoría eliminada"
        })
    }else{
        //No se encontró
        res.status(404).json({
            estado: 0,
            mensaje: "Categoría no encontrada"
        })
    }
});


app.listen(puerto, () => {
    console.log('Servidor corriendo en el puerto: ', puerto);

});