# Sweet Treats - web app
>Ordering and Shopping Cart App created with dva(React), and Ant Design.

## Table of Contents
* [General Info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Setup](#setup)
* [User Guide](#user-guide)
* [Demo Link](#demo-link)

## General info
Sweet Treats is a web app for ordering cakes. I implemented Role-Based Access Control (RBAC) in this app. Therefore, the regular users have the access to order cakes and add them into shopping carts. The administrators have the access to create new menus.

## Screenshots
#### Sign Up Page

![sign up page](https://github.com/TehoChang/Sweet-Treats/blob/master/screenshots/sign%20up%20page.png?raw=true)

#### Ordering Page 

![ordering page](https://github.com/TehoChang/Sweet-Treats/blob/master/screenshots/ordering%20page.png?raw=true)

#### Administration Page 

![administration page](https://github.com/TehoChang/Sweet-Treats/blob/master/screenshots/administation%20page.png?raw=true)

## Technologies
* dva:   
Lightweight front-end framework based on react, redux and react-router.  
[https://github.com/dvajs/dva#community](https://github.com/dvajs/dva#community)
* JavaScript
* Ant Design

## Setup
* Download the source code from the github.   
`$ git clone git@github.com:TehoChang/Sweet-Treats.git`

* Get into the project, and then install the packages.   
`$ npm install`

* Start the project.   
`$ npm start`

## User Guide
The startup process may take up to tens of seconds, depending on your environment.  
To use the app as a regular user, just sign up with Email and password, then sign in.  
To use the app as an administrator, please enter "iamadmin" as  administrator-password when signing up.

## Demo Link
[https://sweeet-treats.netlify.app](https://sweeet-treats.netlify.app/)
