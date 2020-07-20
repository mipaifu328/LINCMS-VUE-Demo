import { get } from '@/lin/plugin/axios'
/* eslint-disable */
// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Person {
  // constructor() {}
  static async getPersonList(page = 1, rows = 10) {
    const res = await get('v1/person', {
      page,
      rows
    })
    return res
  }
}

export { Person as PersonModel }
