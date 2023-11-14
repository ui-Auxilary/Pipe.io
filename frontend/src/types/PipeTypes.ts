import React from 'react';

export interface Props {
  pipeId: string;
  id: string;
  name: string;
  description?: string;
  checked?: boolean;
  onCheck: (pipeId: string, id: number) => void;
  ref: React.MutableRefObject<never[]>;
  idx: number;
}

export interface ExecuteProps {
  time: number;
  result: object;
}

export interface PipeResponse {
  data: { 
    last_executed: number; 
    status: string;
  }
}

export interface CSVDownloadProps {
  pipeId: string;
  output: string;
  name: string;
}

export interface DownloadProps {
  pipeId: string;
  output: string;
}