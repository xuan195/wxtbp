const tencentcloud = require('tencentcloud-sdk-nodejs')

    const TbpClient = tencentcloud.tbp.v20190627.Client;
    const models = tencentcloud.tbp.v20190627.Models;

    const Credential = tencentcloud.common.Credential;
    const ClientProfile = tencentcloud.common.ClientProfile;
    const HttpProfile = tencentcloud.common.HttpProfile;

    let cred = new Credential("xxx", "xxx");
    let httpProfile = new HttpProfile();
    httpProfile.endpoint = "tbp.tencentcloudapi.com";
    let clientProfile = new ClientProfile();
    clientProfile.httpProfile = httpProfile;
    let client = new TbpClient(cred, "", clientProfile);

'use strict';
exports.main = async (event, context, callback) => {
    console.log("日志LOG")
    // console.log(event)
    // console.log(event["non-exist"])
    // console.log(context)
    let params = event.botparams
    //'{\"BotId\":\"152d9b18-7e5e-41f3-9296-4a4534d87705\",\"BotEnv\":\"release\",\"TerminalId\":\"123456789\",\"InputText\":\"收货\"}'
    let body = await synchronous_post(params);
    console.log(body);
    
    return body
};

let synchronous_post = function (params){

    let req = new models.TextProcessRequest();
    
    req.from_json_string(params);

    return new Promise(function(resolve, reject){

        client.TextProcess(req, function(errMsg, response) {

            if (errMsg) {               
                reject(errMsg);
            }else{
                resolve(response.to_json_string());            
            }
        });
    });
}