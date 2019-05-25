export default ({ app: { router }, store }) => {
  router.afterEach((to, from) => {
    window._hmt = window._hmt || []
  })
}
