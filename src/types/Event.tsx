export interface Event {
    id: number;
    type: EventType;
    datetime: number;
    status: EventStatus;
    roomId: number;
    residentId: number;
}

export enum EventType {
    Emergency = "Emergency",
    Assistant = "Assistance"
}

export enum EventStatus {
    active = "active",
    done = "done",
}