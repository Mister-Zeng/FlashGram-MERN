# FlashGram

This is the solution to the FlashGram App 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Deployment](#built-with)
  - [What I learned](#deployment)
  - [Continued development](#continued-development)
- [Author](#author)


## Overview

### The challenge

Users should be able to:

- Sign up/ login / log out
- Create posts
- Edit post
- View a list of user's posts
- View a list of posts posted by all users on the app
- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements on the page

### Screenshot

![](./client/src/images/demo.gif)

### Links

- Solution URL: [https://github.com/Mister-Zeng/FlashGram-MERN]
- Live Site URL: [https://flashgram.herokuapp.com]

### Login crendential / Register your own

Username: jakebonds110
Password: test123

## My process

### Built with

- React
- Node
- Express
- MongoDB Atlas
- Redux
- Material UI

### Deployment

I pushed the code to heroku and deployed, but I have the client side and server side im their each own folder so it was a little tricky since this approach dont work with heroku. 

This is what I did:


 I created a **package.json** file in the root directory and written the following in it.

```json
{
    "name": "rollcall-rooms",
    "version": "1.0.0",
    "main": "",
    "scripts": {
        "start": "npm start --prefix server",
        "install-client": "cd client && npm install && npm run build && cd ..",
        "install-server": "cd server && npm install && cd .. ",
        "heroku-postbuild": "npm run install-client && npm run install-server"
    }
}
```

`heroku-postbuild` - Run's the command after installing the node_modules in root directory.

### What I learned

This is a first full stack social media application using the MERN stack. This application helped me understand all the function of a full CRUD application. 

### Continued development

In my continued development, I want to create more optimized applications. 

## Author

- Website - [Jason Zeng](https://mister-zeng.github.io/Portfolio-Website/)
- Twitter - [@misterzeng](https://www.twitter.com/misterzeng)
