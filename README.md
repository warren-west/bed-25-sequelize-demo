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
As we've continued with this project in class, we've transitioned from the endpoints returning JSON data, to returning EJS views.

### Auth
- `GET` `/login`: Display the login page.
- `POST` `/login`: Attempt to log in. Upon success, you will be redirected to the home page `/`.
- `POST` `/login/logout`: Attempt to log out. Upon success, you will be redirected to the home page `/`.

> - `POST` `/login/populate`: Populate the database with two **roles** and three **users**.
>   - "ADMIN" role with ID = `1`.
>   - "USER" role with ID = `2`.
>   - "admin", with the role of "ADMIN" and the password "admin".
>   - "warren" with the role of "USER" and the password "1234".
>   - "test" with the role of "USER" and the password "1234".

### Drivers

- `GET` `/drivers`: Display a page with the list of drivers. *Any user*
- `GET` `/drivers/:id`: Display a page with the details of a single driver. *Logged in users*
- `POST` `/drivers`: Add a new driver to the database, then redirect to `/drivers`. *Only admins*
- `POST` `/drivers/populate`: Populate the database "drivers" table with data. *Only admins*
- `PUT` `/drivers/:id`: Update a driver details in the database by ID, then redirect to `/drivers`. *Only admins*
- `DELETE` `/drivers/:id`: Delete a driver's record from the database by ID. *Only admins*

### Teams

- `GET` `/teams`: Display a page with the list of teams.
- `GET` `/teams/:id`: Display a page with the details of a single team.
- `POST` `/teams`: Add a new team to the database, then redirect to `/teams`. *Only admins*
- `POST` `/teams/populate`: Populate the database "teams" table with data. *Only admins*
- `PUT` `/teams/:id`: Update a team details in the database by ID, then redirect to `/teams`. *Only admins*
- `DELETE` `/teams/:id`: Delete a team's record from the database by ID. *Only admins*

### Circuits

These endpoints still return JSON data, no views implemented.

- `GET` `/circuits`: Fetch all circuits from the database.
- `GET` `/circuits/:id`: *NOT YET IMPLEMENTED*
- `POST` `/circuits`: *NOT YET IMPLEMENTED*
- `POST` `/circuits/populate`: Populate the database "circuits" table with data. *Only admins*
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