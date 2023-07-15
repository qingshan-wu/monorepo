const serviceStr = (name) => {
  const typeName = name.replace(/^\w/, (match) => match.toUpperCase())

  const req = `T${ typeName }Req`
  const resp = `T${typeName}Resp`

  return `
import UtilService from 'service';

export type ${req} {
  pageNum: string;
}

export type ${resp} {
  data?: string;
}

export default UtilService<${req}, ${resp}>({
  url: "${name}"
})
`
}

module.exports = serviceStr