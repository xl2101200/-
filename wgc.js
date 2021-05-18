/*
20210503 tom
完成
20210504 
增加自动兑换话费，默认关闭，需在boxjs打开。
20210509
增加收取邀请好友能量气泡，默认关闭，需在boxjs打开。

100个币以上8元一个！低于100都是5元一个币。

黑市有人收账号！！！号里有60币直接卖198元。
建议留着，25号大更新，币会更值钱！当然要卖可以联系我，我给你推荐

官方改了机制，需要邀请人才可以兑换话费等物品！！！！！
不知道怎么邀请的，可以去放单平台（趣赚点之类的平台）发个任务，一个任务给个1.8元，邀请5个人就行了。

软件名称：WGC
下载地址：https://github.com/xl2101200/-/blob/main/tom/wgc.jpg

2币可兑换10元话费、以及大米、花生油、手机、手表等实物。

建议兑换话费    联通不能换！！！！携号转网也不行！！！    建议用电信、移动手机号注册！！！

登入点击挖矿，然后点一键领取获取ck

还是那句话，玩了可能没有！不玩一定没有！

Task地址  :  https://raw.githubusercontent.com/xl2101200/-/main/Tom_task.josn
boxjs地址 ： https://raw.githubusercontent.com/xl2101200/-/main/tom.box.json

每3个小时收取一次，可自行修改cron
圈X配置如下，其他软件自行测试
[task_local]
#WGC
0 0 0/3 * * * https://raw.githubusercontent.com/xl2101200/-/main/wgc.js, tag=WGC, enabled=true

[rewrite_local]
#WGC
http://stc.enjoyha.com/api/miner/mining/receive_award? url script-request-header https://raw.githubusercontent.com/xl2101200/-/main/wgc.js

[MITM]
hostname = stc.enjoyha.com

*/

const $ = new Env('WGC');
let wgcurl = $.getdata('wgcurl')
let wgchd = $.getdata('wgchd')
let wgcbody = $.getdata('wgcbody')
let hf = ($.getval('hf') || '0');  //话费兑换开关,默认关闭
let qp = ($.getval('qp') || '0'); //收取邀请气泡开关，默认关闭
let id = ''
!(async () => {
  if (typeof $request !== "undefined") {
    await wgcck()
  }else {
    await wgclq();
if(hf == 1){
  for(let a = 0; a < 3; a++){
  $.index = a + 1
    console.log(`\n第${a+1}次兑换话费`)
    await wgchf();
    await $.wait(3000);}}
if(qp == 1){
  for(let x = 0; x < 10; x++){
  $.index = x + 1
    console.log(`\n第${x+1}次领取邀请能量`)
    await wgcsx();
    await $.wait(3000);
    await wgcqp();}}
}})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())
//ck
function wgcck() {
   if ($request.url.indexOf("assets?") > -1 || $request.url.indexOf("receive_award?") > -1) {
    $.setdata($request.url,'wgcurl')
    $.log(wgcurl)
$.setdata(JSON.stringify($request.headers),'wgchd')
$.log(wgchd)
    $.setdata($request.body,'wgcbody')
$.log(wgcbody)
   $.msg($.name,"","WGC获取数据成功！")
    } 
  }

//签到     
function wgclq(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://stc.enjoyha.com/api/miner/mining/receive_award?',
        headers : JSON.parse($.getdata('wgchd')),
        body : wgcbody,}
      $.get(url, async (err, resp, data) => {
        try {
           
    const result = JSON.parse(data)
        if(result.code == 200){
        console.log('\n收取WGC：'+result.msg)
}else{
        console.log('\n收取WGC：'+result.msg)
}
        } catch (e) {
        } finally {
          resolve()
        }
    },timeout)
  })
}
//换话费
function wgchf(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://stc.enjoyha.com/api/product/buy',
        headers : JSON.parse($.getdata('wgchd')),
        body : `productId=1`,}
      $.post(url, async (err, resp, data) => {
        try {
           
    const result = JSON.parse(data)
        if(result.code == 200){

        console.log('\n兑换话费：'+result.data.stcAmount)
}else{
        console.log('\n兑换话费：'+result.msg)
}
        } catch (e) {
        } finally {
          resolve()
        }
    },timeout)
  })
}
//刷新   
function wgcsx(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://stc.enjoyha.com/api/user/public/assets?',
        headers : JSON.parse($.getdata('wgchd')),
        body : wgcbody,}
      $.get(url, async (err, resp, data) => {
        try {
           
    const result = JSON.parse(data)
        if(result.code == 200){
        id = result.data.inviteLogId[0]
        console.log('\n现有WGC：'+result.data.stcAmount)
}else{
        //console.log('\n收取WGC：'+result.msg)
}
        } catch (e) {
        } finally {
          resolve()
        }
    },timeout)
  })
}

//领取  
function wgcqp(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://stc.enjoyha.com/api/user/public/prize_pool',
        headers : JSON.parse($.getdata('wgchd')),
        body : `inviteLogId=${id}`,}
      $.post(url, async (err, resp, data) => {
        try {
           
    const result = JSON.parse(data)
        if(result.code == 200){

        console.log('\n收取气泡：成功🎉🎉🎉🎉'+result.data.stcAmount)
}else{
        console.log('\n收取气泡：'+result.msg)
}
        } catch (e) {
        } finally {
          resolve()
        }
    },timeout)
  })
}
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
