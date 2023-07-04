import { TIMEOUT_SEC } from "./config.js";

// times out if request takes to long for example because of bad interner connection
// returns a promise
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// fetches data and converts it to json or sends data - POST request
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // as soon as any of the two promises rejects or fulfulls it will become the winner
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err; // We propegated the error down from one async func to another by rethrowing the errer in this catchblock
  }
};

// // fetches data and converts it to json
// export const getJSON = async function (url) {
//   try {
//     const fetchPromise = fetch(url);
//     const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]); // as soon as any of the two promises rejects or fulfulls it will become the winner
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err; // We propegated the error down from one async func to another by rethrowing the errer in this catchblock
//   }
// };

// // sends data - POST request
// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPromise = fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify(uploadData),
//     });
//     const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]); // as soon as any of the two promises rejects or fulfulls it will become the winner
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err; // We propegated the error down from one async func to another by rethrowing the errer in this catchblock
//   }
// };
