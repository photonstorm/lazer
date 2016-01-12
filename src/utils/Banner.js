import { Version } from 'Version.js';

export default function Banner (gameTitle = '') {

    let msg = '%c %c %c %c %c  ';

    if (gameTitle)
    {
        msg = msg.concat(gameTitle + ' powered by ');
    }

    msg = msg.concat('Lazer v' + Version.major + '.' + Version.minor + ' - https://lazerjs.io  ');

    console.log.apply(console, [
        msg,
        'background: #ff0000',
        'background: #ffff00',
        'background: #00ff00',
        'background: #00ffff',
        'color: #ffffff; background: #000;'
    ]);

}
