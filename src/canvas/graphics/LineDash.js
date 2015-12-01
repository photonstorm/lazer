
// An Array. A list of numbers that specifies distances to alternately draw a line and a gap (in coordinate space units). 
// If the number of elements in the array is odd, the elements of the array get copied and concatenated. 
// For example, [5, 15, 25] will become [5, 15, 25, 5, 15, 25].

export default function LineDash (context, segments = [5, 5], offset = 0) {

    context.setLineDash(segments);
    context.lineDashOffset = offset;
    
}
