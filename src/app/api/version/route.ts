import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const version = process.env.NEXT_PUBLIC_APP_VERSION || '2.0.0';
    const commitSha = process.env.VERCEL_GIT_COMMIT_SHA || process.env.COMMIT_SHA || 'local-dev';
    const buildTime = process.env.BUILD_TIME || new Date().toISOString();

    const versionData = {
      version,
      commit: commitSha.substring(0, 7),
      buildTime,
      fullCommit: commitSha,
    };

    return NextResponse.json(versionData, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600', // 快取1小時
      },
    });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Version info unavailable' },
      { status: 500 }
    );
  }
}

