/*
 * @Author: your name
 * @Date: 2021-11-10 18:03:25
 * @LastEditTime: 2021-11-25 18:07:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \gameVDom\main.js
 */
import RjlxGame from "./gameVDom/index"
import * as PIXI from "pixi.js"
const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight
});
document.body.appendChild(app.view);
// let vNode = {
//     tagName: "div",
//     message: 1,
// }

// const value = vNode["message"]
// Object.defineProperty(vNode, "message", {
//     enumerable: true,
//     configurable: true,
//     get() {  // 当获取值的时候触发
//         console.log(1111111111111111111)
//         console.log(value)
//         return value
//     },
//     set(newVal) { // 当设置值的时候触发
//         console.log(2222222222)
//     }
// })
// console.log(vNode.message)
// vNode.message = 3

new RjlxGame({
    el: app.stage,
    data: {
        message: 213213213
    },
    template: `
        <Container>
            <Container>
                <Sprite loadImage="https://img.alicdn.com/imgextra/i4/3377521498/O1CN01KheHuG1Mw80qj4Ucf_!!3377521498.png" style="y: 10;x: 100;width: 400;height: 300;" ></Sprite >
                <Text></Text>
            </Container>
            <Container>
                <Sprite loadImage="https://img.alicdn.com/imgextra/i4/3377521498/O1CN01KheHuG1Mw80qj4Ucf_!!3377521498.png" style="y: 400;x: 100;width: 400;height: 400;" ></Sprite>
            </Container>
            <Text>
                
            </Text>
        </Container>
    `,
    methods: {
        test() {
            this.message = 2
        }
    },
})