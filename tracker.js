(function(){
  const s=document.currentScript; const clientId=s.getAttribute('data-client-id');
  if(!clientId) return;
  const FIREBASE="https://numgen-4f22c-default-rtdb.firebaseio.com";
  fetch('https://ipapi.co/json/').then(r=>r.json()).catch(()=>({})).then(geo=>{
    const data={name:clientId, client_id:clientId, ip:geo.ip||'', city:geo.city||'', country:geo.country_name||'', device:navigator.userAgent, screen:screen.width+'x'+screen.height, time:new Date().toLocaleString(), timestamp:Date.now()};
    fetch(`${FIREBASE}/white_label_clients/${clientId}/visitors.json`,{method:'POST',body:JSON.stringify(data)});
    fetch(`${FIREBASE}/clients/${clientId}/visitors.json`,{method:'POST',body:JSON.stringify(data)});
  });
})();
