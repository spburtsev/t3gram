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

export function useFileWithUrl(opts?: { initialValue?: File }) {
  const initialValue = opts?.initialValue ?? null;
  const [file, setFile] = useState<File | null>(initialValue);
  const [fileUrl, setFileUrl] = useState<string | null>(
    initialValue === null ? null : URL.createObjectURL(initialValue)
  );

  const setFileAndUrl = useCallback(
    (file: File) => {
      setFile(file);
      if (fileUrl !== null) {
        URL.revokeObjectURL(fileUrl);
      }
      setFileUrl(URL.createObjectURL(file));
    },
    [fileUrl]
  );

  const removeFileAndUrl = useCallback(() => {
    setFile(null);
    if (fileUrl !== null) {
      URL.revokeObjectURL(fileUrl);
    }
    setFileUrl(null);
  }, [fileUrl]);

  return {
    file,
    fileUrl,
    setFile: setFileAndUrl,
    removeFile: removeFileAndUrl,
  };
}

export type UseFileWithUrlReturn = ReturnType<typeof useFileWithUrl>;
