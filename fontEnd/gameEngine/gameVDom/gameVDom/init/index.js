/*
 * @Author: your name
 * @Date: 2021-11-25 15:29:37
 * @LastEditTime: 2021-11-26 10:20:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \gameVDom\gameVDom\init\index.js
 */

import * as PIXI from 'pixi.js'
import {
  attrName,
  splitString
} from '../utils'
import {
  initState
} from '../state/index'
import {
  initRender
} from '../render/index'
import {
  handleSpriteStyle
} from "./handleSprite"
// <Box>
// <Sprite loadImage="{{message}}" style="top: 100;left: 100;width: 400;height: 400;"> </Sprite>
// </Box>
// const hashName = new Box()
// const hashName2 = new Sprite()
// hashName.addChild(hashName2)
// app.stage.
//  每次都找<  当前<到下一个< 就是当前标签的内容

// 解析模版，将模版转换为对应的代码

// 验证正则<Sprite>内容
function tempRegx(tem) {
  // TODO 可优化度还很高
  return tem.match(/(<)(.*)(>)/g)
}

// 获得模版标签名
function spriteRegx(tem) {
  return (/[a-zA-Z]+/gi.exec(tem))[0]
}

export const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const startTagClose = /^\s*(\/?)>/
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/



export function initMixin(RjlxGame) {
  RjlxGame.prototype._init = function (options) {
    const vm = this
    vm.$options = options
    vm.$el = options.el
    // options.vNode = 
    vm.vNode = getNodeInstance(getNode(options.template))

    initState(vm)
    initRender(vm)
  }
}

function createASTElement(tag, attrs, parent) {
  return {
    type: 1,
    tag,
    attrsList: attrs,
    parent,
    children: []
  }
}


function parse(template) {
  let root = []
  let stack = []
  let currentParent
  let current
  // 记录标签的范围
  template = template.trim()
  parseTemplate(template, {
    start(tag, attrs, start, end) {
      const element = createASTElement(tag, attrs)
      element.start = start || 0
      element.end = end || 0
      stack.push(element)
      current = element
    },
    end(tag, start, end) {
      const element = stack[stack.length - 1]
      stack.length -= 1
      currentParent = stack[stack.length - 1]
      current.end = end
      if (current.tag === element.tag) {
        current.parent = currentParent
        if (currentParent) {
          currentParent.children.push(current)
        }
        if (current.parent) {
          current = current.parent
        }
      }
      // 当当前节点是最后一个节点的时候，他就是父节点
      if (stack.length === 0) {
        root = current
      }
      // console.log(current, element, currentParent)
    }
  })
  // const templateList = tempRegx(template)
  // 获得所有的节点信息
  // const temNode = getNode(templateList)
  // 将节点信息拼接，组装
  // const nodeList = getNodeInstance(temNode)
  // 最终将效果渲染到画布上
  // renderNode(nodeList)
  return root
}

function parseTemplate(template, options) {
  let index = 0
  // 判断第一个是不是<开始的标签
  while (template) {
    const textEnd = template.indexOf('<')
    let last = template
    // 匹配到结束标签
    if (textEnd === 0) {
      const endTagMatch = template.match(endTag)
      // 如果有匹配到一 </ 为开始的闭合标签的时候
      if (endTagMatch) {
        // 记录下当前位置
        const curIndex = index
        // 更改index为范围位置
        advance(endTagMatch[0].length)
        options.end(endTagMatch[1], curIndex, index)
        continue
        // parseEndTag(endTagMatch[1], curIndex, index)
      }
      // 匹配到开始标签
      const startTagMatch = parseStartTag()
      if (startTagMatch) {
        options.start(startTagMatch.tagName, startTagMatch.attrs, startTagMatch.start, startTagMatch.end)
        continue
      }
    }
    let text, rest, next
    // 如果匹配到的<大于等于0的话，拿到内容部分
    if (textEnd >= 0) {
      rest = template.slice(textEnd)
      text = template.substring(0, textEnd)
    }
    if (textEnd < 0) {
      text = template
    }
    if (text) {
      // 如果有内容有值的话，就把内容部分再次截掉，准备进入下次循环
      advance(text.length)
    }
  }

  function parseStartTag() {
    const start = template.match(startTagOpen)

    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
        start: index
      }
      advance(start[0].length)
      let end, attr

      while (!(end = template.match(startTagClose)) && (attr = template.match(dynamicArgAttribute) || template.match(attribute))) {
        attr.start = index
        advance(attr[0].length)
        attr.end = index
        match.attrs.push(attr)
      }
      if (end) {
        match.unarySlash = end[1]
        advance(end[0].length)
        match.end = index
        return match
      }
    }
  }

  function advance(n) {
    index += n
    template = template.substring(n)
  }
}

