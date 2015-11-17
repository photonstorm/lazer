import Factorial from 'math/Factorial.js';

export default function (n, i) {

    return Factorial(n) / Factorial(i) / Factorial(n - i);

}
