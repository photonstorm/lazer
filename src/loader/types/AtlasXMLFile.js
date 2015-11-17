import MultiFile from 'loader/types/MultiFile.js';
import ImageFile from 'loader/types/ImageFile.js';
import XMLFile from 'loader/types/XMLFile.js';

export default class AtlasXMLFile extends MultiFile {

    constructor (loader, key, textureURL, atlasURL, atlasData) {

        if (atlasURL === '' && atlasData === null)
        {
            atlasURL = key + '.xml';
        }

        let image = new ImageFile(loader, key, textureURL);
        let xml = new XMLFile(loader, key, atlasURL, atlasData);

        super(loader, image, xml);

    }

    process () {

        if (this.hasProcessed)
        {
            return;
        }

        //  All files will have loaded by now
        console.log('AtlasXMLFile.process');
        console.log(this.fileA.src);
        console.log(this.fileB.src);

        super.process();

        //  Now we should have an image and parsed XML

    }

}