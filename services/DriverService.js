class DriverService {
    /**
     * Create a new instance of the DriverService using the db object
     */
    constructor(db) {
        this.Driver = db.Driver
        this.Team = db.Team
        this.Circuit = db.Circuit
    }

    /**
     * Fetch all drivers from the DB.
     */
    async getAllDrivers() {
        return this.Driver.findAll()
    }

    /*
     * Fetch a single driver by id from the DB.
     */
    async getDriverById(id) {
        return this.Driver.findByPk(id, { include: [this.Team, this.Circuit] })
    }

    /**
     * Fetch a list of drivers by name from the DB.
     */
    async getDriversByName(name) {
        return this.Driver.findAll({ where: { driverName: name } })
    }

    /**
     * Create a new driver in the DB.
     */
    async createDriver(newDriver) {
        // newDriver is a driver object, that should contain all of the required fields to create a new driver:
        // e.g., { driverName: '', birthDate: '' }
        return this.Driver.create(newDriver)
    }

    /**
     * Update a driver's details in the DB by ID.
     */
    async updateDriver(id, newDriverDetails) {
        return this.Driver.update(newDriverDetails, { where: { id } })
    }
    
    /**
     * Delete a driver from the Db by ID.
     */
    async deleteDriver(id) {
        return this.Driver.destroy({ where: { id } })
    }
}

module.exports = DriverService