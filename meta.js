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
    escape(value) {
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
    serverPort: {
      type: 'number',
      message: '网站端口（2700 开始，默认值是 3000）：',
      default: 3000
    },
    baiduStatistics: {
      type: 'string',
      message: '百度统计 Id（测试环境）：'
    },
    deploy: {
      type: 'list',
      message: '选择部署的方式',
      choices: [
        {
          name: '使用 PM2',
          value: 'pm2',
          short: 'pm2'
        },
        {
          name: '使用 Docker',
          value: 'docker',
          short: 'docker'
        },
        {
          name: '自定义',
          value: false,
          short: 'no'
        }
      ]
    },
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
  filters: {
    'ecosystem.config.js': "deploy && deploy === 'pm2'",
    '.dockerignore': "deploy && deploy === 'docker'",
    Dockerfile: "deploy && deploy === 'docker'"
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
