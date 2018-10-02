require('colors');
const fs = require('fs');
const exec = require('child_process').exec;


const biobrick = {
  "log": function(message) {
    return console.log(`${'BioBrick'.cyan}: ${message}`);
  },
  "error": function(error) {
    return console.error(`${'BioBrick'.cyan}: ${error.red}`);
  },
  "welcome": function() {
    const welcome = require('./welcome');
    console.log(welcome);
  },
  "cloneBionet": function(cb) {
    let brick = this;
    let command = "";
    command += "git clone https://github.com/biobricks/bionet-new.git";
    exec(command, function(error, stdout, stderr) {
      if(stderr){
        brick.log(stderr);
      }
      if (stdout) {
        brick.log(stdout);
      }
      cb();
    });    
  },
  "npmBionet": function(cb) {
    let brick = this;
    brick.log('installing project dependencies from npm. This may take a several minutes...');
    let command = "";
    command += "cd bionet-new && npm install && ";
    command += "mkdir -p static/build && mkdir -p pandadoc && mkdir -p labdevice/client_keys && ";
    command += "cp settings.js.example settings.js && ";
    command += "cp settings.client.js.example settings.client.js && ";
    command += "cd labdevice && ssh-keygen -t rsa -f hostkey -N \"\" && cd ../";
    exec(command, function(error, stdout, stderr) {
      if(stderr){
        brick.log(stderr);
      }
      if (stdout) {
        brick.log(stdout);
      }
      cb();
    });    
  },
  "buildCssBionet": function(cb) {
    let brick = this;
    brick.log('building css for the first time...');
    let command = "cd bionet-new && npm run build-css";
    exec(command, function(error, stdout, stderr) {
      if(stderr){
        brick.log(stderr);
      }
      if (stdout) {
        brick.log(stdout);
      }
      cb();
    });    
  },  
  "installBionet": function(cb) {
    let brick = this;
    brick.cloneBionet(() => {
      brick.npmBionet(() => {
        brick.buildCssBionet(() => {
          cb(null,true);
        });  
      });  
    });
  },
  "updateBionet": function(cb) {
    let brick = this;
    brick.log('fetching changes from github, updating and installing any new dependencies...');
    let command = "git fetch && git pull && npm install";
    exec(command, function(error, stdout, stderr) {
      if(stderr){
        brick.log(stderr);
      }
      if (stdout) {
        brick.log(stdout);
      }
      cb();
    });    
  }
}

module.exports = biobrick;