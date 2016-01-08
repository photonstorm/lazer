
export default function MultiFile (fileA, fileB) {

    //  Link the two files
    fileA.linkFile = fileB;
    fileB.linkFile = fileA;

    let multipart = {

        multipart: true,

        fileA: fileA,
        fileB: fileB,

        resolve: undefined,
        reject: undefined,

        load: function () {

            //   This isn't used by the BaseLoader, but allows you to call load directly on the multipart file

            return new Promise(
                (resolve, reject) => {

                    //  When this file loads we need to call 'resolve'
                    this.resolve = resolve;
                    this.reject = reject;

                    this.fileA.load().then(file => {

                        file.onProcess();

                        if (file.processCallback)
                        {
                            file.processCallback(file);
                        }

                        file.onComplete();

                    }).catch(file => { file.onError() });

                    this.fileB.load().then(file => {

                        file.onProcess();

                        if (file.processCallback)
                        {
                            file.processCallback(file);
                        }

                        file.onComplete();

                    }).catch(file => { file.onError() });

                }
            );

        }

    };

    fileA.multipart = multipart;
    fileB.multipart = multipart;

    return multipart;

}
