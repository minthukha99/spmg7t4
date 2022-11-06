import { shallowMount } from "@vue/test-utils";
import UpdateRole from "@/components/UpdateRole.vue";
import axios from 'axios'

//roleName is null
describe("UpdateRole", () => {
  it("Null Value for roleName", async () => {
    const skillName = ''
    jest.spyOn(axios, 'get').mockResolvedValue(skillName)
    const wrapper = shallowMount(UpdateRole)
    await wrapper.get('.updateRoleButton').trigger('click')
    
    const roleName = wrapper.findAll('[data-test="roleName"]')
    expect(skillName).toBe('')
  
  });
});

describe("UpdateRole", () => {
    it("Existing roleName", async () => {
        const skillName = 'Communication'
        jest.spyOn(axios, 'get').mockResolvedValue(skillName)
        const wrapper = shallowMount(UpdateRole)
        await wrapper.get('.updateRoleButton').trigger('click')
        
        const roleName = wrapper.findAll('[data-test="roleName"]')
        expect(skillName).toBe('Communication')
    });
});