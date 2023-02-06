import { Mongo } from 'meteor/mongo';
export const TasksCollection = new Mongo.Collection('tasks');

TasksCollection.helpers({
    async one() {
        return TasksCollection.findOneAsync();
    }
});