/**
 * [
 *  "<Box>",
 *  "<Sprite />"
 *  </Box>
 * ]
 * ===>
 * {
 *  node: "Box",
 *  style: {
 *    loadImage: ""
 *  },
 *  children: [
 *  ]
 * }
 * 
 * 第一个一定是开标签，最后一个一定是闭合标签
 * 
 * 将模版解析为特殊的对象方便渲染
 * */

function getNode(template) {
  return parse(template)
}

/**
 * 将最初的对象模型转换为可以用的精灵对象
 * @param {*} vNode 
 * @returns {object} instance
 */
function getNodeInstance(vNode) {
  console.log(this)
  if (vNode.tag) {
    // 实例化一个精灵节点
    vNode.node = new PIXI[vNode.tag]()
    // 处理vNode的属性信息
    addNodeAttr(vNode)
    // 处理属性值那些东西
    if (vNode.children) {
      vNode.children.forEach(item => {
        getNodeInstance(item)
        bindRelative(vNode.node, item.node)
      })
    }
  }
  return vNode
}

/*
 * 绑定父子关系 
 * */
function bindRelative(parentNode, childNode) {
  parentNode.addChild(childNode)
}

/**
 * 给节点赋予属性
 * @param {object} node 
 */
function addNodeAttr(vNode) {
  let attrsList = vNode.attrsList
  if (attrsList.length !== 0) {
    // attrName
    handleNodeAttrList(vNode)

    // 将动态属性解析出来
    bindAttrToSprite(vNode)
  }
  // console.log(vNode)
}

function bindAttrToSprite(vNode) {
  let attrs = vNode.attrs
  const node = vNode.node

  let i = attrs.length
  while (i--) {
    const attrValue = attrs[i].value
    if (attrValue.length === 1) {
      node.texture = attrValue[0]
    } else {
      let idx = attrValue.length
      while (idx--) {
        node[attrValue[idx][0]] = attrValue[idx][1]
      }
    }
  }
}

/**
 *  处理节点属性数据
 *  将属性数据处理成更容易用的数据
 */
function handleNodeAttrList(vNode) {
  let attrs = []
  vNode.attrsList.forEach(attr => {
    if (attrName.findIndex(item => item === attr[1]) !== -1) {
      if (attr[3]) {
        let attrObj = Object.create(null)
        // 将属性名和属性值处理为对象
        attrObj.attrName = attr[1]
        attrObj.value = []
        const attrKeyValList = splitString(attr[3], ';')

        // 先这样处理，后面再优化
        if (attrObj.attrName === "style") {
          attrKeyValList.forEach(attrKeyValItem => {
            const attrKeyVal = splitString(attrKeyValItem, ':')
            attrObj.value.push(attrKeyVal)
          })
        } else {
          // loadImage 需要额外处理
          const img = PIXI.Texture.from(attrKeyValList[0])
          attrObj.value.push(img)
        }
        attrs.push(attrObj)
      }
    }
  })
  vNode.attrs = attrs
}