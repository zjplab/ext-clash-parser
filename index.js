const functions = require('@google-cloud/functions-framework');
const yaml = require('js-yaml');
functions.http('helloHttp', async (req, res) => {
// res.send(`Hello ${req.query.name || req.body.name || 'World'}!`);

let script=await fetch('https://raw.githubusercontent.com/zjplab/download/master/scripts/clash_parser.js');
let raw_script=await script.text();
var fun_str=("(raw)"+raw_script.split("(raw, { yaml, console })")[1]).replace("yaml.parse", "yaml.load").replace("yaml.stringify", "yaml.dump");
var fun=eval(fun_str);
// let configUrl = (pathname.slice(3));
let configUrl = req.query.name || req.body.name
console.log(configUrl)
let resp = await fetch(configUrl);
let rawConfig = await resp.text();
let configStr = fun(rawConfig);
res.send(String(configStr))
});
