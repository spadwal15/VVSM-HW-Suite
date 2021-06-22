const si = require('systeminformation');
const { ipcMain } = require('electron')

//system monitoring
const sysMon = () => {
    ipcMain.on('cpu-info', e => {
        // CPU information
        si.cpu().then(cpu=>{
        const cpuInfo=[];
        cpuInfo.push(cpu.manufacturer,cpu.brand,cpu.cores);
        //console.log(cpu['manufacturer']);
        //cpuInfo.push(cpu['brand']);
        //cpuInfo.push(cpu['cores']);
        e.sender.send('cpu-info',cpuInfo);
        //console.log(cpuInfo);
  }).catch(error => console.error(error));
    });
}

module.exports=sysMon;
