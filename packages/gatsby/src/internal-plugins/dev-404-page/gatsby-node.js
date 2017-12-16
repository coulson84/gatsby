const path = require(`path`)
const fs = require(`fs-extra`)

exports.createPages = async ({ store, boundActionCreators }) => {
  if (process.env.NODE_ENV !== `production`) {
    const { program } = store.getState()
    const { createPage } = boundActionCreators
    const currentPath = path.join(__dirname, `./raw_dev-404-page.js`)
    const newPath = path.join(program.directory, `.cache`, `dev-404-page.js`)

    await new Promise(function(resolve, reject) {
      fs.copy(currentPath, newPath, err => err ? reject(err) : resolve())
    })
      .then(() => createPage({
        component: newPath,
        path: `/dev-404-page/`,
      }))
  }
}
