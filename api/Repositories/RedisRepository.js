import { promisify } from "util";

class RedisRepository{
    constructor(redisClient){
        this.redis = redisClient;
        this.hashGetAsync = this.hashGetAsync.bind(this);
    }

    hashGetAsync = async (hash,key) => { 
        return promisify(this.redis.hget).bind(this.redis)(hash,key);
    }

    hashSetAsync = async (hash,key,value) => {
        return promisify(this.redis.hset).bind(this.redis)(hash,key,value);
    }
}

export default RedisRepository;