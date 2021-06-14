import { reactive, toRefs } from 'vue'

const state = reactive({
    loggedIn: false,
    registered: false,
    password: ''
})

export default function loadStates() {
    return {
        ...toRefs(state)
    }
}