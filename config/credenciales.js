const config = {

    mssql: {
        user: 'sa',
        password: 'sasql',
        server: 'localhost',
        database: 'BASE_140524GPK',
        port: 1433,
         options: {
        encrypt: false, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    },
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        },
    },
    sequelize: {
        t1: 'sa',
        t2: 'sasql',
        t3: '1ocalhost',
        t4: 'BASE_140524GPK',
        t5: 1433
    },

    //     encrypt: false, // for azure



}

// const sqlConfig = {
//     user: 'sa',
//     password: 'sasql',
//     database: 'PRO_PRUEBA',
//     server: '1ocalhost\\SQLEXPRESS',
//     port: 1433,
//     pool: {
//         max: 10,
//         min: 0,
//         idleTimeoutMillis: 30000
//     },
//     options: {
//         encrypt: false, // for azure
//         trustServerCertificate: true // change to true for local dev / self-signed certs
//     }
// }

module.exports = config