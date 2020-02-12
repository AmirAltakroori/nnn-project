 # Admin panel

Admin panel is where the content of "شبكة الوحدة الاخبارية" website is managed.

## Table of contents
* [General information](#general-info)
* [Users](#users)
* [Loging in](#loginin)

## General information
The admin panel is where  new news, categories and users can be created , updated or deleted , In addition the news can be approved before publish and the site mode can be cotrolled . All these operations are alowed to make based on user role. 

## Users
There are 3 roles for users of admin panel which are : main admin, admin, and writer. there is a hierarchy relationship between them since main admin has the most capabilites and writer has the least.

## Loging In
 When loging in, the user information will be saved in a hashed token using secrete key and then apply base46 encodeing to it.


