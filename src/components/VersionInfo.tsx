'use client';

import { useEffect, useState } from 'react';

type VersionData = {
  version: string;
  commit: string;
  buildTime: string;
};

export const VersionInfo = () => {
  const [versionData, setVersionData] = useState<VersionData | null>(null);

  useEffect(() => {
    const fetchVersionData = async () => {
      try {
        // 在測試環境中跳過API調用
        if (typeof window === 'undefined' || process.env.NODE_ENV === 'test') {
          return;
        }

        const response = await fetch('/api/version');
        if (response.ok) {
          const data = await response.json();
          setVersionData(data);
        }
      } catch (error) {
        // 在測試環境中完全靜默
        if (process.env.NODE_ENV !== 'test' && typeof window !== 'undefined') {
          console.error('Failed to fetch version data:', error);
        }
      }
    };

    fetchVersionData();
  }, []);

  if (!versionData) {
    return (
      <div className="text-xs text-muted-foreground">
        <div>Version: 2.0.0</div>
        <div>Build: local-dev</div>
      </div>
    );
  }

  return (
    <div className="text-xs text-muted-foreground">
      <div>
        Version:
        {versionData.version}
      </div>
      <div>
        Build:
        {versionData.commit}
      </div>
    </div>
  );
};
