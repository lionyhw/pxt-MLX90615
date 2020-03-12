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
                if (Unit == 0) {
                    retemp = readdata(objectAddr);
                }
                else {
                    retemp = readdata(objectAddr);
                    retemp = retemp * 9 / 5 + 32
                }
                break;
            case targetList.Ambiant:
                if (Unit == 0) {
                    retemp = readdata(ambientAddr);

                }
                else {
                    retemp = readdata(ambientAddr);
                    retemp = retemp * 9 / 5 + 32
                }
                break;
            default:
                retemp = 0;
        }
        return Math.round(retemp * 100) / 100
    }
    function readdata(reg: NumberFormat.UInt8BE): number {
        pins.i2cWriteNumber(MCUaddr, reg, NumberFormat.UInt8BE, true);
        let temp = pins.i2cReadNumber(MCUaddr, NumberFormat.UInt16LE, true);
        temp *= .02
        temp -= 273.15
        return temp
    }


}