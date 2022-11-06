import { shallowMount, RouterLinkStub, flushPromises } from '@vue/test-utils'
import Users from '@/components/Users.vue'
import axios from 'axios' 

describe('Users.vue', () => {
  // testing next and previous button
  it('testing next and previous button', async () => {
    const wrapper = shallowMount(Users)
    // trigger the element 
    await wrapper.find('.prevButton').trigger('click')
    await wrapper.find('.nextButton').trigger('click')
  });
})






