const methods = ["GET", "POST", "PUT", "DELETE"];
const endpoints = ["/api/login", "/api/data", "/home", "/dashboard", "/checkout"];
const statusCodes = [200, 200, 201, 400, 401, 403, 404, 500];

const ips = ["10.0.0.1", "10.0.0.2", "10.0.0.3", "10.0.0.4", "10.0.0.5", "10.0.0.6", "10.0.0.7", "10.0.0.8", "10.0.0.9", "10.0.0.10"];

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}



setInterval(()=> {
    console.log(JSON.stringify({
    timeStamp:Date.now(),
    ip:getRandom(ips),
    statusCodes:getRandom(statusCodes),
    method:getRandom(methods),
    endpoints:getRandom(endpoints)
}));
},500)

