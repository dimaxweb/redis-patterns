// TypeScript
import { Tedis, TedisPool } from "tedis";

export class RedisService {
    private tedisClient: Tedis;
    constructor () {
        this.tedisClient = new Tedis({
            host: "127.0.0.1",
            port: 6379
        });
    }
    getClient(){
        return this.tedisClient;
    }
}


