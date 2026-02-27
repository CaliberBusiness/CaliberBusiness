import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const url = request.nextUrl;
    const code = url.searchParams.get('code');

    if (!code) {
        return NextResponse.json({ error: 'No authorization code provided.' }, { status: 400 });
    }

    const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
    const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

    if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
        return NextResponse.json({ error: 'GitHub credentials are not configured.' }, { status: 500 });
    }

    try {
        // Exchange the authorization code for an access token
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: GITHUB_CLIENT_ID,
                client_secret: GITHUB_CLIENT_SECRET,
                code,
            }),
        });

        const tokenData = await tokenResponse.json();

        if (tokenData.error) {
            return NextResponse.json({ error: tokenData.error_description || tokenData.error }, { status: 400 });
        }

        const accessToken = tokenData.access_token;

        // Decap CMS uses a specific postMessage protocol to receive the token
        const script = `
      <script>
        (function() {
          function receiveMessage(e) {
            console.log("receiveMessage window.opener", window.opener);
            if (!window.opener) {
               console.error('No window.opener found');
               return;
            }
            
            console.log("sending message to window.opener %o", e.origin);
            
            // Send the token back to the Decap CMS window
             window.opener.postMessage(
              'authorization:github:success:' + JSON.stringify({ 
                token: "${accessToken}", provider: "github" 
              }),
              e.origin || '*'
            );
            
            window.removeEventListener("message", receiveMessage, false);
          }
          window.addEventListener("message", receiveMessage, false);
          
          window.opener.postMessage("authorizing:github", "*");
        })();
      </script>
    `;

        return new NextResponse(script, {
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
            },
        });

    } catch (error) {
        console.error('Error in OAuth callback:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
