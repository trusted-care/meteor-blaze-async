import { Template } from 'meteor/templating'

import './main.html'
import { TasksCollection } from '../imports/api/TasksCollection'

Template.main.onCreated(function helloOnCreated() {
  this.seconds = new ReactiveVar(0)

  const self = this

  Meteor.setInterval(() => {
    self.seconds.set(self.seconds.get() + 1)
    // console.log({seconds: seconds.get()})
  }, 1000)
})

Template.main.helpers({
  illuminatiSecret: 23,
  secretOfLife() {
    return 42
  },
  _asyncValue() {
    // create reactive dependency?
    const tmpl = Template.instance()
    console.log({seconds: tmpl.seconds.get()})

    console.log({foundInHelper: TasksCollection.findOne()})
    const task = TasksCollection.findOne()
    // const task = await TasksCollection.findOneAsync()
    return task && task.text
  },
  async asyncValue() {
    // create reactive dependency?
    const tmpl = Template.instance()
    console.log({seconds: tmpl.seconds.get()})

    // console.log({foundInHelper: TasksCollection.findOne()})
    // return TasksCollection.findOne()?.text


    const task = await TasksCollection.findOneAsync()
    return task && task.text
  },

  async asyncTask() {
    return TasksCollection.findOneAsync()
  },
  async functionAfterPromise() {
    return new Promise((resolve, reject) => {
      Meteor.defer(() => {
        resolve({
          coolFunc() {
            return Random.id()
          }
        })
      }, 1000)
    })
  },
  async functionAfterPromiseReturningAnotherPromisedValue() {
    return new Promise((resolve, reject) => {
      Meteor.defer(() => {
        resolve({
          async coolFunc() {
            return Random.id()
          }
        })
      }, 1000)
    })
  },
  async functionAfterPromiseReturningAnotherPromisedValueReturningAnotherFunctionReturningAnotherPromiseValue() {
    return new Promise((resolve, reject) => {
      Meteor.defer(() => {
        resolve({
          async coolFunc() {
            return {
              async evenCoolerFunc() {
                return 'Very cool random ID: ' + Random.id()
              }
            }
          }
        })
      }, 1000)
    })
  },

  /**
   * Attributes helper to see whether we can make that async compat & reactive.
   */
  async wildAttributes() {
    const tmpl = Template.instance()

    let sizeBase = 100
    const seconds = tmpl.seconds.get()

    // let it grow by 100 over 10 seconds
    sizeBase += (seconds % 10) * 10

    return {
      class: 'random',
      style: `display: block; margin-top: 20px; width: ${sizeBase * 2}px; height: ${sizeBase} px; background-color: #ffff00; text-align: center; line-height: ${sizeBase}px;`
    }
  }
})
