import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/pages/Home'
import Code from '../views/pages/Code'

import api from './api'
import typical from './typical'
import large from './large'

Vue.use(Router)

export function route (path, component) {
  return { path, component }
}

const router = new Router({
  mode: window.location.href.includes('codesandbox')
    ? 'history'
    : 'hash',
  linkActiveClass: 'is-link-active',
  linkExactActiveClass: 'is-link-exact',
  routes: [
    { path: '/', redirect:'/home' },
    route('/home', Home),
    ...api,
    route('/code', Code),
    ...typical,
    ...large,
    route('*', {template: '<div>Route not found</div>'}),
  ]
})

let updateTitle = function () {
  const route = location.hash
  const link = document.querySelector(`a[href="${route}"]`)
  if (link) {
    document.title = 'Vuex Pathify - Feature Demo / ' + link.innerText
  }
}
router.afterEach(updateTitle)
setTimeout(updateTitle)

export default router
