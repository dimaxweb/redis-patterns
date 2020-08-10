import { RedisService } from "../services/rate-limmiter.srv";

var client = new RedisService().getClient();

// hash
client.hmset("hash1", {
    name: "tom",
    age: 23
});
const detail =   client.hgetall("hash1").then((data) =>{
    console.log('We here' ,data);
});
console.log('detail' , detail);
