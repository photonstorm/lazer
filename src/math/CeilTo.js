export default function (value, place = 0, base = 10) {

    var p = Math.pow(base, -place);

    return Math.ceil(value * p) / p;

}
