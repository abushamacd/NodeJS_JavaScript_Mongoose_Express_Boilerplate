<hr>

## **_Node, Express and Mongoose Boilerplate_**

<hr>

This boilerplate is follow MVC with service pattern architecture. Here I use

<ul>
<li>Node Js - for server running</li>
<li>Express Js - for create API easily</li>
<li>Dotenv - for environement varriable</li>
<li>Cors - for middleware</li>
<li>Colors - for colorful message</li>
<li>Mongoose - for use mongoDB easily</li>
<li>Nodemon - for simply restarts node application</li>
</ul>

> == N.B.: All underscore (\_) sentence is editable. ==

<br>

### Pre Requirments

Must have to install node js and yarn in your operating system
<br>
<br>

## Follow these steps for running the boilerplate

<br>

<ol>
<li>
Install Dependencies

```bash
yarn install
```

If you need or want update these dependencies by this command

```bash
yarn add express cors dotenv mongoose nodemon colors bcrypt cookie-parser http-status jsonwebtoken winston winston-daily-rotate-file zod
```

</li>
<li>
Just you create a env file in root folder. Like this name

```bash
.env
```

</li>
<li>
Insert the line in the env and replace by yours information

```bash
DB_URI=yours_database_string
NODE_ENV=developement
PORT=5000
BCRYPT_SOLT_ROUND=give_a_number_of_how_much_time_you_want_to_rounding._like_10
JWT_SECRET='your_secret'
JWT_REFRESH_SECRET='your_refresh_secret'
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=365d
```

> N.B: sometimes localhost default connection string (mongodb://localhost:27017) not working so connect string will modify like as (mongodb://127.0.0.1:27017)

</li>
<li>
Server run command

```bash
yarn dev
```

</li>
</ol>

[Visit My Website](https://imshama.com)
