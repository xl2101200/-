/*
20210504 tom

软件名：猫屋日记   应用商店下载

半成品状态，看视频合成好像加密了，

进入游戏后先点开左下角：看视频合成  需要每隔15分钟手动点一次视频合成

点击：一键养猫 获取ck

手点点升级奖励，手动提现吧。多账号暂时没弄，你们自己弄也行。

Task地址：https://raw.githubusercontent.com/xl2101200/-/main/Tom_task.josn

圈X配置如下，其他软件自行测试
[task_local]
#猫屋日记
0 0/15 * * * * https://raw.githubusercontent.com/xl2101200/-/main/mwrj.js, tag=猫屋日记, enabled=true

[rewrite_local]
#猫屋日记
https://appapi.mwrji.com/v1/cat url script-request-body https://raw.githubusercontent.com/xl2101200/-/main/mwrj.js

[MITM]
hostname = appapi.mwrji.com


*/

const $ = new Env('猫屋日记');
let status;
status = (status = ($.getval("mwrjstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
const mwrjurlArr = [], imwrjbodyArr = [],mwrjhdArr = [],imwrjhdArr = [],mwrjbodyArr = [],mwrjcount = ''
let mwrjurl = $.getdata('mwrjurl')
let mwrjhd = $.getdata('mwrjhd')
let mwrjbody = $.getdata('mwrjbody')
let imwrjbody = $.getdata('imwrjbody')
let imwrjhd = $.getdata('imwrjhd')
!(async () => {
  if (typeof $request !== "undefined") {
    await mwrjck()
   
  } else {mwrjurlArr.push($.getdata('mwrjurl'))
    mwrjhdArr.push($.getdata('mwrjhd'))
    imwrjhdArr.push($.getdata('imwrjhd'))
    mwrjbodyArr.push($.getdata('mwrjbody'))
    imwrjbodyArr.push($.getdata('imwrjbody'))
    let mwrjcount = ($.getval('mwrjcount') || '1');
  for (let i = 2; i <= mwrjcount; i++) {
    mwrjurlArr.push($.getdata(`mwrjurl${i}`))
    mwrjhdArr.push($.getdata(`mwrjhd${i}`))
    imwrjhdArr.push($.getdata(`imwrjhd${i}`))
    mwrjbodyArr.push($.getdata(`mwrjbody${i}`))
    imwrjbodyArr.push($.getdata(`imwrjbody${i}`))
  }
    console.log(`------------- 共${mwrjhdArr.length}个账号-------------\n`)
      for (let i = 0; i < mwrjhdArr.length; i++) {
        if (mwrjhdArr[i]) {
         mwrjbody = mwrjbodyArr[i];
          mwrjurl = mwrjurlArr[i];
          mwrjhd = mwrjhdArr[i];
          imwrjhd = imwrjhdArr[i];
          imwrjbody = imwrjbodyArr[i];
          $.index = i + 1;
          console.log(`\n开始【猫屋日记${$.index}】`)
          //await mwrjzd();
           //await mwrjlx();
          // await mwrjlxlq();
     for (let c = 0; c < 30; c++) {
      $.index = c + 1
      console.log(`\n第${c+1}次执行任务！`)
          await mwrjhc();
          await $.wait(3000);
          await mwrjhc();
          await $.wait(3000);
          await mwrjhc();
          await $.wait(3000);
          await mwrjhc();
          await $.wait(3000);
          await mwrjhc();
          await $.wait(3000);
          await mwrjksp();
          await $.wait(5000);
          await mwrjhby();
          await $.wait(5000);
          await mwrjhc();
          await $.wait(3000);
          await mwrjhc();
          await $.wait(3000);
          await mwrjhc();
          await $.wait(3000);
          await mwrjhc();
          await $.wait(3000);
          await mwrjhc();
          await $.wait(3000);
          await mwrjhby();
  }
    
          

  }
}}

})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())
function mwrjck() {
   if ($request.url.indexOf("autoStart") > -1 &&$request.body.indexOf("") > -1) {
 const mwrjurl = $request.url
  if(mwrjurl)     $.setdata(mwrjurl,`mwrjurl${status}`)
    $.log(mwrjurl)
const mwrjbody = $request.body
  if(mwrjbody)     $.setdata(mwrjbody,`mwrjbody${status}`)
    $.log(mwrjbody)
  const mwrjhd = JSON.stringify($request.headers)
        if(mwrjhd)    $.setdata(mwrjhd,`mwrjhd${status}`)
$.log(mwrjhd)
   $.msg($.name,"",'猫屋日记'+`${status}` +'一键合成数据获取成功！')
  }else if ($request.url.indexOf("autobuycat") > -1 &&$request.body.indexOf("x=") > -1) {
const imwrjbody = $request.body
    if(imwrjbody)   
$.setdata(imwrjbody,`imwrjbody${status}`)
    $.log(imwrjbody)  
const imwrjhd = JSON.stringify($request.headers)
        if(imwrjhd)    $.setdata(imwrjhd,`imwrjhd${status}`)
$.log(imwrjhd)
    $.msg('猫屋日记','',`获取一键养猫数据成功`)
}
}
/*
//自动合成
function mwrjzd(timeout = 0) {
  return new Promise((resolve) => {

let url = {
        url : 'https://appapi.mwrji.com/v1/index/autoStart',
        headers : JSON.parse(mwrjhd),
        body : mwrjbody,
}
      $.post(url, async (err, resp, data) => {

        try {
    const result = JSON.parse(data)
        if(result.code == 2000){
  $.log(`\n猫屋日记一键合成成功：🎉🎉🎉${result.message}`)
} else {

  $.log(`\n猫屋日记一键合成失败:❌❌❌${result.message}`)
 
}
   
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}*/
//养猫
function mwrjhc(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'https://appapi.mwrji.com/v1/cat/autobuycat',
        headers : JSON.parse(imwrjhd),
        body : imwrjbody,
}
      $.post(url, async (err, resp, data) => {

        try {
    const result = JSON.parse(data)
        if(result.code == 200){
  console.log(`\n猫屋日记一键养猫:`+result.message)

} else {

  $.log(`\n猫屋日记信息:${result.message}`)
 
}
   
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}
//看视频领钻石
function mwrjksp(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'https://appapi.mwrji.com/v1/cat/getgoodvalue',
        headers : JSON.parse(imwrjhd),
        body : imwrjbody,
}
      $.post(url, async (err, resp, data) => {

        try {
    const result = JSON.parse(data)
        if(result.code == 200){
  console.log(`\n看视频领钻石，获得:`+result.data.good_value)

} else {

  $.log(`\n看视频:${result.message}`)
 
}
   
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}
//红包雨
function mwrjhby(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'https://appapi.mwrji.com/v1/index/rainReceive',
        headers : JSON.parse(imwrjhd),
        body : imwrjbody,
}
      $.post(url, async (err, resp, data) => {

        try {
    const result = JSON.parse(data)
        if(result.code == 200){
  console.log(`\n红包雨获得金币:`+result.data.good_value)

} else {

  $.log(`\n红包雨:${result.message}`)
 
}
   
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}

/*
//旅行
function mwrjlx(timeout = 0) {
  return new Promise((resolve) => {

let url = {
        url : 'https://appapi.mwrji.com/v1/travel/startTravel',
        headers : JSON.parse(imwrjhd),
        body : imwrjbody,
}
      $.post(url, async (err, resp, data) => {

        try {
    const result = JSON.parse(data)
        if(result.code == 200){
  $.log(`\n旅行:${result.message}`)
await mwrjlxlq();
} else {

    $.log(`\n旅行:${result.message}`)
 
}
   
        } catch (e) {
        } finally {
          resolve()
        }
    },timeout)
  })
}
//旅行领取
function mwrjlxlq(timeout = 0) {
  return new Promise((resolve) => {

let url = {
        url : 'https://appapi.mwrji.com/v1/travel/takeAward',
        headers : JSON.parse(imwrjhd),
        body : imwrjbody,
}
      $.post(url, async (err, resp, data) => {

        try {
    const result = JSON.parse(data)
        if(result.code == 200){
    $.log(`\n旅行领取:${result.message}`)

} else {

    $.log(`\n旅行领取:${result.message}`)
 
}
   
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}*/
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
