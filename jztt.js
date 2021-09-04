/*
appstore 搜索九章头条   

1W金币=1元

由于最近沉迷游戏！钓鱼！都没空整！
@ZIYE大佬更新并增加自动提现！感谢大佬！

点提现没反应的：退出登录，使用微信登录，绑定原账号的手机号即可

自动提现：自动提0.3元

cron 每天上线50篇文章，超过就是1金币

圈x  其他自己编写
[rewrite_local]
https://api.st615.com/v1/user/info? url script-request-header https://raw.githubusercontent.com/xl2101200/-/main/jztt.js

[mitm]
api.st615.com


*/

GXRZ = 'Tom 9.4增加提现0.3'
const $ = Env("九章头条");
$.idx = ($.idx = ($.getval('jzttSuffix') || '1') - 1) > 0 ? ($.idx + 1 + '') : ''; // 账号扩展字符
const notify = $.isNode() ? require("./sendNotify") : ``;
const COOKIE = $.isNode() ? require("./jzttCOOKIE") : ``;
const logs = 0; // 0关闭日志，1原始日志，2格式化，3格式化且解码，
notifyttt = 1; // 0为关闭外部推送，1为12 23 点外部推送
notifyInterval = 2; // 0为关闭通知，1为所有通知，2为12 23 点通知  ， 3为 6 12 18 23 点通知 
Minutes = 10; // 通知 默认控制在0-10分内
let DD = RT(25000, 30000) //随机延迟
let dd = RT(0, 20)
K = '', $.message = '', DATA = '', XH = '0', COOKIES_SPLIT = '', ddtime = '', wzids = '', spids = '', id = '';

let jztturlArr = [];
let jztturlVal = ``;
let middlejzttURL = [];

console.log(`${GXRZ}\n`);
$.message += `${GXRZ}\n`
if ($.isNode() && process.env.jztt_jzttURL) {
    XH = process.env.jztt_XH || "0";
    TXTX = process.env.jztt_TXTX || "0";
    SC = process.env.jztt_SC || "0";
    notifyttt = process.env.jztt_notifyttt || "1";
    notifyInterval = process.env.jztt_notifyInterval || "2";
    Minutes = process.env.jztt_Minutes || "10";

    COOKIES_SPLIT = process.env.COOKIES_SPLIT || "\n";
    console.log(
        `============ cookies分隔符为：${JSON.stringify(
      COOKIES_SPLIT
    )} =============\n`
    );
    if (
        process.env.jztt_jzttURL &&
        process.env.jztt_jzttURL.indexOf(COOKIES_SPLIT) > -1
    ) {
        middlejzttURL = process.env.jztt_jzttURL.split(COOKIES_SPLIT);
    } else {
        middlejzttURL = process.env.jztt_jzttURL.split();
    }
    Object.keys(middlejzttURL).forEach((item) => {
        if (middlejzttURL[item]) {
            jztturlArr.push(middlejzttURL[item]);
        }
    });



} else if ($.isNode() && COOKIE.datas && COOKIE.datas[0].val) {
    console.log(
        `============ cookie方式为：boxjs复制会话 =============\n`
    );
    XH = (COOKIE.settings.find(item => item.id === `jzttXH`)).val || '0';
    TXTX = (COOKIE.settings.find(item => item.id === `jzttTXTX`)).val || '0';
    SC = (COOKIE.settings.find(item => item.id === `jzttSC`)).val || '0';
    notifyttt = (COOKIE.settings.find(item => item.id === `jzttnotifyttt`)).val || '1';
    notifyInterval = (COOKIE.settings.find(item => item.id === `jzttnotifyInterval`)).val || '2';
    Minutes = (COOKIE.settings.find(item => item.id === `jzttMinutes`)).val || '10';
    jzttCount = COOKIE.settings.find(item => item.id === `jzttCount`).val || '1';



    for (let i = 1; i <= jzttCount; i++) {
        if (i == 1) {
            op = ``
        } else {
            op = i
        }

        if (COOKIE.datas.find(item => item.key === `jztturl${op}`).val) {
            jztturlArr.push(COOKIE.datas.find(item => item.key === `jztturl${op}`).val);


        }
    }
} else {
    if ("jzttXH") {
        XH = $.getval("jzttXH") || '0';
    }
    if ("jzttTXTX") {
        TXTX = $.getval("jzttTXTX") || '0';
    }
    if ("jzttSC") {
        SC = $.getval("jzttSC") || '0';
    }
    if ("jzttnotifyttt") {
        notifyttt = $.getval("jzttnotifyttt") || '1';
    }
    if ("jzttnotifyInterval") {
        notifyInterval = $.getval("jzttnotifyInterval") || '1';
    }
    if ("jzttMinutes") {
        Minutes = $.getval("jzttMinutes") || '10';
    }
    let jzttCount = ($.getval('jzttCount') || '1') - 0;
    for (let i = 1; i <= jzttCount; i++) {
        if (i == 1) {
            op = ``
        } else {
            op = i
        }
        if ($.getdata(`jztturl${op}`)) {
            jztturlArr.push($.getdata(`jztturl${op}`));


        }
    }
}



