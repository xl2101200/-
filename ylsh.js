/*

20210606  tom

软件名：引力生活    
下载地址： http://shop-h5.yinlishenghuo.com/#/share?code=VRF266

要实名人脸，1.98元认证费，选择性上车！零撸为主！！
可兑换大米！可兑换现金，3月份出来的，到目前有人已经撸了100斤大米了！

进入软件==赚钱==看专属视频一次即可获取ck

已知bug，需要每天手动看一次视频更新body，等有空在修复

怎么兑换大米？拥有足够的米粒就可以兑换了
点我的-领米中心，根据自己的米粒多少兑换相应斤数的大米，然后填写自己的收货地址等发货就行了，一般4天左右到。

怎么把米粒换成米值卖钱？
点我的-米粒-米粒兑换，兑换比例：4397米粒/1米值，兑换成米粒就可以到交易所把米粒卖了变现
交易地址：http://mtw.so/5usjyp

///////////////////////////////////////////////////

撸了不一定有，不撸肯定没有！
TG频道 https://t.me/tom_ww     
Task地址：https://raw.githubusercontent.com/xl2101200/-/main/Tom_task.josn
boxjs地址 ： https://raw.githubusercontent.com/xl2101200/-/main/tom.box.json  
    
///////////////////////////////////////////////////

圈X配置如下，其他软件自行测试
CRON自己改，默认写了22点运行   每天运行一次即可！
[task_local]
#引力生活
0 22 * * * https://raw.githubusercontent.com/xl2101200/-/main/ylsh.js, tag=引力生活, img-url=https://raw.githubusercontent.com/sngxpro/QuanX/master/icons/tom.png, enabled=true

[rewrite_local]
#引力生活
http://app-api.yinlishenghuo.com/api/jingdian/reward/video url script-request-body https://raw.githubusercontent.com/xl2101200/-/main/ylsh.js

[MITM]
hostname = app-api.yinlishenghuo.com


*/ 



const $ = new Env('引力生活');
let status;
status = (status = ($.getval("ylshstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
const ylshurlArr = [],ylshhdArr = [],ylshbodyArr = [],ylshcount = ''
let ylshurl = $.getdata('ylshurl')
let ylshhd = $.getdata('ylshhd')
let ylshbody = $.getdata('ylshbody')
let b=new Date().getTime()
let DD = RT(25000,35000)
let tz = ($.getval('tz') || '1'); //签到通知

    
!(async () => {
  if (typeof $request !== "undefined") {
    await ylshck()
  } else {ylshurlArr.push($.getdata('ylshurl'))
    ylshhdArr.push($.getdata('ylshhd'))
    ylshbodyArr.push($.getdata('ylshbody'))
    let ylshcount = ($.getval('ylshcount') || '1');
  for (let i = 2; i <= ylshcount; i++) {
    ylshurlArr.push($.getdata(`ylshurl${i}`))
    ylshhdArr.push($.getdata(`ylshhd${i}`))
    ylshbodyArr.push($.getdata(`ylshbody${i}`))}
    console.log(`------------- 共${ylshhdArr.length}个账号-------------\n`)
  for (let i = 0; i < ylshhdArr.length; i++) {
      if (ylshhdArr[i]) {
      ylshurl = ylshurlArr[i];
      ylshhd = ylshhdArr[i];
      ylshbody = ylshbodyArr[i];
      $.index = i + 1;
      console.log(`\n开始【引力生活${$.index}】`)}
      
      for (let c = 0; c < 10; c++) {
        $.index = c + 1
        console.log(`\n第${c+1}次执行任务！`)

        await ylshsp()
        await $.wait(DD)

      }
        await ylshxx()
        await $.wait(500)
        await message()





      }}})()

  .catch((e) => $.logErr(e))
  .finally(() => $.done())
function ylshck() {
   if ($request.url.indexOf("see") > -1) {
const ylshurl = $request.url
   if(ylshurl)     $.setdata(ylshurl,`ylshurl${status}`)
   $.log(ylshurl)

   const ylshhd = JSON.stringify($request.headers)
   if(ylshhd)    $.setdata(ylshhd,`ylshhd${status}`)
$.log(ylshhd)

const ylshbody = $request.body
if(ylshbody)     $.setdata(ylshbody,`ylshbody${status}`)
  $.log(ylshbody)

 $.msg($.name,"",`引力生活${status}headers获取成功`)
  }
}

function ylshsp(timeout = 0) {
  return new Promise((resolve) => {
let url = {
      url : `http://app-api.yinlishenghuo.com/api/jingdian/reward/video/see`,
      headers : JSON.parse(ylshhd),
      body : ylshbody,
}
      $.post(url, async (err, resp, data) => {
      try {
      const result = JSON.parse(data)
      if(result.code == 200){  

      console.log('\n'+result.msg+'  获得米粒：'+result.data)

      $.message +='\n'+result.msg+'  获得米粒：'+result.data

      } else {

      console.log('\n'+result.msg)

      $.message +='\n'+result.msg
    }
        } catch (e) {

        } finally {

          resolve()
        }
    },timeout)
  })
}

function ylshxx(timeout = 0) {
  return new Promise((resolve) => {
let url = {
      url : `http://app-api.yinlishenghuo.com/api/jingdian/center/getUserCenterInfo`,
      headers : JSON.parse(ylshhd),
      
}
      $.get(url, async (err, resp, data) => {
      try {

      const result = JSON.parse(data)

      if(result.code == 200){  

      console.log('\n现有米粒'+result.data.riceGrains)

      $.message +='\n现有米粒'+result.data.riceGrains

      } else {

      console.log('\n'+result.msg)

      $.message +='\n'+result.msg
    }
        } catch (e) {

        } finally {

          resolve()
        }
    },timeout)
  })
}


//通知
function message() {
  if(tz == 1){$.msg($.name,"",$.message)}
  }

  //随机延迟
function RT(X, Y) {
    do rt = Math.floor(Math.random() * Y);
    while (rt < X)
    return rt;}

  //当前时间
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
