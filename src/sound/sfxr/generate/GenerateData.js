export default function GenerateData (fx) {

    return {

        rep_time: 0,
        
        fperiod: 0,
        
        period: 0,
        
        fmaxperiod: 0,
        
        fslide: 0,
        
        fdslide: 0,
        
        square_duty: 0, 

        square_slide: 0,
        
        arp_mod: 0,

        arp_time: 0,

        arp_limit: 0,

        gain: Math.exp(fx.volume) - 1,
    
        num_clipped: 0

    };

}
