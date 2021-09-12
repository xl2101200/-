module.exports = {
    "id": "yyd",
    "name": "云阅读",
    "keys": ["yydurl","yydheader","yydurl2","yydheader2","yydurl3","yydheader3","yydurl4","yydheader4","yydurl5","yydheader5","yydurl6","yydheader6","yydurl7","yydheader7","yydurl8","yydheader8","yydurl9","yydheader9","yydurl10","yydheader10","yydurl11","yydheader11","yydurl12","yydheader12","yydurl13","yydheader13","yydurl14","yydheader14","yydurl15","yydheader15"],
    "author": "@tom",
    "settings": [{
      "id": "yydSuffix",
      "name": "当前账号",
      "val": "1",
      "type": "number",
      "desc": "当前抓取ck记录的账号序号，如：1、2、3、4"
    }, {
      "id": "yydCount",
      "name": "账号个数",
      "val": "1",
      "type": "number",
      "desc": "指定任务最多跑几个账号，根据抓取的账号数据个数来设值"
    }, {
      "id": "yydXH",
      "name": "循环获取ck",
      "val": "0",
      "type": "number",
      "desc": "0关闭，1打开，默认关闭"
    }, {
      "id": "yydTXTX",
      "name": "txtx",
      "val": "0",
      "type": "number",
      "desc": "0关闭，1打开，默认关闭"
    }, {
      "id": "yydSC",
      "name": "sc",
      "val": "0",
      "type": "number",
      "desc": "0关闭，1打开，默认关闭"
    }, {
      "id": "yydnotifyttt",
      "name": "推送控制",
      "val": "1",
      "type": "number",
      "desc": "0关闭，1推送,默认12点以及23点推送"
    }, {
      "id": "yydnotifyInterval",
      "name": "通知控制",
      "val": "2",
      "type": "number",
      "desc": "0关闭，1为 所有通知，2为 12，23 点通知，3为 6，12，18，23 点通知"
    }, {
      "id": "yydMinutes",
      "name": "推送-通知 分钟控制",
      "val": "10",
      "type": "number",
      "desc": "推送以及通知控制在什么分钟段，可设置0-59,默认0到10"
    }],
    "repo": "https://raw.githubusercontent.com/xl2101200/-/main/yyd.js",
    "icons": ["https://raw.githubusercontent.com/xl2101200/-/main/tom/tom.jpg", "https://raw.githubusercontent.com/xl2101200/-/main/tom/tom.jpg"],
    "script": "https://raw.githubusercontent.com/xl2101200/-/main/yyd.js",
    "icon": "https://raw.githubusercontent.com/xl2101200/-/main/tom/tom.jpg",
    "favIcon": "mdi-star-outline",
    "favIconColor": "grey",
    "datas": [{
      "key": "yydurl",
      "val": ""
    }, {
      "key": "yydheader",
      "val": ""
    }, {
      "key": "yydurl2",
      "val": ""
    }, {
      "key": "yydheader2",
      "val": ""
    }],
    "sessions": [],
    "isLoaded": true
  }
  
