import { useState, useEffect, useCallback } from 'react';
import type { HealthRecord } from './types';
import { PROFILE_RECORDS } from './data';

const STORAGE_PREFIX = 'healthvault_records_';

function loadProfileRecords(profileId: string): HealthRecord[] {
  const key = STORAGE_PREFIX + profileId;
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored) as HealthRecord[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore corrupted data
  }
  // Fall back to seed data for this profile
  return PROFILE_RECORDS[profileId] ?? PROFILE_RECORDS.aman ?? [];
}

export function useRecords(profileId: string) {
  const [records, setRecords] = useState<HealthRecord[]>(() => loadProfileRecords(profileId));

  // When the profile changes, load that profile's records
  useEffect(() => {
    setRecords(loadProfileRecords(profileId));
  }, [profileId]);

  // Persist to localStorage whenever records change
  useEffect(() => {
    try {
      const key = STORAGE_PREFIX + profileId;
      localStorage.setItem(key, JSON.stringify(records));
    } catch {
      // storage full or unavailable — keep in-memory state
    }
  }, [records, profileId]);

  const addRecord = useCallback((record: Omit<HealthRecord, 'id' | 'createdAt'>) => {
    const newRecord: HealthRecord = {
      ...record,
      id: `rec-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setRecords((prev) => [newRecord, ...prev]);
    return newRecord;
  }, []);

  const deleteRecord = useCallback((id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return { records, addRecord, deleteRecord };
}
