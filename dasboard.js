import Table from 'cli-table3'
export function renderDashboard(anomalies) {
    const table = new Table({
        head: ['Timestamp', 'Target IP', 'Threat Detected', 'Occurrences'],
        style: { head: ['cyan'] } 
    });

    anomalies.forEach(anomaly => {
        table.push([anomaly.timestamp, anomaly.ip, anomaly.threat, anomaly.count]);
    });

    console.clear();
    console.log("=== REAL-TIME LOG ANOMALY DETECTOR ===");
    console.log(table.toString());
}

export function fetchAnomaliesFromDatabase() {
    return [
        { timestamp: new Date().toISOString(), ip: "10.0.0.3", threat: "Brute-force (Login)", count: 15 },
        { timestamp: new Date().toISOString(), ip: "10.0.0.8", threat: "DDoS Attempt", count: 120 },
        { timestamp: new Date().toISOString(), ip: "10.0.0.5", threat: "Path Traversal", count: 4 }
    ];
}