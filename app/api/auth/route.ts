import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;

    if (!GITHUB_CLIENT_ID) {
        return NextResponse.json({ error: 'GITHUB_CLIENT_ID is not configured' }, { status: 500 });
    }

    // Redirect the user to the GitHub OAuth authorization endpoint
    // We use standard 'repo' or 'public_repo' scope to allow Decap CMS to create commits
    const authUrl = new URL('https://github.com/login/oauth/authorize');
    authUrl.searchParams.set('client_id', GITHUB_CLIENT_ID);
    authUrl.searchParams.set('scope', 'repo,user');

    return NextResponse.redirect(authUrl.toString());
}
