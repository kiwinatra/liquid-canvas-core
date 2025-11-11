import { useState, useEffect } from 'react';
import { openDB } from 'idb';

const DB_NAME = 'settingsDB';
const STORE_NAME = 'settings';

async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

export function useIndexedDB<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadValue = async () => {
      try {
        const db = await initDB();
        const value = await db.get(STORE_NAME, key);
        if (value !== undefined) {
          setStoredValue(value);
        }
      } catch (error) {
        console.error('Error loading from IndexedDB:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadValue();
  }, [key]);

  const setValue = async (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      const db = await initDB();
      await db.put(STORE_NAME, valueToStore, key);
    } catch (error) {
      console.error('Error saving to IndexedDB:', error);
    }
  };

  return [storedValue, setValue, isLoading] as const;
}
