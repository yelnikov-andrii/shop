export const getData = () => {
  return fetch('https://storedata-project.herokuapp.com/categories')
  .then(promise => {
    return promise.json()
      .then(result => {
        return result;
      })
  })
}