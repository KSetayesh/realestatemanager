import Redis from 'ioredis';

const redis = new Redis({
    host: 'localhost', // Redis server host
    port: 6379,        // Redis server port
    password: '',      // Redis password if any
    db: 0              // Redis database number
});

export default redis;
