import { useCallback, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

export interface ViewLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

type UseViewLayoutResult = [
  ViewLayout | undefined,
  (e: LayoutChangeEvent) => void,
];

export function useViewLayout(): UseViewLayoutResult {
  const [layout, setLayout] = useState<ViewLayout | undefined>(undefined);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    console.log('heigght', e.nativeEvent.layout.height);
    setLayout(e.nativeEvent.layout);
  }, []);

  return [layout, onLayout];
}
