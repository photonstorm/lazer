//  Is value a power of 2?

export default function IsPow2 (value) {

    return (value > 0 && (value & (value - 1)) === 0);
    
}
