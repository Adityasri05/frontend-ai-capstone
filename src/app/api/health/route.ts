import { NextResponse } from 'next/server';
import { getHealthStatus } from '../../../utils/health';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const health = await getHealthStatus();
    return NextResponse.json(health, {
      status: health.status === 'Healthy' ? 200 : 503
    });
  } catch (error: any) {
    return NextResponse.json(
      { 
        status: 'Unhealthy', 
        error: error.message || 'Unknown internal health check error' 
      },
      { status: 500 }
    );
  }
}
