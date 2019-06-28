import {DateTime} from "luxon"

export function dateDisplay(dateString:string){
    const date = new Date(dateString)
    return DateTime.fromJSDate(date).toLocaleString({
        month:"long",
        day:"numeric",
        year:"numeric"
    })
}