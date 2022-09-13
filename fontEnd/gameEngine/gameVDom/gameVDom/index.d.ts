declare interface AST {
    tag: String
    type: number  // text 3   attr 2  tag 1
    start: number
    end: number
    parent: AST
    children: Array<AST>
    attrs: ASTAttrs
}
declare interface ASTAttrs {
    start: number
    end: number
    name: string
    value: string
}

declare function parseTemplate(template?: string, option?: object): void
// export const parse = (template: string): AST => root: AST