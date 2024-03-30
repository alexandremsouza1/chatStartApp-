import { DocumentPickerResult } from 'expo-document-picker';

export interface LmFileProps {
  pickerButtonProps?: { label: string };
  uploadButtonProps?: { label: string };
  onUpload: (file: DocumentPickerResult) => Promise<void>;
  containerProps?: any;
  directUpload?: boolean;
  cancelButtonProps?: { label: string };
}