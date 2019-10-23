function decodeURI(url) {
  let theRequest = new Object();
  let strs = url.split("&");
  for (let i in strs) {
    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]); 
  }
  return theRequest
}

export default {
  decodeURI
}
