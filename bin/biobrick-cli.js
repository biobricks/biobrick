#!/usr/bin/env node

let biobrick = require('../lib/biobrick');

let args = process.argv.splice(process.execArgv.length + 2);

let hasArgs = args.length > 0;
let hasNoArgs = args.length === 0;

// if has no args clear and show welcome message
if (hasNoArgs) {
  console.clear();
  biobrick.welcome();
}

// if has args
if (hasArgs) {
  
  // first arg is action
  let action = args[0];
  // action - install
  if (action === 'install') {
    // if has more than one arg
    if (args.length > 1) {
      // second arg is noun
      let noun = args[1];
      // install BioNet
      if (noun === 'bionet') {
        biobrick.log(`Installing ${'BioNet'.cyan}...`);
        biobrick.installBionet((error, success) => {
          if (error) {
            biobrick.log('Unable To Complete Installation.');
          } else if (success) {
            biobrick.log('Completed Installation.');
            biobrick.log('1. Change to the project directory: cd bionet-new');
            biobrick.log('2. Start Development Server: npm run dev');
          }
        });
      }
    } else {
      biobrick.error('Install What?');
      biobrick.log('Example:\nbiobrick install bionet');
    }  
  }
  // action - update
  if (action === 'update') {
    // if has more than one arg
    if (args.length > 1) {
      // second arg is noun
      let noun = args[1];
      // update BioNet
      if (noun === 'bionet') {
        biobrick.log(`Updating ${'BioNet'.cyan}...`);
        biobrick.updateBionet((error, success) => {
          if (error) {
            biobrick.log('Unable To Complete Update.');
          } else if (success) {
            biobrick.log('Completed Update.');
          }
        });
      }
    } else {
      biobrick.error('Update What?');
      biobrick.log('Example:\nbiobrick update bionet');
    }     
  }
}
