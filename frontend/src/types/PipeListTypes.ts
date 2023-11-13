export interface MicroserviceInterface {
  microserviceId: string
  content: string
  userId: string
  pipeId: string
}

// export interface PipeInterface {
//   name: string
//   description: string
//   userId: string
//   microservices: MicroserviceInterface[]
// }

export interface PipeListResponse {
  data: any; 
}

export interface PipeInterface {
  pipe_id: string
  name: string
  description?: string
}

export interface Checked {
  checked: boolean
}