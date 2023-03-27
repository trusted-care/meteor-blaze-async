import { Mongo } from 'meteor/mongo'

export const TasksCollection = new Mongo.Collection('tasks')

this.Collections = {}
Collections.TasksCollection = TasksCollection

TasksCollection.helpers({
    async one() {
        return TasksCollection.findOneAsync()
    },
})

/**
 * A permanently getting-updated task in the DB.
 */

const insertTask = taskText => TasksCollection.insert({text: taskText})

Meteor.startup(() => {
    /**
     * Let's do this only on the server to make sure the client uses the autopublish / published documents
     * from the server using the full stack reactivity.
     */
    let taskId = undefined
    let updateNo = 0
    const updateInterval = 2000

    const getTaskString = updateNo => `Task, Version ${updateNo}`

    if (Meteor.isServer) {
        Meteor.setInterval(() => {
            updateNo += 1
            if (!taskId) {
                insertTask(getTaskString(updateNo))
                taskId = TasksCollection.findOne()._id
                return
            } else {
                TasksCollection.update(taskId, {
                    $set: {
                        text: getTaskString(updateNo)
                    }
                })
            }
        }, updateInterval)
    }
})