var fs = require("fs");
var Record = require("./models/record");

module.exports = function(app) {

    //Middleware para procesar las fotografías
    app.post("/api/guardarEjecucion", function(req, res, next){
        var fotografias = req.body.photos;
        var fotografiasId = [];

        var nombreCarpeta = req.body.name + "_" + req.body.gen + "_" + req.body.age;
        var ubicacionCarpeta = process.cwd() + "\\fotografias\\" + nombreCarpeta;

        if (!fs.existsSync(ubicacionCarpeta)){
            fs.mkdirSync(ubicacionCarpeta);
        }

        ubicacionCarpeta += "\\evaluacion_" + req.body.evaluacion + "\\";

        if (!fs.existsSync(ubicacionCarpeta)){
            fs.mkdirSync(ubicacionCarpeta);
        }
        
        var timeStamp = Math.floor(Date.now());

        fotografias.forEach(function(fotografia){
            fotografia = fotografia.replace("data:image/jpeg;base64,","");

            var nombre_fotografia = req.body.evaluacion + "_" + timeStamp + "_" + nombreCarpeta + ".jpeg";
            timeStamp++;

            fotografiasId.push(nombre_fotografia);
            
            fs.writeFile( ubicacionCarpeta + nombre_fotografia, fotografia,"base64",
                function(error){
                    if (error)
                        console.error(error);
                }
            );
        });

        req.body.photos = fotografiasId;

        next();
    });

    app.post("/api/guardarEjecucion", function(req, res){

        //Guardar en base de datos
        Record.create({
            evaluacion : req.body.evaluacion,
            time : req.body.time,
            name : req.body.name,
            age : req.body.age,
            gen : req.body.gen,
            photos : req.body.photos,
            happy : req.body.happy,
            sad : req.body.sad,
            angry : req.body.angry,
            fear : req.body.fear,
            frustration : req.body.frustration,
            boredom : req.body.boredom,
            chain_answer : req.body.chain_answer,
            chain_level : req.body.chain_level,
            gain : req.body.gain,
            level_difficulty : req.body.level_difficulty,
            codecolor : req.body.codecolor,
            namecolor : req.body.namecolor,
            soundnumber : req.body.soundnumber,
            result : req.body.result
          }, function(err, result){

            if (!err)
                res.json("{result:'OK'}");
        });
    });


    app.use("/es-es/mc/:id", function(req, res){
        var id = req.params.id;
        res.render(id+".pug");
    });
};