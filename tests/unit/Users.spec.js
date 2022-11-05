import { shallowMount } from '@vue/test-utils'
import Users from '@/components/Users.vue'

describe('Users.vue', () => {
  it('has data', () => {
    expect(typeof Users.data).toBe('function')
  })
})

// testing next and previous button
test('trigger', async () => {
  const wrapper = shallowMount(Users)
  // trigger the element 
  await wrapper.find('.prevButton').trigger('click')
  await wrapper.find('.nextButton').trigger('click')
})



