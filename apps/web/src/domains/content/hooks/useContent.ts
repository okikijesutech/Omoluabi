import { useState, useEffect } from 'react';
import { Lesson } from "@omoluabi/shared-types";

export const useContent = <T = Lesson>(path: string) => {
  const [content, setContent] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error('Failed to load content');
        }
        const data = await response.json();
        setContent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (path) {
      fetchContent();
    }
  }, [path]);

  return { content, loading, error };
};
