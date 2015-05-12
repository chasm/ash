"use strict"

require('./stylesheets/main.css')

const component = require('./component.js')
const app = document.getElementById('app')

app.appendChild(component())
