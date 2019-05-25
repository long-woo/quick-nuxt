const path = require('path')

const { sortDependencies, installDependencies, runLintFix, printMessage } = require('./utils')

module.exports = {
  helpers: {
    if_or(v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this)
      }

      return options.inverse(this)
    },
    if_neq(v1, v2, options) {
      if (v1 != v2) {
        return options.fn(this)
      }

      return options.inverse(this)
    },
    escape: function(value) {
      return value.replace(/'/g, '&apos;')
    }
  },
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: '项目名：'
    },
    description: {
      type: 'string',
      required: false,
      message: '项目描述：',
      default: 'A Nuxt.js project'
    },
    author: {
      type: 'string',
      message: '作者：'
    },
    // plugins: {
    //   type: 'confirm',
    //   message: 'Install some plugins (vee-validate, sweetalert, webuploader)'
    // },
    autoInstall: {
      type: 'list',
      message: '选择安装依赖方式',
      choices: [
        {
          name: '使用 NPM',
          value: 'npm',
          short: 'npm'
        },
        {
          name: '使用 Yarn',
          value: 'yarn',
          short: 'yarn'
        },
        {
          name: '自定义',
          value: false,
          short: 'no'
        }
      ]
    }
  },
  complete: function(data, { chalk }) {
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
}