/*
function RedCookie() {
    if (XH == 1 && JSON.stringify($request.headers).indexOf("userid") >= 0 && $request.url.indexOf("device") >= 0 && $request.body.indexOf("firstInstallTime") >= 0) {


        op = 1
        while (true) {
            op++;
            if (!$.getdata(`jztturl${op}`)) {
                $.setdata(`${op-1}`, `jzttSuffix`);
                $.idx = ($.idx = ($.getval('jzttSuffix') || '1') - 1) > 0 ? ($.idx + 1 + '') : '';
                $.log(
                    `[${$.name + $.idx}] 当前九章头条账号数量为${op-1}✅: 成功🎉`
                );
                $.msg($.name + $.idx, `当前九章头条账号数量为${op-1}: 成功🎉`, ``);
                break;
            }
        }
    }
}*/


function GetCookie() {


    //获取用户
    if ($request.url.indexOf("info?") > -1 && $request.url.indexOf("user") > -1) {


        jztturlVal = $request.url.split('token=')[1]

        if (jztturlVal) {
            if (XH == 1) {
                cookie()

                function cookie() {
                    bodys = $.getdata('jztturl' + $.idx);
                    if (bodys) {
                        if (bodys != jztturlVal) {
                            if ($.idx == '') {
                                $.idx = 2
                            } else {
                                $.idx = Number($.idx) + 1
                            }
                            cookie()
                        } else {
                            $.setdata(jztturlVal, "jztturl" + $.idx);
                            $.log(
                                `[${$.name + $.idx}] 更新用户ck✅: 成功,jztturlVal: ${jztturlVal}`
                            );
                            $.msg($.name + $.idx, `更新用户ck✅: 成功,jztturlVal`, ``);
                            $.done();
                        };
                    } else {
                        $.setdata(jztturlVal, "jztturl" + $.idx);
                        $.log(
                            `[${$.name + $.idx}] 新增用户ck✅: 成功,jztturlVal: ${jztturlVal}`
                        );
                        $.msg($.name + $.idx, `新增用户ck✅: 成功,jztturlVal`, ``);
                        $.done();
                    };
                }
            } else {
                $.setdata(jztturlVal, "jztturl" + $.idx);
                $.log(
                    `[${$.name + $.idx}] 获取用户ck✅: 成功,jztturlVal: ${jztturlVal}`
                );
                $.msg($.name + $.idx, `获取用户ck✅: 成功`, `${jztturlVal}`);
                $.done();
            }
        }
    }


}




console.log(
    `================== 脚本执行 - 北京时间(UTC+8)：${new Date(
    new Date().getTime() +
    new Date().getTimezoneOffset() * 60 * 1000 +
    8 * 60 * 60 * 1000
  ).toLocaleString()} =====================\n`
);


