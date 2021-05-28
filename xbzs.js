/*
20210527 tom
20210529 更新无宝石自动领低保，判断对方宝石低于1000则不互动，增加23点整自动收获宝石！建议把cron改成30分钟运行一次
软件名称：WGC
下载地址：https://github.com/xl2101200/-/blob/main/tom/wgc.jpg

进入WGC → 游戏 → 小宝种树 → 种树 → 选择任意档次2wgc币(WGC币多的就选最高档的) → 许愿选择你中意的商品 → 右下角逛逛 → 互动 → 初级1 → 即可获取ck

此脚本仅为互动刷宝石,刷许愿商品进度
需要配合脚本库的WGC使用，脚本库的WGC是挖取WGC币的。没有wgc币无法种树的，恭喜之前上车的小伙伴

/////////////////////////////////////////////////
注意：
    卖宝石联系我，我给你介绍人收，嫌麻烦可以直接卖给我！我11元收……哈哈
10000宝石25元收，卖宝石可在tg群或微信群艾特我
TG频道 https://t.me/tom_ww
是撸钱还是撸实物你们随意，撸钱最少最少每天可以撸24元左右！
/////////////////////////////////////////////////


还是那句话，玩了可能没有！不玩一定没有！

Task地址  :  https://raw.githubusercontent.com/xl2101200/-/main/Tom_task.josn
boxjs地址 ： https://raw.githubusercontent.com/xl2101200/-/main/tom.box.json

圈X配置如下，其他软件自行测试
[task_local]
#小宝种树
0 0/30 * * * https://raw.githubusercontent.com/xl2101200/-/main/xbzs.js, tag=小宝种树, img-url=https://raw.githubusercontent.com/sngxpro/QuanX/master/icons/tom.png, enabled=true

[rewrite_local]
#小宝种树
http://wishtree.enjoyha.com/api/wishtree url script-request-header https://raw.githubusercontent.com/xl2101200/-/main/xbzs.js

[MITM]
hostname = wishtree.enjoyha.com

*/

const $ = new Env('小宝种树');
let myDate = new Date();
let getHours = myDate.getHours();  
let getMinutes = myDate.getMinutes(); 
let xbzsurl = $.getdata('xbzsurl')
let xbzshd = $.getdata('xbzshd')
let DD = '',id = '',gid = '',jg ='',bs='',mid =''
!(async () => {
  if (typeof $request !== "undefined") {
    await xbzsck()
  }else {
    await grid()
     for (let x = 0; x < 100; x++) {
      $.index = x + 1
      console.log(`\n第${x+1}次执行任务！\n`)
    DD = RT(500, 1000)
    await $.wait(DD);
    await grbs()
    await homesx()
}
    if(getHours >= 23 && getMinutes >= 5)
{await ss()}
}})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())
//
function xbzsck() {
   if ($request.url.indexOf("start") > -1 || $request.url.indexOf("start") > -1) {
    $.setdata($request.url,'xbzsurl')
    $.log(xbzsurl)
$.setdata(JSON.stringify($request.headers),'xbzshd')
$.log(xbzshd)

   $.msg($.name,"","获取headers成功！")
    } 
  }    

//收树
function ss(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://wishtree.enjoyha.com/api/wishtree/tree/pick',
        headers : JSON.parse($.getdata('xbzshd')),}
      $.get(url, async (err, resp, data) => {
        try {
           
    const result = JSON.parse(data)
        if(result.code == 200){
        $.msg($.name,"",'收获宝石 ： '+result.data.gemNum)
}else{
        $.log('\n'+result.msg)
}
        } catch (e) {
        } finally {
          resolve()
        }
    },timeout)
  })
} 

//获取用户id
function homesx(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://wishtree.enjoyha.com/api/wishtree/home?atHome=false',
        headers : JSON.parse($.getdata('xbzshd')),}
        
      $.get(url, async (err, resp, data) => {
        try {
           
    const result = JSON.parse(data)
        if(result.code == 200){
    id = result.data.homeUser.userId
    gid = result.data.tree.gemAmount
    jg = result.data.resultList

    if(`${gid}` >1000&&jg.length<18){$.log(`\n用户果树宝石大于1000，开始互动`),await hudong();DD = RT(6000, 10000);await $.wait(DD);}

    if(`${gid}` <1000||jg.length>18){$.log(`\n用户果树宝石小于1000，不互动`)}

}else{
     
}
        } catch (e) {
        } finally {
          resolve()
        }
    },timeout)
  })
} 

//互动
function hudong(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://wishtree.enjoyha.com/api/wishtree/play/start',
        headers : JSON.parse($.getdata('xbzshd')),
        body : `{"homeUserId":${id},"gemNum":"10"}`,}//默认使用10宝石互动，可自行更改
      $.post(url, async (err, resp, data) => {
        try {
           
    const result = JSON.parse(data)
        if(result.code == 200){
        console.log('\n互动成功')
        

}else{
        console.log('\n'+result.msg)
}
        } catch (e) {
        } finally {
          resolve()
        }
    },timeout)
  })
} 
//个人id
function grid(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://stc.enjoyha.com/api/user/info?',
        headers : JSON.parse($.getdata('xbzshd')),}
      $.get(url, async (err, resp, data) => {
        try {
    const result = JSON.parse(data)
        if(result.code == 200){
    mid = result.data.userId
   
}else{
 
}
        } catch (e) {
        } finally {
          resolve()
        }
    },timeout)
  })
} 
//个人宝石
function grbs(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : `http://wishtree.enjoyha.com/api/wishtree/home?atHome=true&homeUserId=${mid}`,
        headers : JSON.parse($.getdata('xbzshd')),}
      $.get(url, async (err, resp, data) => {
        try {
           
    const result = JSON.parse(data)
        if(result.code == 200){
        console.log('现有宝石：'+result.data.gemNum)
    bs = result.data.gemNum
   if(`${bs}` <1){$.log(`\n宝石为零，领取低保`),await dibao()}
}else{
        console.log('\n'+result.msg)
}
        } catch (e) {
        } finally {
          resolve()
        }
    },timeout)
  })
} 

//低保
function dibao(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://wishtree.enjoyha.com/api/wishtree/daily/reward',
        headers : JSON.parse($.getdata('xbzshd')),}
      $.get(url, async (err, resp, data) => {
        try {
           
    const result = JSON.parse(data)
        if(result.code == 200){
        $.log('\n领取低保成功，获得10宝石')

}else{
        console.log('\n'+result.msg)
}
        } catch (e) {
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
console.log('\n--------------'+getCurrentDate()+'--------------');
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
