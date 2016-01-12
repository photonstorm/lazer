let isBooted = false;

export default function DOMBoot () {

    if (isBooted)
    {
        return;
    }

    return new Promise(
        (resolve, reject) => {
            if (document.readyState === 'complete' || document.readyState === 'interactive')
            {
                isBooted = true;
                
                resolve();
            }
            else
            {
                function check () {

                    document.removeEventListener('deviceready', check, true);
                    document.removeEventListener('DOMContentLoaded', check, true);
                    window.removeEventListener('load', check, true);

                    resolve();
                }

                if (!document.body)
                {
                    window.setTimeout(check, 20);
                }
                else
                {
                    document.addEventListener('DOMContentLoaded', check, true);
                    window.addEventListener('load', check, true);
                }
            }
        }
    );
    
}