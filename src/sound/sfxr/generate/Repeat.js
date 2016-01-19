export default function Repeat (fx) {

    let limit = Math.floor(Math.pow(1 - fx.repeat.speed, 2) * 20000 + 32);

    if (fx.repeat.speed === 0)
    {
        limit = 0;
    }

    return {
        limit
    };

}
