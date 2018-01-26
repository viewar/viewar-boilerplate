import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import viewarApi from 'viewar-api'

import './index.css'

import App from './app'

;(async function () {

  window.api = await viewarApi.init({appId: 'com.viewar.sdk'})

  const appRoot = document.getElementById('app')

  const render = Component => {
    ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>, appRoot)
  }

  render(App)

  if (module.hot) {
    module.hot.accept('./app', () => render(App))
  }

  const sheepModel = await viewarApi.modelManager.fetchModelFromRepository('20')

  for (let x = 0; x < 20; ++x) {
    await viewarApi.sceneManager.insertModel(sheepModel, {
      pose: {position: {x: (Math.random() * 4000 - 2000), y: 0, z: (Math.random() * 4000 - 2000)}}
    })
  }
}())