console.log(
    `============ 共 ${jztturlArr.length} 个${$.name}账号=============\n`
);
//时间
nowTimes = new Date(
    new Date().getTime() +
    new Date().getTimezoneOffset() * 60 * 1000 +
    8 * 60 * 60 * 1000
);
//今天
Y = nowTimes.getFullYear() + '-';
M = (nowTimes.getMonth() + 1 < 10 ? '0' + (nowTimes.getMonth() + 1) : nowTimes.getMonth() + 1) + '-';
D = (nowTimes.getDate() < 10 ? '0' + (nowTimes.getDate()) : nowTimes.getDate());
ddtime = Y + M + D;
//console.log(ddtime)
//当前10位时间戳
function ts(inputTime) {
    if ($.isNode()) {
        TS = Math.round((new Date().getTime() +
            new Date().getTimezoneOffset() * 60 * 1000) / 1000).toString();
    } else TS = Math.round((new Date().getTime() +
        new Date().getTimezoneOffset() * 60 * 1000 +
        8 * 60 * 60 * 1000) / 1000).toString();
    return TS;
};
//今天0点时间戳时间戳
function daytime(inputTime) {
    DAYTIME = new Date(new Date().toLocaleDateString()).getTime();
    return DAYTIME;
};
//时间戳格式化日期
function time(inputTime) {
    var date = new Date(inputTime);
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y + M + D + h + m + s;
};
//日期格式化时间戳
function timecs(newtime) {

    if (newtime.indexOf(" ") >= 0) {
        newtime = newtime.replace(' ', 'T')
    }
    var date = new Date(newtime).getTime()
    return date;
};
//随机udid 大写
function udid() {
    var s = [];
    var hexDigits = "0123456789ABCDEF";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
}
//随机udid 小写
function udid2() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
//str编码
function encodeUnicode(str) {
    var res = [];
    for (var i = 0; i < str.length; i++) {
        res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
    }
    return "\\u" + res.join("\\u");
}
//str解码
function decodeUnicode(str) {
    str = str.replace(/\\u/g, "%u");
    return unescape(str);
}
//es编码  escape("中文")
//es解码  unescape("%u4E2D%u6587")
//URI编码  encodeURI("中文") 不完全
//URI解码  decodeURI("%E4%B8%AD%E6%96%87")  不完全
//URIC编码  encodeURIComponent("中文")
//URIC解码  decodeURIComponent("%E4%B8%AD%E6%96%87")
//日志格式化
function format(str) {
    if (logs == 2) {
        str = JSON.stringify(str).replace(/,/g, ",\n").replace(/{/g, '{\n').replace(/}/g, '\n}').replace(/\\/g, "").replace(/\\\\/g, '\\')
    }
    if (logs == 3) {
        str = decodeUnicode(JSON.stringify(str)).replace(/,/g, ",\n").replace(/{/g, '{\n').replace(/}/g, '\n}').replace(/\\/g, "")
    }
    return str;
}
//随机延迟 ceil向上取值RT(0, 5)=1 2 3 4 5
//随机延迟 floor向下取值RT(0, 5)=0 1 2 3 4
//随机延迟 round四舍五入取值RT(0, 5)=0 1 2 3 4 5
function RT(X, Y) {
    do rt = Math.floor(Math.random() * Y);
    while (rt < X)
    return rt;
}
let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {

    GetCookie()
    $.done();
} else {
    !(async () => {

        if (jztturlArr.length == 0) {

            $.msg(
                $.name, time(Number(Date.now())) +
                `⚠️未获取COOKIE\n请点击前往获取 http://st712.com/?invite_code=LoWpebv3\n`,
                'http://st712.com/?invite_code=LoWpebv3', {
                    "open-url": "http://st712.com/?invite_code=LoWpebv3"
                }
            );
            return;
        } else {
            await all();
            await msgShow();

        }
    })()
    .catch((e) => {
            $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
        })
        .finally(() => {
            $.done();
        })
}
async function all() {

    for (let i = 0; i < jztturlArr.length; i++) {
        sy = 0
        jztturlVal = jztturlArr[i];
        $.index = i + 1;
        O = (`${$.name + $.index}🔔`);
        $.isLogin = true;
        if (jztturlVal) {

            taskheader = {};
            console.log(`-----------🔔开始运行【${$.name + $.index}】🔔-----------`)

            K = `x2🚩`;
            if (K == `x🚩`) {

                taskurl = `https://api.st615.com/v1/index/benefit?token=${jztturlVal}`,

                    await taskget();

                $.x = DATA
                if ($.x.code == 0) {

                    console.log(`${$.x.msg}\n`);
                    await $.wait(3000)
                }
            }


            K = `登录2🚩`;
            if (K == `登录🚩`) {

                taskurl = `https://api.st615.com/v1/user/info?token=${jztturlVal}`,

                    await taskget();

                $.dl = DATA
                if ($.dl.code == 0) {

                    console.log(`【登录】：${$.dl.msg}\n`);
                    await $.wait(3000)
                }
            }



            K = `用户信息🚩`;
            if (K == `用户信息🚩`) {
                taskurl = `https://api.st615.com/v1/user/info?token=${jztturlVal}`



                await taskget();
                $.user = DATA

                if ($.user.data.name) {
                    nickname = $.user.data.name
                    console.log(`\n${O}\n========== ${nickname} ==========\n现金余额：${$.user.data.money}元\n金币余额：${$.user.data.integral}个\n`)
                    $.message += `\n${O}\n========== 【${nickname}】 ==========\n【现金余额】：${$.user.data.money}元\n【金币余额】：${$.user.data.integral}个\n`;
                } else {
                    $.isLogin = false; //cookie过期

                }






                if (!$.isLogin) {
                    $.msg(
                        O, time(Number(Date.now())) +
                        `⚠️COOKIE失效\n请点击前往获取 http://st712.com/?invite_code=LoWpebv3`,
                        'http://st712.com/?invite_code=LoWpebv3', {
                            "open-url": "http://st712.com/?invite_code=LoWpebv3"
                        }
                    );
                    if ($.isNode()) {
                        await notify.sendNotify(O, time(Number(Date.now())) + `⚠️COOKIE失效\n请点击前往获取http://st712.com/?invite_code=LoWpebv3`);
                    }
                    continue
                }

if ($.user.data.name&&$.user.data.name.indexOf("用户") > -1) {

console.log(`此号异常：请使用微信登录\n`);
                    $.message += `【此号异常】：请使用微信登录\n`

continue
}


            }

            K = `任务🚩`;
            if (K == `任务🚩`) {

                taskurl = `https://api.st615.com/v1/user/task?token=${jztturlVal}`,

                    await taskget();

                $.rw = DATA
                if ($.rw.code == 0) {
                    if ($.rw.data.daily_task[2].id == 6 && $.rw.data.daily_task[2].is_finish != 1) {

                        K = `打卡🚩`;
                        if (K == `打卡🚩`) {
                            await $.wait(1000)
                            taskurl = `https://api.st615.com/v1/task/clock`,
                                taskbody = `is_double=0&token=${jztturlVal}`,
                                await taskpost();

                            $.dk = DATA
                            if ($.dk.code == 0) {

                                console.log(`打卡：${$.dk.msg}，获得金币：${$.dk.data.coin}个\n`);

                                sy += $.dk.data.coin


                            }
                        }



                        K = `签到🚩`;
                        if (K == `签到🚩`) {
                            await $.wait(1000)
                            taskurl = `https://api.st615.com/v1/sign/sign`,
                                taskbody = `token=${jztturlVal}`,
                                await taskpost();

                            $.sign = DATA
                            if ($.sign.code == 0 && $.sign.data && $.sign.data.integral) {

                                console.log(`签到：${$.sign.msg}，获得金币：${$.sign.data.integral}个\n`);

                                sy += $.sign.data.integral

                            }
                        }
                    }
                }
            }



            K = `提现任务🚩`;
            if (K == `提现任务🚩`) {

                taskurl = `https://api.st615.com/v1/cash/qualify?token=${jztturlVal}&money=0.3`,
                    //taskbody = `token=${jztturlVal}`,
                    await taskget();
                $.txlb = DATA
                if ($.txlb.code == 0) {

                    console.log(`提现任务：${$.txlb.data.list[0].title}-${$.txlb.data.list[0].has}/${$.txlb.data.list[0].target},${$.txlb.data.list[1].title}-${$.txlb.data.list[1].has}/${$.txlb.data.list[1].target}\n`);
                    $.message += `【提现任务】：${$.txlb.data.list[0].title}-${$.txlb.data.list[0].has}/${$.txlb.data.list[0].target},${$.txlb.data.list[1].title}-${$.txlb.data.list[1].has}/${$.txlb.data.list[1].target}\n`
                    // sy += $.txlb.data.integral
                    // await $.wait(3000)
                }
            }

            K = `历史提现🚩`;
            if (K == `历史提现🚩`) {
                await $.wait(300)
                taskurl = `https://api.st615.com/v1/cash/page-list?token=${jztturlVal}&page=1&limit=10`,
                    // taskbody = `token=${jztturlVal}&type=1&money=0.3`,
                    await taskget();
                $.lstx = DATA
                if ($.lstx.code == 0 && $.lstx.data.list && $.lstx.data.list.length > 0) {

                    console.log(`上次提现：${$.lstx.data.list[0].add_time}\n`);
                    $.message += `【上次提现】：${$.lstx.data.list[0].add_time}\n`

                } else if ($.lstx.code == 0 && $.lstx.data.list && $.lstx.data.list.length == 0) {

                    console.log(`上次提现：未提现过\n`);
                    $.message += `【上次提现】：未提现过\n`

                }

            }











            K = `提现视频🚩`;
            if (K == `提现视频🚩`) {
                await $.wait(300)
                if ($.txlb.data && $.txlb.data.list[1].has != $.txlb.data.list[1].target) {
                    taskurl = `https://api.st615.com/v1/cash/ads?token=${jztturlVal}&source=cash`,
                        //taskbody = `token=${jztturlVal}`,
                        await taskget();
                    $.txsp = DATA
                    if ($.txsp.code == 0) {

                        console.log(`提现视频：${$.txsp.msg}\n`);
                        $.message += `【提现视频】：${$.txsp.msg}\n`
                        // sy += $.txlb.data.integral
                        // await $.wait(3000)
                    }
                }
            }


            K = `提现🚩`;
            if (K == `提现🚩`) {
                await $.wait(300)
                if ($.txlb.data && $.lstx.data && ($.lstx.data.list.length == 0 || timecs($.lstx.data.list[0].add_time) < daytime()) && $.user.data.money >= 0.3 && $.txlb.data.list[0].has == $.txlb.data.list[0].target && $.txlb.data.list[1].has == $.txlb.data.list[1].target) {
                    taskurl = `https://api.st615.com/v1/cash/withdraw-new`,
                        taskbody = `token=${jztturlVal}&type=1&money=0.3`,
                        await taskpost();
                    $.tx = DATA
                    if ($.tx.code == 0) {

                        console.log(`提现0.3：${$.tx.msg}\n`);
                        $.message += `【提现0.3】：${$.tx.msg}\n`
                        // sy += $.txlb.data.integral
                        // await $.wait(3000)
                    }
                } else if ($.lstx.data && $.lstx.data.list.length > 0 && timecs($.lstx.data.list[0].add_time) >= daytime()) {

                    console.log(`提现0.3：今日已提\n`);
                    $.message += `【提现0.3】：今日已提\n`

                }
            }












            K = `看视频1🚩`;
            if (K == `看视频1🚩`) {
                console.log(`随机延迟：${DD/1000}秒\n`);
                await $.wait(DD)

                taskurl = `https://api.st615.com/v1/task/ads`,
                    taskbody = `token=${jztturlVal}&id=8`,
                    await taskpost();

                $.sp1 = DATA
                if ($.sp1.code == 0 && $.sp1.data.coin) {

                    console.log(`看视频1获得金币：${$.sp1.data.coin}个\n`);

                    sy += $.sp1.data.coin

                }
            }

            K = `看视频2🚩`;
            if (K == `看视频2🚩`) {
                console.log(`随机延迟：${DD/1000}秒\n`);
                await $.wait(DD)

                taskurl = `https://api.st615.com/v1/task/ads`,
                    taskbody = `token=${jztturlVal}&id=9`,
                    await taskpost();

                $.sp2 = DATA
                if ($.sp2.code == 0 && $.sp2.data.coin) {

                    console.log(`看视频2获得金币：${$.sp2.data.coin}个\n`);

                    sy += $.sp2.data.coin

                }
            }

            K = `看视频3🚩`;
            if (K == `看视频3🚩`) {
                console.log(`随机延迟：${DD/1000}秒\n`);
                await $.wait(DD)

                taskurl = `https://api.st615.com/v1/task/ads`,
                    taskbody = `token=${jztturlVal}&id=10`,
                    await taskpost();

                $.sp3 = DATA
                if ($.sp3.code == 0 && $.sp3.data.coin) {

                    console.log(`看视频3获得金币：${$.sp3.data.coin}个\n`);

                    sy += $.sp3.data.coin

                }
            }
            K = `看视频4🚩`;
            if (K == `看视频4🚩`) {
                console.log(`随机延迟：${DD/1000}秒\n`);
                await $.wait(DD)
                taskurl = `https://api.st615.com/v1/task/ads`,
                    taskbody = `token=${jztturlVal}&id=11`,
                    await taskpost();

                $.sp4 = DATA
                if ($.sp4.code == 0 && $.sp4.data.coin) {

                    console.log(`看视频4获得金币：${$.sp4.data.coin}个\n`);

                    sy += $.sp4.data.coin

                }
            }



            K = `文章id🚩`;
            if (K == `文章id🚩`) {

                taskurl = `https://api.st615.com/v1/article/list?cid=1&page=1&limit=20&type=0&terminal=Apple&version=1.2.3&token=${jztturlVal}`,

                    await taskget();

                $.wzid = DATA
                if ($.wzid.code == 0 && $.wzid.data.list[dd].id) {


                    wzids = $.wzid.data.list[dd].id
                    //await $.wait(3000)
                }
            }

            K = `看文章1🚩`;
            if (K == `看文章1🚩`) {
                await $.wait(3000)
                taskurl = `https://api.st615.com/v1/article/detail?id=${wzids}&uid=&token=${jztturlVal}&os=14.7.1&device=iPhone%2011`,
                    `https://api.st615.com/v1/article/detail?id=${wzids}&uid=&token=${jztturlVal}&os=14.7.1&device=iPhone%2011`

                await taskget();

                $.kwz1 = DATA
                if ($.kwz1.code == 0) {

                    //console.log(`【阅读文章】：${$.kwz1.data.title}`);


                }
            }

            K = `看文章2🚩`;
            if (K == `看文章2🚩`) {
                await $.wait(DD)
                taskurl = `https://api.st615.com/v1/comment/list?&article_id=${wzids}&page=1&limit=10&token=${jztturlVal}`,

                    await taskget();

                $.kwz2 = DATA
                if ($.kwz2.code == 0) {

                    //console.log()


                }
            }

            K = `看文章3🚩`;
            if (K == `看文章3🚩`) {
                await $.wait(3000)
                taskurl = `https://api.st615.com/v1/article/finish`,
                    taskbody = `id=${wzids}&token=${jztturlVal}`,
                    await taskpost();

                $.kwz3 = DATA
                if ($.kwz3.code == 0 && $.kwz3.data.coin) {

                    console.log(`看文章3获得金币：${$.kwz3.data.coin}个\n`);

                    sy += $.kwz3.data.coin

                }
            }


            K = `转发文章🚩`; //转发5次
            if (K == `转发文章🚩` && $.rw.data.daily_task[4].id == 14 && $.rw.data.daily_task[4].is_finish != 1) {
                await $.wait(3000)
                taskurl = `https://api.st615.com/v1/article/share`,
                    taskbody = `device=iPhone%2011&id=${wzids}&os=14.7.1&source=article&token=${jztturlVal}`,
                    await taskpost();

                $.zfwz = DATA
                if ($.zfwz.code == 0) {

                    console.log(`转发文章：${$.zfwz.msg}\n`);
                }
            }

        }
        console.log(`本次运行获得金：${sy}个\n`)
        $.message += `【本次运行获得金币】：${sy}个\n`
    }
}




