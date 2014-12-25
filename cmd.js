#!/usr/bin/env node

var dm = require('./index.js')
var fs = require('fs')
var path = require('path')
var argv = require('minimist')(process.argv.slice(2));

function help() {
  console.log(fs.readFileSync(path.join(__dirname, 'usage.txt'))+'')
}

if (argv.help) { return help(); }

if (argv.styles) {
  return console.log(fs.readFileSync(path.join(__dirname, 'base/style.css'))+'')
}
var md = argv._[0] || argv.bare;
var body = md ? dm(fs.readFileSync(md)+'') : '';

if (!body) { return help(); }


var head = argv.head ? fs.readFileSync(argv.head)+'' : ''; 
var foot = argv.foot ? fs.readFileSync(argv.foot)+'' : '';

console.log(head, body, foot);

