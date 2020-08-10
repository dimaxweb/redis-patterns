import request from "request-promise";
import {RedisService} from "./rate-limmiter.srv";
import { Tedis, TedisPool } from "tedis";


jest.mock("request-promise");

const userApiKey  = "zA21X31";

 async function inRate(redisClient:Tedis){
    var d = new Date();
    var currentMinute = d.getMinutes();
    let key  = `${userApiKey}:${currentMinute}`;
    let count  = await redisClient.get(key) || 0;
    console.log('coubt'  ,count);
    console.log('key'  ,key);
    if(count  >= 10){
        await redisClient.expire(key , 0);
        return false;
    }
    else{
        await redisClient.incr(key);
        await redisClient.expire(key, 59);
        return true;
    }
}

describe("Redis basic tests", () => {
    let redisClient:Tedis;
    beforeAll(() => {
        redisClient = new RedisService().getClient();
    });
    afterAll(() => {
        redisClient.close();
    });


    test("basic test ", async () => {
        await   redisClient.set("string1", "abcdefg");
        let str  = await redisClient.get("string1");
        expect(str).toEqual('abcdefg');
        expect(str).not.toEqual('no ectis');
    });

    test("redis expiration tests", async () => {
        for(let i=0; i < 10 ; i ++){
            let inRateCall = await inRate(redisClient);
            expect(inRateCall).toEqual(true);
        }

        let inRateExpired =  await inRate(redisClient);
        expect(inRateExpired).toEqual(false);

    });
});
