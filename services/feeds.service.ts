import * as fs from 'fs';

export default class FeedsService {
  /**
     *
     * @param dir set the path to the file feeds folder
     * @param idArr set the id of the customers include the suffix in an array of strings
     * @returns
     */
  getFilesFeedDateAsync(dir: string, idArr: string[]) {
    return new Promise((resolve, reject) => {
      fs.readdir(dir, async (error, filesName) => {
        if (error) {
          return reject(new Error(`Readdir Error: ${error.message}`));
        }
        if (!filesName || filesName.length == 0) {
          return reject(new Error(`filesNams Error, No Files Found: ${JSON.stringify(filesName)}`));
        }
        const filteredNames = filesName.filter((fileName) => idArr.includes(fileName));
        const lastModifiedDatas = await Promise.all(filteredNames.map((fileName) => new Promise((resolve, reject) => {
          fs.stat(`${dir}/${fileName}`, (error, stats) => {
            if (error) {
              return reject(new Error(`Stat Error: ${error.message}`));
            }
            return resolve({ FileName: fileName, LastUpdate: new Date(stats.mtimeMs) });
          });
        }).catch((error) => reject(new Error(error)))));
        return resolve(lastModifiedDatas);
      });
    });
  }
}
