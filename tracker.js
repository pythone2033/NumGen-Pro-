// NumGen Pro++ - TRACKER.JS - FIXED - PER USER ISOLATED
(function(){
  try{
    var FIREBASE_URL = "https://numgen-4f22c-default-rtdb.firebaseio.com";
    var script = document.currentScript || document.querySelector('script[data-client-id]');
    if(!script){ return; }
    var CLIENT_ID = script.getAttribute('data-client-id') || script.dataset.clientId;
    if(!CLIENT_ID){ return; }
    CLIENT_ID = CLIENT_ID.trim();
    if(CLIENT_ID.length < 3){ return; }
    function getDevice(){
      var ua = navigator.userAgent || "";
      return ua.substring(0,180);
    }
    function sendToFirebase(path, payload){
      try{
        fetch(FIREBASE_URL + "/" + path + ".json", {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(payload)
        }).catch(function(){});
      }catch(e){}
    }
    function track(ipData){
      var now = new Date();
      var payload = {
        name: CLIENT_ID,
        client_id: CLIENT_ID,
        ip: (ipData && ipData.ip) ? ipData.ip : "",
        city: (ipData && ipData.city) ? ipData.city : "",
        country: (ipData && ipData.country_name) ? ipData.country_name : "",
        device: getDevice(),
        device_full: navigator.userAgent,
        screen: (window.screen.width+"x"+window.screen.height),
        url: window.location.href,
        time: now.toLocaleString(),
        timestamp: Date.now(),
        _path: "white_label_clients/"+CLIENT_ID+"/visitors",
        sdk_fixed: true
      };
      sendToFirebase("white_label_clients/"+CLIENT_ID+"/visitors", payload);
      sendToFirebase("no_code_visits/"+CLIENT_ID, payload);
      sendToFirebase("real_device_visitors", payload);
    }
    try{
      fetch("https://ipapi.co/json/").then(function(r){ return r.json(); }).then(function(data){
        track(data);
      }).catch(function(){ track(null); });
    }catch(e){ track(null); }
  }catch(err){}
})();
