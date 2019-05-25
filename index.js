"use strict";
const open = require('open');
const extract = require('extract-zip');
const {exec} = require('child_process');

/**
 * Constants
 */
const user = 'web';
const path = 'fonts.nucssa.org:fonts/icon-font';
const demoPageURL = 'https://fonts.nucssa.org/nucssa-icon-font/demo.html';

/**
 * Extract zip file
 */
const unzipTarget = `${process.cwd()}/dist/`;
console.log(`>>> Unzip Assets to ${unzipTarget}`);
extract('./nucssa-icon-font.zip', { dir: unzipTarget }, err => {
  if (err) {
    console.error(err);
  } else {
    console.log('>>> Unzip Complete!');
    console.log('>>> Begin Uploading Assets to Production Server:');

    /**
     * Upload to Production Server
     */
    exec(`scp -r dist ${user}@${path}`, (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        console.log('>>> Error: Oops Failed to copy files to production server.');
        console.log(`>>> \tError Message: ${stderr}`);
        return;
      }

      console.log(`stdout: ${stdout}`);

      console.log('🎉  Upload Complete!!! 🎉');
      console.log('>>> Opening demo.html Page...');
      open(demoPageURL);
    });
  }
});
