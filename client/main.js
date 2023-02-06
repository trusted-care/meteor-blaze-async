import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import { TasksCollection } from '../imports/api/TasksCollection'

Template.hello.onCreated(function helloOnCreated() {

});

Template.hello.helpers({
  async asyncTask() {
    return TasksCollection.findOneAsync()
  },
  tasks_collection() {
    return TasksCollection.findOne()
  },
});
