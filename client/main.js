import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'

import './main.html'
import { TasksCollection } from '../imports/api/TasksCollection'

Template.main.onCreated(function helloOnCreated() {

})

Template.main.helpers({
  illuminatiSecret: 23,
  secretOfLife() {
    return 42
  },
  async asyncValue() {
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

})
