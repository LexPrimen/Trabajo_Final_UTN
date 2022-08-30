const express = require('express');
require('dotenv').config();
const path = require('path');
const hbs = require('hbs');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 8080;

const conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE   
});


console.log();


   conexion.connect((err) => {
    if (err) {
        console.error(`error de conexion: ${err.stack}`)
        return;
    }
    console.log(`conectado a la base de datos ${process.env.DATABASE}`);
});





app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

//CONFIGURACION DEL MOTOR DE PLANTILLAS
app.set('view engine', 'hbs' );
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.get('/', (req, res, next) =>{
    res.render('index', {
        titulo:'Bienvenidos a PrimoGaming ',
        style:'styles.css'
    })
});

app.get('/perifericos', (req,res) =>{
    res.render('perifericos',{
        style:'styles.css'
    })
});

app.get('/teclado', (req,res) =>{
    res.render('teclado',{
        style:'styles.css'
    })
});


app.get('/login', (req,res) =>{
    res.render('login',{
        titulo: 'Iniciar Sesion ',
        style:'styles.css'
    })
});

app.get('/registro', (req,res) =>{
    res.render('registro',{
        titulo: 'Registrarse',
        style:'styles.css'
    })
});


app.post('/registro', (req,res) => {
    
   
     const {nombre,apellido,edad,mail,usuario,contraseña} = req.body; 
        
        console.log(nombre,apellido,edad,mail,usuario,contraseña);
     
            if (nombre =='' || apellido == '' || edad =='' ||  usuario =='' || contraseña =='' ){
            let validacion = 'Rellenar los campos';
    
            res.render('registro', {
                titulo: 'Registrarse',
                style:'styles.css',
                validacion
            });
           } else{
            res.render('validacion', {
                titulo: 'Registro con Exito ',
                style:'styles.css',
          }); 
        
         }
         if (nombre == '' || mail == ''){
            let validacion = 'rellenar los campos necesarios..';
                 
            
         } else{
 
         console.log(nombre),
         console.log(mail);
 
          async function envioMail(){
 
           let transporter = nodemailer.createTransport({
               host: 'smtp.gmail.com',
               port: 465,
               secure: true,
               auth: {
                   user: 'xxxxxx@gmai.com',
                   pass: 'xxxxxxxxxxxxxxxxx',
               }
           });
            
           let envio = await transporter.sendMail({
               from: process.env.USERMAIL,
               to: `${mail}`,
               subject: 'Gracias por Suscribirse a nuestra pagina web',
               html: `Dudas y consultas envie un mail <br>
               Saludos `
           });
            
     
           
       } 
 
       envioMail();
       
    
        let datos = {
            Nombre: nombre,     
            Apellido: apellido,
            Edad: edad,
            Mail: mail,
            Usuario: usuario,
            Contraseña: contraseña
        }
         
          let sql ='INSERT INTO users set ?';
    
          conexion.query(sql, datos, (err, result) => {
            if (err) throw err;
             
            return
                 
             });
            }
        });
          
          
        
    






















        
        
             
        
        


        
        
        
        
        
 
           

    
    
           
    
           


        

      
         
   














app.listen(PORT, () => {
    console.log(`el servidor esta funcionando en el puerto ${PORT}`)
 });
