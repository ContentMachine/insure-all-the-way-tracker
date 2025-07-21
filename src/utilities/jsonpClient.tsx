import jsonp from "jsonp";

export const jsonpRequest = (url: string, options?: object): Promise<any> => {
  return new Promise((resolve, reject) => {
    jsonp(url, options || {}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
