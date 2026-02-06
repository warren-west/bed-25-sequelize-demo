# Formula 1 DAB Demo
This is a class demo for DAB (Databases 1) to demonstrate how we can use Sequelize to connect to a MySql database, and perform CRUD operations.

## Installation
Clone the repository with the command:
```bash
git clone https://github.com/warren-west/bed-25-sequelize-demo.git
```

Install the necessary dependencies with the command:
```bash
npm install
```

Create an environments file for storing environment variables, it should have the following structure:
```
PORT='<value>'
DB_HOST='<value>'
DB_NAME='<value>'
DB_USER='<value>'
DB_PASS='<value>'
DB_DIALECT='<value>'
```

Amend the scripts in the `package.json` file if you want to enable *watching*:
```json
{
...
    "scripts": {
        "start": "node --watch server.js"
    },
...
}
```

## Valid endpoints
### Drivers

- `GET` `/drivers`: Fetch all drivers from the database.
- `GET` `/drivers/:id`: Fetch a single drivers from the database by ID.
- `POST` `/drivers`: Add a new driver to the database.
- `POST` `/drivers/populate`: Populate the database "drivers" table with data.
- `PUT` `/drivers/:id`: Update a driver details in the database by ID.
- `DELETE` `/drivers/:id`: Delete a driver's record from the database by ID.

### Teams

- `GET` `/teams`: Fetch all teams from the database.
- `GET` `/teams/:id`: *NOT YET IMPLEMENTED*
- `POST` `/teams`: *NOT YET IMPLEMENTED*
- `POST` `/teams/populate`: Populate the database "teams" table with data.
- `PUT` `/teams/:id`: *NOT YET IMPLEMENTED*
- `DELETE` `/teams/:id`: *NOT YET IMPLEMENTED*

### Circuits

- `GET` `/circuits`: Fetch all circuits from the database.
- `GET` `/circuits/:id`: *NOT YET IMPLEMENTED*
- `POST` `/circuits`: *NOT YET IMPLEMENTED*
- `POST` `/circuits/populate`: Populate the database "circuits" table with data.
- `PUT` `/circuits/:id`: *NOT YET IMPLEMENTED*
- `DELETE` `/circuits/:id`: *NOT YET IMPLEMENTED*

### Request parameters
- When creating new records in the database with a `POST` request, the endpoint expects JSON data to be attached to the body of the request.
- When updating records in the database with a `PUT` request, the endpoint expects JSON data to be attached to the body of the request.
- When fetching a record from the database by ID with a `GET` request, the endpoint expects a valid ID to be in the URL *:id*.
- When updating records from the database with a `PUT` request, the endpoint expects a valid ID to be in the URL *:id*.
- When deleting records from the database with a `DELETE` request, the endpoint expects a valid ID to be in the URL *:id*.

### Status codes
Standard [HTML status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) have been used with responses:
- `200` for a successful `GET`.
- `201` for a successful `POST`.
- `204` for successful `PUT` and `DELETE`s.
- `400` for bad requests.
- `404` for records not found. *NOT YET IMPLEMENTED*
- `500` for server errors.