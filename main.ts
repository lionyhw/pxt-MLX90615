//%color=#00b1b1 icon="\uf2cb" block="MLX90615"
namespace MLX90615 {

    export enum targetList {
        //% block="Object"
        Object,
        //% block="Ambiant"
        Ambiant
    }

    const MCUaddr = 0x5B
    const objectAddr = 0x27
    const ambientAddr = 0x26
    /*
    *
    */

    //% block="Temperature %target"
    export function MLX90615tempe(target: targetList): number {
        switch (target) {
            case 0:
                return readdata(objectAddr);
            case 1:
                return readdata(ambientAddr);
            default:
                return 0;
        }
    }
    function readdata(reg: NumberFormat.UInt8BE): number {
        pins.i2cWriteNumber(MCUaddr, reg, NumberFormat.UInt8BE, true);
        let temp = pins.i2cReadNumber(MCUaddr, NumberFormat.UInt16LE, true);
        temp *= .02
        temp -= 273.15
        return Math.round(temp * 100) / 100
    }


}