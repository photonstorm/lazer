import Factorial from './Factorial.js';

export default function Bernstein(n, i) {

    return Factorial(n) / Factorial(i) / Factorial(n - i);

}
