export default function GenerateData (fx) {

    return {

        repeatTime: 0,
        
        fPeriod: 0,
        
        period: 0,
        
        fMaxPeriod: 0,
        
        fSlide: 0,
        
        fDeltaSlide: 0,
        
        squareDuty: 0, 

        squareSlide: 0,
        
        arpMod: 0,

        arpTime: 0,

        arpLimit: 0,

        gain: Math.exp(fx.volume) - 1,
    
        sampleSum: 0,
        numSummed: 0,
        summands: Math.floor(44100 / fx.sampleRate),

        bufferIndex: 0,
        bufferLength: 0,
        bufferComplete: false

    };

}
