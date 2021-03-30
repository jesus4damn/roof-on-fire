const { dialog } = require('electron').remote;

class ExternalAPI {
    path: any;
    private data: any;
    constructor(opts:any) {

    }

    getPath() {
        const loadDialog = async () => {
            console.log(dialog);
            const path = dialog.showOpenDialog({});
            return path[0] ? path[0] : ''
        };
        return loadDialog();
    }

    save() {
        const saveDialog = async () => {
            const res = dialog.showSaveDialog({});
            return res;
        };
        return saveDialog();
    }
}

module.exports = ExternalAPI;
