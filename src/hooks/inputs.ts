import { useState, useCallback } from "react";

export function useArray<TItem>(opts?: { initialValue?: TItem[] }) {
  const [items, setItems] = useState<TItem[]>(opts?.initialValue ?? []);

  const add = useCallback((item: TItem) => {
    setItems((items) => [...items, item]);
  }, []);

  const remove = useCallback((index: number) => {
    setItems((items) => [...items.slice(0, index), ...items.slice(index + 1)]);
  }, []);

  const clear = useCallback(() => {
    setItems([]);
  }, []);

  return {
    items,
    setItems,
    add,
    remove,
    clear,
  };
}

export type UseArrayReturn<TItem> = ReturnType<typeof useArray<TItem>>;
