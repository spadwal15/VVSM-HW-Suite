const si = require('systeminformation');
const { ipcMain } = require('electron')
const os = require('os');
const fs = require('fs');

//system monitoring
const sysMon = () => {

    //OS
    ipcMain.on('os-info', e => {
        // CPU information
        si.osInfo().then(osi=>{
        const osInfo=[];
        osInfo.push(osi.platform);
        //osInfo
        e.sender.send('os-info',osInfo);
        //console.log(cpuInfo);
        }).catch(error => console.error(error));
    });

    //CPU
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

    ipcMain.on('cpu-temp-info', e => {
        // CPU information
        si.cpuTemperature().then(cpuTemperature=>{
        const cpuTemp=[];
        cpuTemp.push(cpuTemperature.main,cpuTemperature.max, cpuTemperature.cores);
        //console.log(cpu['temp main']);
        //cpuInfo.push(cpu['temp max']);
        // console.log("test2");
        e.sender.send('cpu-temp-info',cpuTemp);
        // console.log("test3");
        //console.log(cpuInfo);
        }).catch(error => console.error(error));
    });

    //GPU
    ipcMain.on('gpu-info', e => {
        // GPU information
        si.graphics().then(graphics=>{
        const gpu=[];
        gpu.push(graphics.controllers[0].model,graphics.controllers[0].vram/1024,graphics.controllers[0].vramDynamic,graphics.displays[0].vendor,graphics.displays[0].model,graphics.displays[0].resolutionX,graphics.displays[0].resolutionY);

        //gpuInfo.push(gpu['model']);
        //gpuInfo.push(gpu['vram']);
        //gpuInfo.push(gpu['cores']);

        //gpuInfo.push(display['vendor']);
        //gpuInfo.push(display['model']);
        //gpuInfo.push(display['resolution']);
        e.sender.send('gpu-info',gpu);
        //console.log(gpuInfo);
        }).catch(error => console.error(error));
    });

    ipcMain.on('com', e => {

        // PC information
        let Uptime = os.uptime()/60;

        let OsType = os.type()

        const com=[];
        com.push(Uptime, OsType)

        e.sender.send('com',com);

    });

    ipcMain.on('memory', e => {
        // CPU information
        si.mem().then(mem=>{
        const memory=[];
        total = mem.total/1073741824;
        let FreeMemory = os.freemem()/1073741824;
        memory.push(total, FreeMemory);
        //osInfo
        e.sender.send('memory',memory);
        //console.log(cpuInfo);
        }).catch(error => console.error(error));
    });

    ipcMain.on('temps', e => {
        // Temps
        fs.readFile('Logs/Temps.txt', 'utf8' , (err, data) => {
          if (err) {
            console.error(err)
            return
          }
          e.sender.send('temps',data);
        })
    });
}

module.exports=sysMon;
