import React, { useState } from 'react';
import { Platform } from 'react-native';
import { Button, Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { LmFileProps } from './types';

export function LmFile({
  pickerButtonProps = { label: 'Pick File' },
  uploadButtonProps = { label: 'Upload' },
  onUpload,
  containerProps,
  directUpload,
  cancelButtonProps = { label: 'Cancel' },
}: LmFileProps) {
  const [result, setResult] = useState<DocumentPicker.DocumentPickerResult | null>(null);
  const [file , setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  let intervalId: NodeJS.Timeout;

  const upload = async (res: DocumentPicker.DocumentPickerResult) => {
    setIsUploading(true);
    await onUpload(res);
    setIsUploading(false);
  };

  const handleFilePick = () => {
    DocumentPicker.getDocumentAsync({
      type: ['video/*', 'image/*'],
    }).then(async (res) => {
      if (res.canceled) return;
      const file = res.assets[0];
      setFile(file);
      let fileContent;
      if (Platform.OS === 'web') {
        fileContent = file.file;
      } else {
        fileContent = await FileSystem.readAsStringAsync(file.uri);
      }
      setResult(res);
      return fileContent;
    })
  };

  const startUploadProgress = () => {
    setIsUploading(true);
  };

  const finishUploadProgress = () => {
    setIsUploading(false);
    clearInterval(intervalId);
  };

  return (
    <View {...containerProps}>
      {result && (
        <View>
          <Text>{file?.name}</Text>
          <Text>{file?.size}</Text>
        </View>
      )}
      {!result && (
        <Button
          title={pickerButtonProps.label}
          onPress={handleFilePick}
        />
      )}
      {uploadProgress > 0 && (
        <ProgressBar progress={uploadProgress} color={'blue'} style={{ width: '80%', marginTop: 20 }} />
      )}
    </View>
  );
}