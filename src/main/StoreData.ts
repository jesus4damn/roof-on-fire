import { IPattern } from '../types/fixtureTypes';
const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Store {
    path: any;
    private data: any;
    constructor(opts:any) {
        // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
        // app.getPath('userData') will return a string of the user's app data directory path.
        const userDataPath = (electron.app || electron.remote.app).getPath('userData');
        // We'll use the `configName` property to set the file name and path.join to bring it all together as a string
        this.path = path.join(userDataPath, opts.configName + '.json');

        this.data = parseDataFile(this.path, opts.defaults);
        console.log(opts.defaults)
    }

    // This will just return the property on the `data` object
    get(key: string) {
        return this.data[key];
    }

    // ...and this will set it
    set(key: string, val: any) {
        this.data[key] = val;
        // Wait, I thought using the node.js' synchronous APIs was bad form?
        // We're not writing a server so there's not nearly the same IO demand on the process
        // Also if we used an async API and our app was quit before the asynchronous write had a chance to complete,
        // we might lose that data. Note that in a real app, we would try/catch this.
        fs.writeFileSync(this.path, JSON.stringify(this.data));
    }

    parse(path: string) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf8', function(err: any, data: string) {
                if (err) {
                    reject(err);
                }
                let res: IPattern[] = [];
                console.log('OK: ' + path);
                if (data.length) {
                    let arr: IPattern[] = [];
                    try {
                        data
                          .split(/\n/gm)
                          .forEach((pString: string) => {
                              if (pString.indexOf('A') >= 0) {
                                  let numb = Number(pString.split(',')[1]);
                                  arr.push({
                                      id: '',
                                      selected: false,
                                      active: false,
                                      img: '',
                                      number: numb,
                                      name: 'Pattern' + numb,
                                      offset: 0,
                                      fixtureType: 'fireMachine',
                                      type: 'static',
                                      color: '',
                                      steps: [],
                                      dmxStart: 1,
                                      dmxEnd: 2
                                  });
                              } else {
                                  if (arr.length) {
                                      let a = pString.split(',');
                                      arr[arr.length - 1].steps = [
                                          ...arr[arr.length - 1].steps,
                                          {
                                              delay: Number(a[2]),
                                              time: Number(a[0]),
                                              type: Number(a[3]) <= 0 ? 'move' : Number(a[3]) > 0 ? 'shot' : '',
                                              height: 6,
                                              angle: Number(a[1])
                                          }
                                      ];
                                  }
                              }
                              pString.split('');
                          });
                    } catch (e) {
                        console.log(e);
                    }
                    res = arr;
                }
                resolve(res);
            });
        });
    }
}

function parseDataFile(filePath: any, defaults: any) {
    // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
    // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
    try {
        return JSON.parse(fs.readFileSync(filePath));
    } catch(error) {
        // if there was some kind of error, return the passed in defaults instead.
        return defaults;
    }
}

// expose the class
module.exports = Store;
