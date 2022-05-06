/*tom
2022.5.5  修复

2022.5.6更新支持qx 修复签到错误  修改获取ck方式  密码登入即可获取ck 

广汽三菱  兑换实物  以前有上车的换这个js吧

没上车的 走一下邀请链接：https://mspace.gmmc.com.cn/partner/introduction?partnerId=pnu165628102013687962&fromUserId=1135364
 
青龙变量格式: export GQSLAuthorization=''  多个账号用 换行分割

QX 
[rewrite_local]
https://mspace.gmmc.com.cn/user-soa/user/account/sign-in url script-request-body sxpt.js

[mitm]
hostname = mspace.gmmc.com.cn

0 22 * * * https://raw.githubusercontent.com/xl2101200/-/main/ylsh.js, tag=引力生活(ios), img-url=https://raw.githubusercontent.com/sngxpro/QuanX/master/icons/tom.png, enabled=false

 */
