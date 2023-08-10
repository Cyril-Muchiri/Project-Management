const mssql = require('mssql')
const {sqlConfig} = require('../../config/db')


class DB {

    static async executeProcedure ( procedureName , data={}){

    const request = await (await mssql.connect(sqlConfig)).request()

    for (let key in data) {
        request.input(key, data[key])
    }
    const result = await request.execute(procedureName)

    return result

}

}

module .exports = DB
