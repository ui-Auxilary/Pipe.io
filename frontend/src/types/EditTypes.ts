
export interface EditProps {
  id: string;
  show: boolean;
  params: object;
  data: object;
  closeOverlay: () => void;
  type?: string;
}

export interface EditFromPipeProps {
  id: string;
  show: boolean;
  params: object;
  data: object;
  closeOverlay: () => void;
  type?: string;
  parent_pipe_id: string;
  idx: number;
}