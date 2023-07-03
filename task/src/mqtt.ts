import mqtt from 'mqtt'
import { faker } from '@faker-js/faker'
import clc from 'cli-color'

export const mqttClient = mqtt.connect('mqtt://bus3-listeners:1883', {
    clientId: "TaskId",
    clean: true,
    username: 'admin',
    password:"public"
})


export const subscribeMqttTopic = (topicsub:string) => {
    return new Promise((resolve, reject) => {
        mqttClient.subscribe(topicsub, (error: Error) => {
            if (error) {
                console.error('Error subscribing to topic:', error);
                reject(error)
            } else {
              console.log(clc.bgGreen.underline(`Subscribed to topic: ${topicsub}`))
              resolve(true)
            }

        });
        
    })
}







export const publishMqttMessage = (topic: string, data: any) => {

    return new Promise((resolve, reject) => {

        
        mqttClient.publish(topic, JSON.stringify(data), (error) => {
        
            if (error) {
                    
                console.error('Error publishing message:', error);
                reject(error)
                
            } else {
                
                console.log(clc.yellow(`Published message to topic '${topic}'`))
                
                resolve(true)
                
            }
        })

    })

    
}





export const publishMassive = async(topic:string,time:number) => {

    setInterval(async () => {

        const data = {
            name: faker.person.firstName(),
            company:faker.company.name()
        }

        await publishMqttMessage(topic, data)
        
    },time)

}