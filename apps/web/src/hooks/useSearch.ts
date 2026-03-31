'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { apiRequest } from '@/lib/api';

export interface SearchFilters {
  keyword?: string;
  dialectId?: string;
  type?: string;
  limit?: number;
  offset?: number;
}

export function useSearch() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const performSearch = useCallback(async (filters: SearchFilters) => {
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams();
      if (filters.keyword) query.append('keyword', filters.keyword);
      if (filters.dialectId && filters.dialectId !== 'all') query.append('dialectId', filters.dialectId);
      if (filters.type && filters.type !== 'all') query.append('type', filters.type);
      if (filters.limit) query.append('limit', filters.limit.toString());
      if (filters.offset) query.append('offset', filters.offset.toString());

      const data = await apiRequest(`/knowledge/search?${query.toString()}`);
      setResults(data);
    } catch (err: any) {
      setError(err.message || 'Failed to search');
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedSearch = useCallback((filters: SearchFilters) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      performSearch(filters);
    }, 500);
  }, [performSearch]);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return {
    results,
    loading,
    error,
    search: performSearch,
    debouncedSearch,
  };
}
