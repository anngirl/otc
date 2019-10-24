var key = "Panda@88";     //秘钥必须为：8/16/32位
import CryptoJS from 'crypto-js'
//CBC模式加密
function encryptByDESModeCBC(message) {
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var ivHex = CryptoJS.enc.Utf8.parse(key);
  var  encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    iv:ivHex,
    mode: CryptoJS.mode.CBC,
    padding:CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString();
}
//解密
function decryptByDESModeEBC(ciphertext) {
  //把私钥转换成UTF - 8编码的字符串
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var ivHex = CryptoJS.enc.Utf8.parse(key);
  // direct decrypt ciphertext
  var decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Hex.parse(ciphertext)}, 
    keyHex, 
    {
      iv:ivHex,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
}

export default {
  encryptByDESModeCBC,
  decryptByDESModeEBC
}