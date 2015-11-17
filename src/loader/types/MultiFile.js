export default class MultiFile {

    constructor (loader, fileA, fileB) {

        this.loader = loader;

        this.loading = false;
        this.loaded = false;
        this.failed = false;

        this.fileA = fileA;
        this.fileB = fileB;

        this.hasProcessed = false;

        fileA.link(this, fileB);

    }

    add () {

        this.fileA.add();
        this.fileB.add();

    }

    load () {

        console.log('MultiFile.load and auto-complete');

        this.loading = false;
        this.loaded = true;

        this.loader.nextFile();

    }

    process () {

        if (this.hasProcessed)
        {
            return;
        }

        this.fileA.process();
        this.fileB.process();

        this.hasProcessed = true;

    }

}