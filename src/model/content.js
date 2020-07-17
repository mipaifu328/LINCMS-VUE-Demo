/* eslint-disable class-methods-use-this */
import { get, post, _delete, put } from '@/lin/plugin/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Content {
  // constructor() {}
  static async getContentList() {
    const res = await get('v1/content')
    return res
  }

  static async addContent(data) {
    const res = await post('v1/content', { ...data })
    return res
  }

  static async deleteContent(id, type) {
    const res = await _delete(`v1/content/${id}`, { type })
    return res
  }

  static async editContent(id, data) {
    const res = await put(`v1/content/${id}`, { ...data })
    return res
  }
}

export { Content as ContentModel }
