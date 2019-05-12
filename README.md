# Real time map with Cesium

This project is made with `React`, `Redux`, `Redux-observable` for async api calls, and socket.io client to emit and listen events. The map and locations are with Cesium using the Cesium react componentes with [resium](https://github.com/darwin-education/resium) and [craco-cesium](https://github.com/darwin-education/craco-cesium) for the create react setup.

The backend of this project is made with `Express` and `socket.io`. Using `PostgreSQL` as the RDBMS.

## Requirements

Minimum node version 8, used:
```bash
node version 8.11.2
```

Sequelize cli and nodemon
```bash
yarn global add sequelize-cli nodemon
```

Postgresql is required

```bash
https://www.postgresql.org/download/
```

## Installation

Front end in root directory run:
```bash
yarn 
```

Back end run:
```bash
$ cd server
$ yarn
```

Set up the database
```bash
$ cd server
$ psql postgres --u postgres

> CREATE ROLE skyc WITH LOGIN PASSWORD 'skyc';
> ALTER ROLE skyc CREATEDB;
> CREATE DATABASE skyc_rt;
> GRANT ALL PRIVILEGES ON DATABASE skyc_rt TO skyc;
> \q
```

Migrate the database, in the server folder (on `./server`)
```bash
sequelize db:migrate
```


## Usage

To run the front end project, in a terminal window run:
```bash
$ yarn start
```

To run the front end project, in a another terminal window run:
```bash
$ cd server
$ yarn start
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
