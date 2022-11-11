# Course and Team Information

IS212 Software Project Management 
AY2022-2023, Term 1 
Section 7 
Team 4

This project is running Nodejs(Backend) and Vuejs(Frontend)
The database used in this project is MySQL

## Authors

* Min Thu Kha - thukha.min.2020 
* Lee Zi Qi - ziqi.lee.2020 
* Leong Wei Qin - wqleong.2020
* Tian Feng - fengtian.2020 
* Tan Yee Khai - yeekhai.tan.2020 
* Wong Kelly - kelly.wong.2020 

# spmg7t4

Git repository: https://github.com/minthukha99/spmg7t4/

## Project setup

```
npm install
min test 
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

## information
### Backend is running at localhost port 3000

Database used is MySQL. Update the config.js file according to local db setup

```
const config = {
    db: {
        host: "localhost",
        port: 8889, //change this
        user: "root", //change this (if needed)
        password: "root",//change this (if needed)
        database: "spm"
        
    },
    listperPage: 10,
};
```



## Running Tests

To run unit tests, run the following command

```bash
./node_modules/.bin/mocha
```
To run integration tests, run the following command

```bash
  npm run test:unit
```

See [Configuration Reference](https://cli.vuejs.org/config/).
