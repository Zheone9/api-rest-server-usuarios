const {Schema,model}=require('mongoose')


const UsuarioSchema=Schema({
    cedula:{
        type:Number,
        required:[true,'La cedula es obligatorio'],
        unique:true
    
    },
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio']
    
    },
    correo:{
        type:String,
        required:[true,'El correo es obligatorio'],
        unique:true
    },
    salario:{
        type:Number,
        required:[true,'El salario es obligatorio']
    },
    edad:{
        type:Number,
        required:[true,'La edad es obligatoria']
    },
    genero:{
        type:String,
        required:[true,'El genero es obligatorio']
    },
    clave:{
        type:String,
        required:[true,'La contraseña es obligatoria']
       
    },
    img:{
        type:String,
    
       
    },
    cargo:{
        type:String,
        required:true,
        enum:['Empleado','Administrador']
    },
   estado:{
        type:Boolean,
        default:true
    }

})

UsuarioSchema.methods.toJSON=function(){
    const{__v,clave,...usuario}=this.toObject();
    return usuario;
};

module.exports=model('Usuario',UsuarioSchema);