import SimpleImage from '@editorjs/simple-image'
import Header from '@editorjs/header'
import Table from '@editorjs/table'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import List from '@editorjs/list'

export const EDITOR_JS_TOOLS = {
  simpleImage: SimpleImage,
  header: {
    class: Header,
    config: {
      placeholder: 'Enter a header',
      defaultLevel: 3,
    },
  },
  code: Code,
  table: Table,
  linkTool: LinkTool,
  list: List,
}

export const demoDefaultValue = {
  time: 1635603431943,
  blocks: [
    {
      id: 'iXNl3GJTZz',
      type: 'header',
      data: {
        text: 'Câu trả lời',
        level: 2,
      },
    },
    {
      id: '12iM3lqzcm',
      type: 'paragraph',
      data: {
        text: 'Hãy viết nội dung trả lời của bạn vào đây',
      },
    },

    {
      id: 'R8FQdR6xkm',
      type: 'list',
      data: {
        style: 'unordered',
        items: ['Chèn thêm bảng hoặc hình ảnh minh họa( nếu có)'],
      },
    },
  ],
  version: '2.22.2',
}
