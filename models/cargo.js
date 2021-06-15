const {Schema,model}=require('mongoose')

const CargoSchema=Schema({
    cargo:{
        type:String,
        required:[true,'El cargo es obligatorio']
    }
})

module.exports=model('Cargo',CargoSchema)