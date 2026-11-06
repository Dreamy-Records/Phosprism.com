interface Env {
  BASIC_AUTH_USER?: string;
  BASIC_AUTH_PASSWORD?: string;
}

interface PagesContext {
  request: Request;
  env: Env;
  next: () => Promise<Response>;
}

export const onRequest = async ({ request, env, next }: PagesContext) => {
  const noIndexHeaders = {
    'Cache-Control': 'private, no-store',
    'X-Robots-Tag': 'noindex, nofollow, noarchive',
  };

  if (!env.BASIC_AUTH_USER || !env.BASIC_AUTH_PASSWORD) {
    return new Response('Staging authentication is not configured.', {
      status: 503,
      headers: noIndexHeaders,
    });
  }

  const authorization = request.headers.get('Authorization');
  let username = '';
  let password = '';

  if (authorization?.startsWith('Basic ')) {
    try {
      [username, password] = atob(authorization.slice(6)).split(/:(.*)/s, 2);
    } catch {
      // Invalid credentials are handled by the unauthorized response below.
    }
  }

  if (username !== env.BASIC_AUTH_USER || password !== env.BASIC_AUTH_PASSWORD) {
    return new Response('Authentication required.', {
      status: 401,
      headers: {
        ...noIndexHeaders,
        'WWW-Authenticate': `Basic realm="Phos'Prism Staging", charset="UTF-8"`,
      },
    });
  }

  const response = await next();
  const protectedResponse = new Response(response.body, response);

  for (const [name, value] of Object.entries(noIndexHeaders)) {
    protectedResponse.headers.set(name, value);
  }

  return protectedResponse;
};
