const childProcess = require('child_process');
const fs = require('fs');
const os = require('os');

let fullData = '';
let dataChunks = 0;

const properShellCommand = os.platform() === 'win32'
    ? 'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"'
    : 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';

const spawnProcess = (command, args) => {
    const process = childProcess.spawn(command, args, {shell: true});

    process.stderr.on('data', (data) => {
        console.log(`${data}`);
    });

    process.stdout.on('data', (data) => {
        console.clear();

        if(dataChunks >= 60) {
            fs.appendFile('activityMonitor.log', fullData, (err) => {
                if (err) throw err;
            });

            fullData = '';
            dataChunks = 0;
        }

        const currentUnixTime = Math.floor(new Date().getTime() / 1000);

        fullData += `UNIX Time ${currentUnixTime}: ${data}`;
        dataChunks += 1;
        console.log(`${data}`);
    });
}
setInterval(() => {
    spawnProcess(properShellCommand, [])
    }, 100
)
