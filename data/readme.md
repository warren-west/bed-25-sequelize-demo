# Data folder
This contains a `drivers.json` file that contains an array of objects, where each object is a SQL command that can be executed to insert data into the database with a raw Sequelize query.

## Example
Consider the following code snippet that uses the array of `INSERT` commands:
```javascript
// inside /routes/populate
// to populate the database initially
// POST /populate
router.post('/', async (req, res) => {
    const newDrivers = require('../data/drivers.json')

    for (let driver of newDrivers) {
        // for each driver, execute a raw query
        await db.sequelize.query(driver.sqlCommand)
    }
}) 

```