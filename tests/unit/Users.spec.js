import { shallowMount } from '@vue/test-utils'
import Users from '@/components/Users.vue'

describe('Users.vue', () => {
  it('has data', () => {
    expect(typeof Users.data).toBe('function')
  })
})
