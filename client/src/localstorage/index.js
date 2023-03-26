import CryptoJS from "crypto-js";

const SECRET_KEY = "Fizz-buzz-pop";

const setlocalstorage = (key, value) => {
  if (typeof data !== "string") {
    value = JSON.stringify(value);
  }
  const encryptedValue = CryptoJS.AES.encrypt(value, SECRET_KEY);
  localStorage.setItem(key, encryptedValue);
};

const removelocalstorage = (key) => {
  localStorage.removeItem(key);
};

const getlocalstorage = (key) => {
  const encryptedValue = localStorage.getItem(key);
  if (encryptedValue) {
    const decryptedValue = CryptoJS.AES.decrypt(
      encryptedValue,
      SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedValue);
  }
  return null;
};

export { setlocalstorage, removelocalstorage, getlocalstorage };
