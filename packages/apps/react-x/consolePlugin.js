const parser = require('@babel/parser')
const traverse = require('@babel/traverse')
const generate = require('@babel/generator').default

const cosoleList = ["log", 'error'].map(it => `console.${it}`)

const consolePlugin = ({types}) => {
  return {
    visitor: {
      CallExpression: (path) => {
        const name = generate(path.node.callee).code
        if (cosoleList.includes(name)) {
          const {line, column} = path.node.loc.start
          path.node.arguments.unshift(types.stringLiteral(
            `filename: ${line}, ${column}`
          ))
        }
      }
    }
  }
}

module.exports = consolePlugin

