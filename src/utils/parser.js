const etcFormatter = (text) => text.replace('&amp;c.', 'etc.')

export const xmlParser = (obj) => {
  const { dom, childNodes = [] } = obj

  let children = [...dom.children]
  const nodeName = dom.nodeName.toLowerCase()

  if (!children.length) {
    console.log('line ->', dom.innerHTML)
    return { nodeName, text: etcFormatter(dom.innerHTML) }
  }

  children.forEach((child) => {
    childNodes.push(xmlParser({ dom: child, childNodes: [] }))
  })

  return { nodeName, childNodes }
}
