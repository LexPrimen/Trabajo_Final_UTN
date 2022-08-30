create database UsuariosTPfinal;

use UsuariosTPfinal;

create table users(

id int unsigned auto_increment not null primary key,
nombre varchar(80) not null,
apellido varchar(80)not null,
edad  smallint not null,
mail varchar(94) not null ,
usuario varchar(50) not null,
contraseña varchar(50) not null
);

