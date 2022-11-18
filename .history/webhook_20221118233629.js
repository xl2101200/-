const TelegramBot = require('node-telegram-bot-api');
const NTBA_FIX_319 = 'test';
//-------------------------------------------------------------------
// tg 配置
const tg_token = '5764410097:AAG_NGZLbasOVH1L67QSWiq3PGW-rJFX9MA';
const admin_id = '1564672525';
const botName = 'Tom_sccookie_bot';


const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://admin:tom123456@mb.tomtenyears.cf:450'


module.exports = async (request, response) => {
    try {

        const bot = new TelegramBot(tg_token);
        const {
            body
        } = request;
        await task(body, bot);

    } catch (error) {

        console.error('Error sending message');
        console.log(error.toString());
    }

    response.send('OK, runing...');
};








class Qinglong {
    constructor(ql_hostname, client_id, client_secret) {
        this.ql_hostname = ql_hostname;
        this.ql_api = this.ql_hostname + '/open';
        this.client_id = client_id;
        this.client_secret = client_secret;
    }

    // get_token 登录
    async login() {
        try {
            var options = {
                'method': 'get',
                'url': `${this.ql_api}/auth/token?client_id=${this.client_id}&client_secret=${this.client_secret}`,
                'headers': {}
            };
            // console.log(options);
            let res = await this.http_req(options);
            // console.log(res);
            if (res.code == 200) {
                this.token = res.data.token;
            } else if (res.code == 400) {
                console.log(res.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    getEnvOptions(method, body) {
        let options = {
            'method': method,
            'url': `${this.ql_api}/envs`,
            'headers': {
                authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        };

        if (body) {
            options.body = JSON.stringify(body);
        }
        return options;
    }

    async doEnvApi(obj) {
        let {
            method,
            data,
            success,
            error,
        } = obj;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.http_req(this.getEnvOptions(method, data));
                // console.log(res);
                if (res.code == 200) {
                    console.log(res.data);
                    console.log(res.data.length);
                    success(res.data);
                    resolve(res.data);
                } else if (res.code == 400) {
                    console.log(res.message);
                    error(res);
                    reject(res.message);

                }
            } catch (error) {
                console.log(`未知错误\n${error}`);
                reject(`未知错误\n${error}`);
            }
        });

    }

    async getEnv() {
        return this.doEnvApi({
            method: 'get'
        });
    }

    async addEnv(data) {
        return new Promise(async (resolve) => {
            await this.doEnvApi({
                method: 'post',
                data: data,
                success: (res) => {
                    resolve(res);
                    console.log(`添加成功`);
                },
                error: () => {
                    console.log(res.message, 'ck重复');
                    resolve("ck重复, 请确认后再上传!");
                }

            });
        });

    }


    async deleteEnv(data) {
        return this.doEnvApi({
            method: 'delete',
            data: data,
            success: () => {
                console.log(`删除成功`);
            }
        });
    }


    async putEnv(data) {
        return this.doEnvApi({
            method: 'put',
            data: data,
            success: () => {
                console.log(`更新成功`);
            }
        });
    }


    async http_req(options) {
        const request = require('request');

        return new Promise((resolve, reject) => {

            function isJsonString(str) {
                if (typeof str == "string") {
                    try {
                        if (typeof JSON.parse(str) == "object") {
                            return true;
                        }
                    } catch (e) {
                        return false;
                    }
                }
                return false;
            }

            request(options, function (error, response) {
                if (error) throw new Error(error);
                // response.body
                let data = response.body;
                try {
                    if (typeof data == "string") {
                        if (isJsonString(data)) {
                            resolve(JSON.parse(data));
                        } else {
                            resolve(data);
                        }
                    } else {
                        resolve(data);
                    }
                } catch (e) {
                    console.log(error, response);
                    reject(error);
                }
            });
        });
    }
}


class DoTask {
    constructor(body) {
        this.body = body;
        this.bot = new TelegramBot(tg_token);
        this.resMsg = body.message; //收到的总信息
        this.fromId = body.message.from.id;
        this.chatId = body.message.chat.id; //用户id
        this.type = body.message.chat.type;
    }

    async getName() {
        let a = this.resMsg.from;
        let name = a.first_name;
        if (a.last_name) {
            name += " " + a.last_name;
        }
        return name;
    }

    async getName2(a) {
        let name = a.first_name;
        if (a.last_name) {
            name += " " + a.last_name;
        }
        return name;
    }



//查询用户id
    async inquire() {
        uname = await this.getName()
        console.log(uname)
        let msg = `尊敬的 ${uname} 您的ID：${this.chatId} `
        console.log(this.chatId, msg);
        await this.bot.sendMessage(this.chatId, msg);
    }
//添加用户id
    async addid(names, nameid) {
        if (this.chatId == admin_id) {
            console.log(`现在准备添加用户${names} ${nameid}`)
            await tjid(names, nameid)
            let msg = `添加用户 ${names} ${nameid} 成功`
            console.log(this.chatId, msg);
            await this.bot.sendMessage(this.chatId, msg);
        }
    }    
//偷撸列表
    async list() {
        console.log(await this.getName());
        let msg = `偷撸列表：\n程序名：美柚。下载方式：应用商店自行下载。抓包关键词：ckck。抓header里的token\n`;
        console.log(this.chatId, msg);
        await this.bot.sendMessage(this.chatId, msg);
    }
//上传ck提示
    async uploads() {
        console.log(await this.getName());
        let msg = `/upload ck名=ck\n像我这样发才对`;
        console.log(this.chatId, msg);
        await this.bot.sendMessage(this.chatId, msg);
    }
//上传ck
    async upload(resp) {
        console.log(await this.getName());
        let msg = `正在上传，请稍后...`;
        console.log(this.chatId, msg);
        await this.bot.sendMessage(this.chatId, msg);
    }

    async is_zh(str) {
        var a = new RegExp("[\u4E00-\u9FA5]+");
        let b = a.test(str);
        return b;
    }

}




async function task(body) { // 接受消息初步处理

    let dotask = new DoTask(body);

    let resMsg = body.message;

    let text = resMsg.text;

    if (text.indexOf(' ') > -1 && text.indexOf('/') > -1) {
        console.log(`多参数 带空格 命令`);
        await parameter(text, resMsg);
    } else if (text.indexOf('/') > -1) {
        console.log(`单命令 无空格`);
        await order(text);

    }


    async function order(text) {
        switch (text) {
            case '/list':
            case `/list@${botName}`:
                await dotask.list();
                break;

            case '/inquire':
            case `/inquire@${botName}`:
            await dotask.inquire();
                break;
            
            case '/upload':
            case `/upload@${botName}`:
            await dotask.uploads();
                break;
            
            case '/addid':
            case `/addid@${botName}`:
            await dotask.addid();
                break;
            
            default:
                let tg_Name = dotask.getName();
                let message = `抱歉: ${tg_Name}, 我没听懂您说的啥\n`;
                await this.bot.sendMessage(this.chatId, message);
                break;
        }


    }


    async function parameter(text, resMsg) {

        let fromId = resMsg.from.id;
        let chatId = resMsg.chat.id;
        let type = resMsg.chat.id;

        function get_resp(order_name) {
            var re = new RegExp(`${order_name} (.+)`);
            let matches = re.exec(text);
            try {
                let resp = matches[1];
                return resp;
            } catch (error) {
                console.log(`匹配${order_name}的参数错误`);
                return false;
            }
        }

        if (text.indexOf("/upload") > -1) {
            let resp = get_resp("/upload");
            if (resp) {
                await dotask.upload(resp);
            } else {
                let message = `/upload  参数错误`;
                await this.bot.sendMessage(chatId, message);
            }
        } else if (text.indexOf("/addid") > -1) {
            console.log(`收到添加用户请求`)
            let texts = text.split('/addid ')[1]
            let names = texts.split('=')[0]
            let nameid = texts.split('=')[1]
            console.log(`收到添加用户请求` + names, nameid)
            if (names && nameid) {
                await dotask.addid(names, nameid);
            } else {
                let message = `/addid  参数错误`;
                await this.bot.sendMessage(chatId, message);
            }
        }


    }


}



async function tjid(names, nameid) {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err
        const dbo = db.db('tl_list')
        const info = {
            name: names,
            id: nameid
        }
        dbo.collection('idlist').insertOne(info, (err, res) => {
            if (err) throw err
            console.log('数据用户id成功')
            console.log(res)
            db.close()
        })
    })
}