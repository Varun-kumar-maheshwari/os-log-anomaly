import fs from 'fs'
import axios from 'axios'
import {fetchAnomaliesFromDatabase, renderDashboard} from './dasboard.js'
const instance = axios.create({
    baseURL : 'localhost:8000/api/send-logs',
    timeout: 5000
})

let lastPosition = 0;
let currentSize = fs.statSync("./generator.log").size
let batch = []

setInterval(async() => {

    currentSize = fs.statSync("./generator.log").size

    if(currentSize < lastPosition){
        lastPosition = currentSize;
    }
    if(currentSize>lastPosition){
        const stream = fs.createReadStream('./generator.log', { start: lastPosition, end: currentSize - 1 })

        let rawData = ''
        stream.on('data', (chunk) => {
        rawData += chunk.toString(); 
        });

        stream.on('end', () => {
        const batch = rawData.split('\n').filter(line => line.trim() !== '');
        console.log(batch);
        const anomalies = fetchAnomaliesFromDatabase();
        renderDashboard(anomalies);
        });
    }
    try {
        await instance.post('/',batch)
    } catch (error) {
        console.log("Python service currently not connected");
    }
    lastPosition = currentSize
    
},2000)