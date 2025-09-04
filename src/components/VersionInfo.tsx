'use client';

import { useEffect, useState } from 'react';

interface VersionData {
  version: string;
  commit: string;
  buildTime: string;
}

export const VersionInfo = () => {
  const [versionData, setVersionData] = useState<VersionData | null>(null);

  useEffect(() => {
    const fetchVersionData = async () => {
      try {
        const response = await fetch('/api/version');
        if (response.ok) {
          const data = await response.json();
          setVersionData(data);
        }
      } catch (error) {
        console.error('Failed to fetch version data:', error);
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
      <div>Version: {versionData.version}</div>
      <div>Build: {versionData.commit}</div>
    </div>
  );
};

