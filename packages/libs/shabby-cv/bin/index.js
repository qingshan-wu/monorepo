#! /usr/bin/env node
const chalk = require('chalk')
const inquirer = require('inquirer');
const fs = require('fs-extra')
const path = require('path')
const { mkdirsSync } = require('../utils')

let options;
let shabbyrcExist = false;
try {
  options = fs.readJSONSync(path.resolve(process.cwd(), './.shabbyrc'))
  shabbyrcExist = true;
} catch (err) {
  options = fs.readJSONSync(path.resolve(__dirname, '../.shabbyrc'))
}


const choices = options.choices.map(it => it.choice)

const create = async () => {
  const ans = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'select the template you need',
      choices,
      default: choices[0],
    },
    {
      type: 'input',
      name: 'pathname',
      message: 'where do you want to put your template'
    }
  ])

  const pathname = path.resolve(process.cwd(), ans.pathname);
  
  const basename = path.basename(pathname);
  const extname = path.extname(basename)
  const choice =  options.choices.find(it => it.choice === ans.choice);

  const templates = shabbyrcExist ? 
    require(path.resolve(process.cwd(), choice.template)) :
    require(path.resolve(__dirname, "..", choice.template));

    
  try {

    if (!!extname && typeof templates === 'function') {
      mkdirsSync(path.dirname(pathname));
      if (fs.existsSync(pathname)) {
        throw new Error('already exist')
      }
      await fs.writeFile(
        pathname,
        templates(path.basename(basename, extname))
      );
    } else if (typeof templates === 'object') {
      mkdirsSync(pathname);
      await Promise.all(Object.entries(templates).map((it) => {
        const [name, getStr] = it;
        const filename = path.resolve(pathname, name)
        if (fs.existsSync(filename)) {
          throw new Error('already exist')
        }
        return fs.writeFile(
          filename,
          getStr(basename)
        );
      }))
    }

    console.log(chalk.green(`[done] ${chalk.underline(pathname)}`))
  } catch (error) {
    console.log(chalk.red(`[error] ${error}`))
  }
}

create()
