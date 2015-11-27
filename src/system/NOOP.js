// In all major browsers, replacing non-specified functions with NOOPs
// seems to be as fast or slightly faster than using conditions to only
// call the functions if they are specified. This is probably due to empty
// functions being optimized away. http://jsperf.com/noop-vs-condition

export default function NOOP () {

    //  That's right, there's nothing here.
    
}