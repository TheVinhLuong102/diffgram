import {shallowMount, createLocalVue} from "@vue/test-utils";
import Vuex from 'vuex'
import axios from 'axios'
import step_guides_task_template
  from "../../../../../src/components/task/job/task_template_wizard_creation/step_guides_task_template";
import VueRouter from 'vue-router'
const localVue = createLocalVue();
localVue.use(Vuex)
localVue.use(VueRouter)
const router = new VueRouter()

let job = {
  name: 'test',
  label_mode: 'closed_all_available',

  loading: false,
  passes_per_file: 1,
  share_object: {
    // TODO this may fail for org jobs? double check this.
    'text': String,
    'type': 'project'
  },
  share: 'project',
  instance_type: 'box', //"box" or "polygon" or... "text"...
  permission: 'all_secure_users',
  field: 'Other',
  category: 'visual',
  attached_directories_dict: {attached_directories_list: []},
  type: 'Normal',
  connector_data: {},
  // default to no review while improving review system
  review_by_human_freqeuncy: 'No review', //'every_3rd_pass'
  td_api_trainer_basic_training: false,
  file_handling: "use_existing",
  interface_connection: undefined,
  member_list_ids: ["all"]
}
describe("step_guides_task_template.vue", () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      actionClick: jest.fn(),
      actionInput: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
  });


  it("Renders component correctly.", () => {
    const wrapper = shallowMount(step_guides_task_template, {
      store,
      localVue,
      propsData: {
        job: job
      }
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("Sets job guide when calling on_change_guide()", () => {
    const wrapper = shallowMount(step_guides_task_template, {
      store,
      localVue,
      propsData: {
        job: job
      }
    });
    wrapper.vm.on_change_guide('test')
    expect(job.guide).toEqual('test')
  });

  it("Changes Route when calling open_guides()", () => {
    const wrapper = shallowMount(step_guides_task_template, {
      store,
      router,
      localVue,
      propsData: {
        job: job
      },
      $router:{
        resolve: () => {}
      },
    });
    const spyCommit = jest.spyOn(wrapper.vm.$router, 'resolve')
    wrapper.vm.open_guides()
    expect(wrapper.vm.dialog_open).toEqual(true)
  });

  it("Emits event when calling on_next_button_click()", () => {
    const wrapper = shallowMount(step_guides_task_template, {
      store,
      localVue,
      propsData: {
        job: job
      }
    });
    wrapper.vm.on_next_button_click()
    expect(wrapper.emitted().next_step.length).toBe(1);
  });

  it("makes network call when calling attach_selected()", () => {
    jest.mock('axios', () => ({
      post: jest.fn(() => {})
    }))
    const wrapper = shallowMount(step_guides_task_template, {
      store,
      localVue,
      propsData: {
        job: job
      }
    });
    const spy = jest.spyOn(axios, 'post')
    wrapper.vm.attach_selected()
    expect(spy).toHaveBeenCalledTimes(1);
  });





});
