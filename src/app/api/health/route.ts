import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 讀取版本資訊
    const version = process.env.NEXT_PUBLIC_APP_VERSION || '2.0.0';
    const buildTime = process.env.BUILD_TIME || new Date().toISOString();
    const commitSha = process.env.VERCEL_GIT_COMMIT_SHA || process.env.COMMIT_SHA || 'local-dev';
    const buildId = process.env.BUILD_ID || 'local-build';

    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'Morning AI Phase 2 Final',
      version,
      commit: commitSha.substring(0, 7), // 只顯示前7位
      buildTime,
      buildId,
      environment: process.env.NODE_ENV || 'development',
    };

    return NextResponse.json(healthData, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (_error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
      },
      { status: 500 }
    );
  }
}

