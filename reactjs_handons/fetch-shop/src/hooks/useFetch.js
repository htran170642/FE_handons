import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!url) return; // bảo vệ: không fetch nếu url chưa có

    const controller = new AbortController();

    setLoading(true);
    setData(null);
    setError(null);

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then(json => setData(json))
      .catch(err => {
        if (err.name === 'AbortError') return;
        setError(err.message);
      })
      .finally(() => {
        // không update state nếu fetch bị abort (cleanup của StrictMode hoặc unmount)
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [url]); // re-fetch mỗi khi url thay đổi

  return { data, loading, error };
}
