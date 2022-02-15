import clr


openhardwaremonitor_hwtypes = ['Mainboard', 'SuperIO', 'CPU',
                               'RAM', 'GpuNvidia', 'GpuAti', 'TBalancer', 'Heatmaster', 'HDD']

openhardwaremonitor_sensortypes = ['Voltage', 'Clock', 'Temperature', 'Load',
                                   'Fan', 'Flow', 'Control', 'Level', 'Factor', 'Power', 'Data', 'SmallData']


def initialize_openhardwaremonitor():
    with open('Logs\Temps.txt', 'w') as outfile:
        outfile.truncate()
    with open('Logs\Temps1.txt', 'w') as outfile:
        outfile.truncate()

    file = r'C:\Users\Rohit\Desktop\Mayur Files\VVSM-HW-Suite-main\DLLs\OpenHardwareMonitorLib.dll'
    clr.AddReference(file)

    from OpenHardwareMonitor import Hardware

    handle = Hardware.Computer()
    handle.MainboardEnabled = True
    handle.CPUEnabled = True
    handle.RAMEnabled = True
    handle.GPUEnabled = True
    handle.HDDEnabled = True
    handle.Open()
    return handle


def fetch_stats(handle):
    for i in handle.Hardware:
        i.Update()
        for sensor in i.Sensors:
            parse_sensor(sensor)
        for j in i.SubHardware:
            j.Update()
            for subsensor in j.Sensors:
                parse_sensor(subsensor)


def parse_sensor(sensor):

    if sensor.Value is not None:
        if type(sensor).__module__ == 'OpenHardwareMonitor.Hardware':
            sensortypes = openhardwaremonitor_sensortypes
            hardwaretypes = openhardwaremonitor_hwtypes
        else:
            return

        if sensor.SensorType == sensortypes.index('Temperature'):
            with open('Logs\Temps.txt', 'a') as outfile:
                outfile.write(u"%s %s Temperature Sensor #%i %s : %s\n" % (
                    hardwaretypes[sensor.Hardware.HardwareType], sensor.Hardware.Name, sensor.Index, sensor.Name, sensor.Value))

            with open('Logs\Temps1.txt', 'a') as outfile:
                outfile.write(u"%s\n" % (sensor.Value))

            print(u"%s %s Temperature Sensor #%i %s - %s\u00B0C" %
                  (hardwaretypes[sensor.Hardware.HardwareType], sensor.Hardware.Name, sensor.Index, sensor.Name, sensor.Value))

        elif sensor.SensorType == sensortypes.index('Fan'):
            print(u"%s %s Fan Speed #%i %s - %s RPM" %
                  (hardwaretypes[sensor.Hardware.HardwareType], sensor.Hardware.Name, sensor.Index, sensor.Name, sensor.Value))

        elif sensor.SensorType == sensortypes.index('Voltage'):
            print(u"%s %s Voltage #%i %s - %s V" %
                  (hardwaretypes[sensor.Hardware.HardwareType], sensor.Hardware.Name, sensor.Index, sensor.Name, sensor.Value))

        elif sensor.SensorType == sensortypes.index('Clock'):
            print(u"%s %s Clock #%i %s - %s MHz" %
                  (hardwaretypes[sensor.Hardware.HardwareType], sensor.Hardware.Name, sensor.Index, sensor.Name, sensor.Value))

        elif sensor.SensorType == sensortypes.index('Load'):
            print(u"%s %s Load #%i %s - %s Percent" %
                  (hardwaretypes[sensor.Hardware.HardwareType], sensor.Hardware.Name, sensor.Index, sensor.Name, sensor.Value))

        elif sensor.SensorType == sensortypes.index('Power'):
            print(u"%s %s Power #%i %s - %s W" %
                  (hardwaretypes[sensor.Hardware.HardwareType], sensor.Hardware.Name, sensor.Index, sensor.Name, sensor.Value))


if __name__ == "__main__":
    print("OpenHardwareMonitor:")
    HardwareHandle = initialize_openhardwaremonitor()
    fetch_stats(HardwareHandle)
