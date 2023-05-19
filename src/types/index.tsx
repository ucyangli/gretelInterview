export interface Event {
  id: number;
  type: string;
  datetime: number;
  status: string;
  roomId: number;
  residentId: number;
}

export interface Resident {
  id: number;
  name: string;
  age: number;
}