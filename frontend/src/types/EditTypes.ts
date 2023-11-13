
export interface EditProps {
  id: string;
  show: boolean;
  params: any;
  data: any;
  closeOverlay: () => void;
  type?: string;
}

export interface EditFromPipeProps {
  id: string;
  show: boolean;
  params: any;
  data: any;
  closeOverlay: () => void;
  type?: string;
  parent_pipe_id: string;
  idx: number;
}