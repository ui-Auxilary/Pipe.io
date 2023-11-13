export interface CheckBoxProps {
  id: string;
  type: string;
  name: string;
  handleClick: () => void;
  isChecked: boolean;
}