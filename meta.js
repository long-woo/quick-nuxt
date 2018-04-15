const path = require('path')

const {
  sortDependencies,
  installDependencies,
  runLintFix,
  printMessage
} = require('./utils')

module.exports = {
  helpers: {
    if_or(v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this)
      }

      return options.inverse(this)
    },
    escape: function(value) {
      return value.replace(/'/g, '&apos;');
    }
  },
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Project name'
    },
    description: {
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'A Nuxt.js project'
    },
    author: {
      type: 'string',
      message: 'Author'
    },
    plugins: {
      type: 'confirm',
      message: 'Install some plugins (vee-validate, sweetalert, webuploader)'
    },
    autoInstall: {
      type: 'list',
      message: 'Should we run `npm install` for you after the project has been created? (recommended)',
      choices: [{
        name: 'Yes, use NPM',
        value: 'npm',
        short: 'npm'
      }, {
        name: 'Yes, use Yarn',
        value: 'yarn',
        short: 'yarn'
      }, {
        name: 'No, I will handle that myself',
        value: false,
        short: 'no'
      }]
    }
  },
  complete: function(data, {chalk}) {
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          return runLintFix(cwd, data, green)
        })
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  }
};
