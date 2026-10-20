self.addEventListener("install", function(){ self.skipWaiting(); });
self.addEventListener("activate", function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener("push", function(e){
  var d={title:"درخواست خروج جدید",body:""};
  try{ d=e.data.json(); }catch(x){}
  e.waitUntil(self.registration.showNotification(d.title,{
    body:d.body, tag:"exit-pending", renotify:true, requireInteraction:true,
    vibrate:[300,150,300,150,300], dir:"rtl", lang:"fa"
  }));
});
self.addEventListener("notificationclick", function(e){
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(function(l){
    if(l.length){ return l[0].focus(); }
    return self.clients.openWindow("./");
  }));
});
