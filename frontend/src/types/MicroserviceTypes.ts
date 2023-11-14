

export interface MicroserviceProps {
  code: string
  name: string
  docstring: string
  param: Record<string, any>
  parent_file: string
  from_pipe: boolean
  parent_pipe_id: string
  output_type: string
  idx: number
}