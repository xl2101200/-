/*
20210602 tom
每天0.5-2R，看别人已经提现几百都没问题

////////////////////////////////////
ios 圈X不要添加此脚本，没法获取ck的。
这个是安卓的毛，使用模拟器或者安卓手机挂代理获取ck
///////////////////////////////////

软件名：赚多多
下载地址：http://sczdd.xjr123.cn/h5/zhuce.html?invite_code=FL77
设置好代理打开软件，点击赚钱即可获取ck

不会用v2p请关注公众号《少年歌行》 查看历史文字，很多教程

用v2p获取ck，以下是对应设置方式

cron自己设置，每天运行一次就行

[REWRITE]
匹配连接：http://sczdd.xjr123.cn/api    对应重写目标：https://raw.githubusercontent.com/xl2101200/-/main/zdd.js

[MITM]
sczdd.xjr123.cn

*/
const $ = new Env('赚多多');
let status;
status = (status = ($.getval("zduoduostatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
const zduoduobodyArr = [], zduoduohdArr = [],zduoduourlArr = [],zduoduocount = ''
let zduoduobody = $.getdata('zduoduobody')
let zduoduohd = $.getdata('zwbhd')
let zduoduourl = $.getdata('zduoduourl')
let DD = RT(20000, 30000)
let aid = '',bid = '',cid = '',did = '',sign = '',ct = '',token = '',device = ''
!(async () => {
  if (typeof $request !== "undefined") {
    await zduoduock()
   
  } else {zduoduobodyArr.push($.getdata('zduoduobody'))
    zduoduohdArr.push($.getdata('zduoduohd'))
    zduoduourlArr.push($.getdata('zduoduourl'))
    let zduoduocount = ($.getval('zduoduocount') || '1');
  for (let i = 2; i <= zduoduocount; i++) {
    zduoduobodyArr.push($.getdata(`zduoduobody${i}`))
    zduoduourlArr.push($.getdata(`zduoduourl${i}`))
    zduoduohdArr.push($.getdata(`zduoduohd${i}`))
  }
    console.log(`------------- 共${zduoduohdArr.length}个账号-------------\n`)
      for (let i = 0; i < zduoduohdArr.length; i++) {
        if (zduoduohdArr[i]) {
         
          zduoduobody = zduoduobodyArr[i];
          zduoduohd = zduoduohdArr[i];
          zduoduohd = zduoduohdArr[i];
          $.index = i + 1;
          console.log(`\n开始【赚多多看视频${$.index}】`)
}
    await zduoduoqd()
    await $.wait(DD)
    await zduoduospid()
    await $.wait(DD)
    await zduoduoksp()
    await $.wait(DD)
    await zduoduoksp1()
    await $.wait(DD)
    await zduoduoksp2()
    await $.wait(DD)
    await zduoduoksp3()

     for (let x = 0; x < 10; x++) {
      $.index = x + 1
      console.log(`\n第${x+1}次执行任务！`)
    await zduoduoxsp()
    await $.wait(DD)
    await zduoduokgg()

  }
}}

})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())

function zduoduock() {
   if ($request.url.indexOf("sign") > -1 || $request.url.indexOf("video") > -1) {
 const zduoduobody = $request.body
  if(zduoduobody)     $.setdata(zduoduobody,`zduoduobody${status}`)
    $.log(zduoduobody)
const zduoduourl = $request.url
  if(zduoduourl)     $.setdata(zduoduourl,`zduoduourl${status}`)
    $.log(zduoduourl)
  const zduoduohd = JSON.stringify($request.headers)
        if(zduoduohd)    $.setdata(zduoduohd,`zduoduohd${status}`)
$.log(zduoduohd)
   $.msg($.name,"",'赚多多'+`${status}` +'headrs获取成功！')
  }
}

//签到
function zduoduoqd(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : `http://sczdd.xjr123.cn/api/money/sign`,
        headers : JSON.parse(zduoduohd),
        body : zduoduobody,}
      $.post(url, async (err, resp, data) => {
        try {
           
    const result = JSON.parse(data)
        if(result.code == 0){
 
        console.log('\n'+result.data.msg)
    }else{
        console.log('\n '+result.message)
}
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}

//视频id
function zduoduospid(timeout = 0) {
  return new Promise((resolve) => {
sign = zduoduobody.match(/sign=(\w+)&/)[1]
ct = zduoduobody.match(/ct=(\d+)&/)[1]
token = zduoduobody.match(/token=(\w+)&/)[1]
device = zduoduobody.match(/device_id=(\w+)/)[1]
let url = {
        url : `http://sczdd.xjr123.cn/api/money/video`,
        headers : JSON.parse(zduoduohd),
        body : zduoduobody,}
      $.post(url, async (err, resp, data) => {
        try {
           
    const result = JSON.parse(data)
        if(result.code == 0){
   aid = result.data.data[0].id
   bid = result.data.data[1].id
   cid = result.data.data[2].id
   did = result.data.data[3].id

 $.log(aid)
 $.log(bid)

        console.log('\n： '+result.data.title)

    }else{
        console.log('\n '+result.message)
}
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}

//看视频
function zduoduoksp(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : `http://sczdd.xjr123.cn/api/money/finish_video`,
        headers : JSON.parse(zduoduohd),
        body : `mission_id=${aid}&platform=android&sign=${sign}&ct=${ct}&token=${token}&device_id=${device}`,}
      $.post(url, async (err, resp, data) => {
        try {
           
    const result = JSON.parse(data)
        if(result.code == 0){
 
        console.log('\n赚多多看视频： '+result.data.msg)
    }else{
        console.log('\n赚多多看视频： '+result.data.msg)
}
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}
function zduoduoksp1(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : `http://sczdd.xjr123.cn/api/money/finish_video`,
        headers : JSON.parse(zduoduohd),
        body : `mission_id=${bid}&platform=android&sign=${sign}&ct=${ct}&token=${token}&device_id=${device}`,}
      $.post(url, async (err, resp, data) => {
        try {
           
    const result = JSON.parse(data)
        if(result.code == 0){
 
        console.log('\n赚多多看视频： '+result.data.msg)
    }else{
        console.log('\n赚多多看视频： '+result.data.msg)
}
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}
function zduoduoksp2(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : `http://sczdd.xjr123.cn/api/money/finish_video`,
        headers : JSON.parse(zduoduohd),
        body : `mission_id=${cid}&platform=android&sign=${sign}&ct=${ct}&token=${token}&device_id=${device}`,}
      $.post(url, async (err, resp, data) => {
        try {
           
    const result = JSON.parse(data)
        if(result.code == 0){
 
        console.log('\n赚多多看视频： '+result.data.msg)
    }else{
        console.log('\n赚多多看视频： '+result.data.msg)
}
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}
function zduoduoksp3(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : `http://sczdd.xjr123.cn/api/money/finish_video`,
        headers : JSON.parse(zduoduohd),
        body : `mission_id=${did}&platform=android&sign=${sign}&ct=${ct}&token=${token}&device_id=${device}`,}
      $.post(url, async (err, resp, data) => {
        try {
           
    const result = JSON.parse(data)
        if(result.code == 0){
 
        console.log('\n赚多多看视频： '+result.data.msg)
    }else{
        console.log('\n赚多多看视频： '+result.data.msg)
}
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}
//小视频
function zduoduoxsp(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : `http://sczdd.xjr123.cn/api/money/view_video`,
        headers : JSON.parse(zduoduohd),
        body : zduoduobody,}
      $.post(url, async (err, resp, data) => {
        try {
           
    const result = JSON.parse(data)
        if(result.code == 0){
 
        console.log('\n看小视频： '+result.data.msg)
    }else{
        console.log('\n看小视频： '+result.message)
}
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}
//广告
function zduoduokgg(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : `http://sczdd.xjr123.cn/api/money/view_ad`,
        headers : JSON.parse(zduoduohd),
        body : zduoduobody,}
      $.post(url, async (err, resp, data) => {
        try {
           
    const result = JSON.parse(data)
        if(result.code == 0){
 
        console.log('\n看广告： '+result.data.msg)
    }else{
        console.log('\n看广告： '+result.message)
}
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}
function RT(X, Y) {
    do rt = Math.floor(Math.random() * Y);
    while (rt < X)
    return rt;}
console.log('\n'+getCurrentDate());
function getCurrentDate() {
var date = new Date();
var seperator1 = "-";
var seperator2 = ":";
var month = date.getMonth() + 1;
var strDate = date.getDate();
if (month >= 1 && month <= 9) {
month = "0" + month;
}
if (strDate >= 0 && strDate <= 9) {
strDate = "0" + strDate;
}
var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
+ " " + date.getHours() + seperator2 + date.getMinutes()
+ seperator2 + date.getSeconds();
return currentdate;
}
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
