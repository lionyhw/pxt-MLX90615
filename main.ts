//%color=#00b1b1 icon="\uf2cb" block="MLX90615"
namespace MLX90615 {

    const MCUaddr = 0x5B
    const objectAddr = 0x27
    const ambientAddr = 0x26

    export enum targetList {
        //% block="Object"
        Object,
        //% block="Ambiant"
        Ambiant
    }
    export enum UnitList {
        //% block="℃"
        Centigrade,
        //% block="℉"
        Fahrenheit
    }


    /*
    *
    */

    //% block="Value of MLX90615 %target Unit %Unit"
    export function MLX90615tempe(target: targetList, Unit: UnitList): number {
        let retemp = 0
        switch (target) {
            case targetList.Object:
                if (UnitList.Centigrade) {
                    retemp = readdata(objectAddr);
                    return Math.round(retemp * 100) / 100
                }
                else {
                    retemp = readdata(objectAddr);
                    return Math.round(retemp * 100) / 100
                }

            case targetList.Ambiant:
                if (UnitList.Centigrade) {
                    retemp = readdata(ambientAddr);
                    return Math.round(retemp * 9) / 5 + 32
                }
                else {
                    retemp = readdata(ambientAddr);
                    return Math.round(retemp * 9) / 5 + 32
                }

            default:
                return 0;
        }
    }
    function readdata(reg: NumberFormat.UInt8BE): number {
        pins.i2cWriteNumber(MCUaddr, reg, NumberFormat.UInt8BE, true);
        let temp = pins.i2cReadNumber(MCUaddr, NumberFormat.UInt16LE, true);
        temp *= .02
        temp -= 273.15
        return temp
    }


}