//通知
function msgShow() {
    return new Promise(async resolve => {
        if (notifyInterval != 1) {
            console.log($.name + '\n' + $.message);
        }
        if (notifyInterval == 1) {
            $.msg($.name, ``, $.message);
        }
        if (notifyInterval == 2 && (nowTimes.getHours() === 12 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= Minutes)) {
            $.msg($.name, ``, $.message);
        }
        if (notifyInterval == 3 && (nowTimes.getHours() === 6 || nowTimes.getHours() === 12 || nowTimes.getHours() === 18 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= Minutes)) {
            $.msg($.name, ``, $.message);
        }
        if (notifyttt == 1 && $.isNode() && (nowTimes.getHours() === 12 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= Minutes))
            await notify.sendNotify($.name, $.message);
        resolve()
    })
}
//运行模块
function taskpost() {
    return new Promise(async resolve => {
        let url = {
            url: taskurl,
            headers: taskheader,
            body: taskbody,
        }
        $.post(url, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${O} ${K}API请求失败，请检查网络重试`)
                } else {
                    if (data) {
                        if (logs) $.log(`${O}, ${K}: ${format(data)}`);
                        DATA = JSON.parse(data);
                    } else {
                        console.log(`服务器返回数据为空`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}
//运行模块
function taskget() {
    return new Promise(async resolve => {
        let url = {
            url: taskurl,
            headers: taskheader
        }
        $.get(url, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${O} ${K}API请求失败，请检查网络重试`)
                } else {
                    if (data) {
                        if (logs) $.log(`${O}, ${K}: ${format(data)}`);
                        DATA = JSON.parse(data);
                    } else {
                        console.log(`服务器返回数据为空`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}
// prettier-ignore
function Env(name, opts) {
    class Http {
        constructor(env) {
            this.env = env
        }

        send(opts, method = 'GET') {
            opts = typeof opts === 'string' ? {
                url: opts
            } : opts
            let sender = this.get
            if (method === 'POST') {
                sender = this.post
            }
            return new Promise((resolve, reject) => {
                sender.call(this, opts, (err, resp, body) => {
                    if (err) reject(err)
                    else resolve(resp)
                })
            })
        }

        get(opts) {
            return this.send.call(this.env, opts)
        }

        post(opts) {
            return this.send.call(this.env, opts, 'POST')
        }
    }

    return new(class {
        constructor(name, opts) {
            this.name = name
            this.http = new Http(this)
            this.data = null
            this.dataFile = 'box.dat'
            this.logs = []
            this.isMute = false
            this.isNeedRewrite = false
            this.logSeparator = '\n'
            this.startTime = new Date().getTime()
            Object.assign(this, opts)
            this.log('', `🔔${this.name}, 开始!`)
        }

        isNode() {
            return 'undefined' !== typeof module && !!module.exports
        }

        isQuanX() {
            return 'undefined' !== typeof $task
        }

        isSurge() {
            return 'undefined' !== typeof $httpClient && 'undefined' === typeof $loon
        }

        isLoon() {
            return 'undefined' !== typeof $loon
        }

        isShadowrocket() {
            return 'undefined' !== typeof $rocket
        }

        toObj(str, defaultValue = null) {
            try {
                return JSON.parse(str)
            } catch {
                return defaultValue
            }
        }

        toStr(obj, defaultValue = null) {
            try {
                return JSON.stringify(obj)
            } catch {
                return defaultValue
            }
        }

        getjson(key, defaultValue) {
            let json = defaultValue
            const val = this.getdata(key)
            if (val) {
                try {
                    json = JSON.parse(this.getdata(key))
                } catch {}
            }
            return json
        }

        setjson(val, key) {
            try {
                return this.setdata(JSON.stringify(val), key)
            } catch {
                return false
            }
        }

        getScript(url) {
            return new Promise((resolve) => {
                this.get({
                    url
                }, (err, resp, body) => resolve(body))
            })
        }

        runScript(script, runOpts) {
            return new Promise((resolve) => {
                let httpapi = this.getdata('@chavy_boxjs_userCfgs.httpapi')
                httpapi = httpapi ? httpapi.replace(/\n/g, '').trim() : httpapi
                let httpapi_timeout = this.getdata('@chavy_boxjs_userCfgs.httpapi_timeout')
                httpapi_timeout = httpapi_timeout ? httpapi_timeout * 1 : 20
                httpapi_timeout = runOpts && runOpts.timeout ? runOpts.timeout : httpapi_timeout
                const [key, addr] = httpapi.split('@')
                const opts = {
                    url: `http://${addr}/v1/scripting/evaluate`,
                    body: {
                        script_text: script,
                        mock_type: 'cron',
                        timeout: httpapi_timeout
                    },
                    headers: {
                        'X-Key': key,
                        'Accept': '*/*'
                    }
                }
                this.post(opts, (err, resp, body) => resolve(body))
            }).catch((e) => this.logErr(e))
        }

        loaddata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require('fs')
                this.path = this.path ? this.path : require('path')
                const curDirDataFilePath = this.path.resolve(this.dataFile)
                const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
                const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
                const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
                if (isCurDirDataFile || isRootDirDataFile) {
                    const datPath = isCurDirDataFile ? curDirDataFilePath : rootDirDataFilePath
                    try {
                        return JSON.parse(this.fs.readFileSync(datPath))
                    } catch (e) {
                        return {}
                    }
                } else return {}
            } else return {}
        }

        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require('fs')
                this.path = this.path ? this.path : require('path')
                const curDirDataFilePath = this.path.resolve(this.dataFile)
                const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
                const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
                const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
                const jsondata = JSON.stringify(this.data)
                if (isCurDirDataFile) {
                    this.fs.writeFileSync(curDirDataFilePath, jsondata)
                } else if (isRootDirDataFile) {
                    this.fs.writeFileSync(rootDirDataFilePath, jsondata)
                } else {
                    this.fs.writeFileSync(curDirDataFilePath, jsondata)
                }
            }
        }

        lodash_get(source, path, defaultValue = undefined) {
            const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
            let result = source
            for (const p of paths) {
                result = Object(result)[p]
                if (result === undefined) {
                    return defaultValue
                }
            }
            return result
        }

        lodash_set(obj, path, value) {
            if (Object(obj) !== obj) return obj
            if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || []
            path
                .slice(0, -1)
                .reduce((a, c, i) => (Object(a[c]) === a[c] ? a[c] : (a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {})), obj)[
                    path[path.length - 1]
                ] = value
            return obj
        }

        getdata(key) {
            let val = this.getval(key)
            // 如果以 @
            if (/^@/.test(key)) {
                const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
                const objval = objkey ? this.getval(objkey) : ''
                if (objval) {
                    try {
                        const objedval = JSON.parse(objval)
                        val = objedval ? this.lodash_get(objedval, paths, '') : val
                    } catch (e) {
                        val = ''
                    }
                }
            }
            return val
        }

        setdata(val, key) {
            let issuc = false
            if (/^@/.test(key)) {
                const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
                const objdat = this.getval(objkey)
                const objval = objkey ? (objdat === 'null' ? null : objdat || '{}') : '{}'
                try {
                    const objedval = JSON.parse(objval)
                    this.lodash_set(objedval, paths, val)
                    issuc = this.setval(JSON.stringify(objedval), objkey)
                } catch (e) {
                    const objedval = {}
                    this.lodash_set(objedval, paths, val)
                    issuc = this.setval(JSON.stringify(objedval), objkey)
                }
            } else {
                issuc = this.setval(val, key)
            }
            return issuc
        }

        getval(key) {
            if (this.isSurge() || this.isLoon()) {
                return $persistentStore.read(key)
            } else if (this.isQuanX()) {
                return $prefs.valueForKey(key)
            } else if (this.isNode()) {
                this.data = this.loaddata()
                return this.data[key]
            } else {
                return (this.data && this.data[key]) || null
            }
        }

        setval(val, key) {
            if (this.isSurge() || this.isLoon()) {
                return $persistentStore.write(val, key)
            } else if (this.isQuanX()) {
                return $prefs.setValueForKey(val, key)
            } else if (this.isNode()) {
                this.data = this.loaddata()
                this.data[key] = val
                this.writedata()
                return true
            } else {
                return (this.data && this.data[key]) || null
            }
        }

        initGotEnv(opts) {
            this.got = this.got ? this.got : require('got')
            this.cktough = this.cktough ? this.cktough : require('tough-cookie')
            this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()
            if (opts) {
                opts.headers = opts.headers ? opts.headers : {}
                if (undefined === opts.headers.Cookie && undefined === opts.cookieJar) {
                    opts.cookieJar = this.ckjar
                }
            }
        }

        get(opts, callback = () => {}) {
            if (opts.headers) {
                delete opts.headers['Content-Type']
                delete opts.headers['Content-Length']
            }
            if (this.isSurge() || this.isLoon()) {
                if (this.isSurge() && this.isNeedRewrite) {
                    opts.headers = opts.headers || {}
                    Object.assign(opts.headers, {
                        'X-Surge-Skip-Scripting': false
                    })
                }
                $httpClient.get(opts, (err, resp, body) => {
                    if (!err && resp) {
                        resp.body = body
                        resp.statusCode = resp.status
                    }
                    callback(err, resp, body)
                })
            } else if (this.isQuanX()) {
                if (this.isNeedRewrite) {
                    opts.opts = opts.opts || {}
                    Object.assign(opts.opts, {
                        hints: false
                    })
                }
                $task.fetch(opts).then(
                    (resp) => {
                        const {
                            statusCode: status,
                            statusCode,
                            headers,
                            body
                        } = resp
                        callback(null, {
                            status,
                            statusCode,
                            headers,
                            body
                        }, body)
                    },
                    (err) => callback(err)
                )
            } else if (this.isNode()) {
                this.initGotEnv(opts)
                this.got(opts)
                    .on('redirect', (resp, nextOpts) => {
                        try {
                            if (resp.headers['set-cookie']) {
                                const ck = resp.headers['set-cookie'].map(this.cktough.Cookie.parse).toString()
                                if (ck) {
                                    this.ckjar.setCookieSync(ck, null)
                                }
                                nextOpts.cookieJar = this.ckjar
                            }
                        } catch (e) {
                            this.logErr(e)
                        }
                        // this.ckjar.setCookieSync(resp.headers['set-cookie'].map(Cookie.parse).toString())
                    })
                    .then(
                        (resp) => {
                            const {
                                statusCode: status,
                                statusCode,
                                headers,
                                body
                            } = resp
                            callback(null, {
                                status,
                                statusCode,
                                headers,
                                body
                            }, body)
                        },
                        (err) => {
                            const {
                                message: error,
                                response: resp
                            } = err
                            callback(error, resp, resp && resp.body)
                        }
                    )
            }
        }

        post(opts, callback = () => {}) {
            const method = opts.method ? opts.method.toLocaleLowerCase() : 'post'
            // 如果指定了请求体, 但没指定`Content-Type`, 则自动生成
            if (opts.body && opts.headers && !opts.headers['Content-Type']) {
                opts.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            }
            if (opts.headers) delete opts.headers['Content-Length']
            if (this.isSurge() || this.isLoon()) {
                if (this.isSurge() && this.isNeedRewrite) {
                    opts.headers = opts.headers || {}
                    Object.assign(opts.headers, {
                        'X-Surge-Skip-Scripting': false
                    })
                }
                $httpClient[method](opts, (err, resp, body) => {
                    if (!err && resp) {
                        resp.body = body
                        resp.statusCode = resp.status
                    }
                    callback(err, resp, body)
                })
            } else if (this.isQuanX()) {
                opts.method = method
                if (this.isNeedRewrite) {
                    opts.opts = opts.opts || {}
                    Object.assign(opts.opts, {
                        hints: false
                    })
                }
                $task.fetch(opts).then(
                    (resp) => {
                        const {
                            statusCode: status,
                            statusCode,
                            headers,
                            body
                        } = resp
                        callback(null, {
                            status,
                            statusCode,
                            headers,
                            body
                        }, body)
                    },
                    (err) => callback(err)
                )
            } else if (this.isNode()) {
                this.initGotEnv(opts)
                const {
                    url,
                    ..._opts
                } = opts
                this.got[method](url, _opts).then(
                    (resp) => {
                        const {
                            statusCode: status,
                            statusCode,
                            headers,
                            body
                        } = resp
                        callback(null, {
                            status,
                            statusCode,
                            headers,
                            body
                        }, body)
                    },
                    (err) => {
                        const {
                            message: error,
                            response: resp
                        } = err
                        callback(error, resp, resp && resp.body)
                    }
                )
            }
        }
        /**
         *
         * 示例:$.time('yyyy-MM-dd qq HH:mm:ss.S')
         *    :$.time('yyyyMMddHHmmssS')
         *    y:年 M:月 d:日 q:季 H:时 m:分 s:秒 S:毫秒
         *    其中y可选0-4位占位符、S可选0-1位占位符，其余可选0-2位占位符
         * @param {string} fmt 格式化参数
         * @param {number} 可选: 根据指定时间戳返回格式化日期
         *
         */
        time(fmt, ts = null) {
            const date = ts ? new Date(ts) : new Date()
            let o = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'H+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds(),
                'q+': Math.floor((date.getMonth() + 3) / 3),
                'S': date.getMilliseconds()
            }
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
            for (let k in o)
                if (new RegExp('(' + k + ')').test(fmt))
                    fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
            return fmt
        }

        /**
         * 系统通知
         *
         * > 通知参数: 同时支持 QuanX 和 Loon 两种格式, EnvJs根据运行环境自动转换, Surge 环境不支持多媒体通知
         *
         * 示例:
         * $.msg(title, subt, desc, 'twitter://')
         * $.msg(title, subt, desc, { 'open-url': 'twitter://', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
         * $.msg(title, subt, desc, { 'open-url': 'https://bing.com', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
         *
         * @param {*} title 标题
         * @param {*} subt 副标题
         * @param {*} desc 通知详情
         * @param {*} opts 通知参数
         *
         */
        msg(title = name, subt = '', desc = '', opts) {
            const toEnvOpts = (rawopts) => {
                if (!rawopts) return rawopts
                if (typeof rawopts === 'string') {
                    if (this.isLoon()) return rawopts
                    else if (this.isQuanX()) return {
                        'open-url': rawopts
                    }
                    else if (this.isSurge()) return {
                        url: rawopts
                    }
                    else return undefined
                } else if (typeof rawopts === 'object') {
                    if (this.isLoon()) {
                        let openUrl = rawopts.openUrl || rawopts.url || rawopts['open-url']
                        let mediaUrl = rawopts.mediaUrl || rawopts['media-url']
                        return {
                            openUrl,
                            mediaUrl
                        }
                    } else if (this.isQuanX()) {
                        let openUrl = rawopts['open-url'] || rawopts.url || rawopts.openUrl
                        let mediaUrl = rawopts['media-url'] || rawopts.mediaUrl
                        return {
                            'open-url': openUrl,
                            'media-url': mediaUrl
                        }
                    } else if (this.isSurge()) {
                        let openUrl = rawopts.url || rawopts.openUrl || rawopts['open-url']
                        return {
                            url: openUrl
                        }
                    }
                } else {
                    return undefined
                }
            }
            if (!this.isMute) {
                if (this.isSurge() || this.isLoon()) {
                    $notification.post(title, subt, desc, toEnvOpts(opts))
                } else if (this.isQuanX()) {
                    $notify(title, subt, desc, toEnvOpts(opts))
                }
            }
            if (!this.isMuteLog) {
                let logs = ['', '==============📣系统通知📣==============']
                logs.push(title)
                subt ? logs.push(subt) : ''
                desc ? logs.push(desc) : ''
                console.log(logs.join('\n'))
                this.logs = this.logs.concat(logs)
            }
        }

        log(...logs) {
            if (logs.length > 0) {
                this.logs = [...this.logs, ...logs]
            }
            console.log(logs.join(this.logSeparator))
        }

        logErr(err, msg) {
            const isPrintSack = !this.isSurge() && !this.isQuanX() && !this.isLoon()
            if (!isPrintSack) {
                this.log('', `❗️${this.name}, 错误!`, err)
            } else {
                this.log('', `❗️${this.name}, 错误!`, err.stack)
            }
        }

        wait(time) {
            return new Promise((resolve) => setTimeout(resolve, time))
        }

        done(val = {}) {
            const endTime = new Date().getTime()
            const costTime = (endTime - this.startTime) / 1000
            this.log('', `🔔${this.name}, 结束! 🕛 ${costTime} 秒`)
            this.log()
            if (this.isSurge() || this.isQuanX() || this.isLoon()) {
                $done(val)
            }
        }
    })(name, opts)
}
