import { Version } from 'Version.js';

export default function Banner (title, url) {

    let msg = '%c %c %c %c %c  ';

    if (title)
    {
        msg = msg.concat(title + ' powered by ');
    }

    msg = msg.concat('Lazer v' + Version.major + '.' + Version.minor);

    if (url === undefined)
    {
        msg = msg.concat(' - https://lazerjs.io');
    }
    else if (url !== '')
    {
        msg = msg.concat(' - ' + url);
    }

    msg = msg.concat('  ');

    console.log.apply(console, [
        msg,
        'background: #ff0000',
        'background: #ffff00',
        'background: #00ff00',
        'background: #00ffff',
        'color: #ffffff; background: #000;'
    ]);

}
