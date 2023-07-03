import { Client } from '@elastic/elasticsearch'

const client = new Client({
    node: 'https://bus3-es-http:9200',
    auth: {
        username: 'elastic',
        password: process.env.ELASTIC_PASSWORD!
    },
    tls: {
        rejectUnauthorized: false
    }
})


export default client