#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const copydir = require('copy-dir');
const fs = require('fs');
const mkdirp = require('mkdirp');

program
  .option('-c, --config <location>', 'Location of the exported Insomnia JSON config.')
  .option('-l, --logo <location>', 'Project logo location (48x48px PNG).')
  .option('-o, --output <location>', 'Where to save the file (defaults to current working directory).')
  .parse(process.argv);

const { config, logo, output } = program;

if (!config) {
  console.log('You must provide an exported Insomnia config (Preferences -> Data -> Export Data -> Current Workspace).');
  process.exit(1);
}

const PACKAGE_DIST_PATH = path.resolve(__dirname, '..', 'public');
const outputPath = output ? path.join(process.cwd(), output) : process.cwd();
const logoPath = logo && path.join(process.cwd(), logo);
const configPath = path.join(process.cwd(), config);

console.log('Getting files ready...');

mkdirp(outputPath, err => {
  if (err) {
    console.error(err);
    process.exit(127);
  }

  copydir.sync(PACKAGE_DIST_PATH, outputPath, {
    utimes: false,
    mode: false,
    cover: true
  });

  console.log('Adding Insomnia JSON...');

  fs.copyFileSync(configPath, path.join(outputPath, 'insomnia.json'));

  if (logoPath) {
    console.log('Adding custom logo...');
    fs.copyFileSync(logoPath, path.join(outputPath, 'logo.png'));
  }

  console.log('\n * * * Done! * * *\nYour documentation has been created and it\'s ready to be deployed!');

  process.exit();
});
