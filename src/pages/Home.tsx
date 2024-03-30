import React, { useState, useCallback } from 'react';
import { View, Button } from 'react-native';
import { TextInput, ProgressBar } from 'react-native-paper';
import { LmFile } from '@/components/file';
import { DocumentPickerResult } from 'expo-document-picker';


const Home: React.FC = () => {
  return (
    <View>
      <LmFile
        onUpload={async (file: DocumentPickerResult) => {
          console.log(file, 'file');
        }}
      />
    </View>
  )
};

export default Home;
