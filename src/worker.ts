import { onRequestPost as aiAssistantPost } from '../functions/api/ai-assistant';
import { onRequestPost as quizGeneratePost } from '../functions/api/quiz-generate';
import { onRequestPost as simulatorGeneratePost } from '../functions/api/simulator-generate';

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  GEMINI_API_KEY?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Route API endpoints
    if (request.method === 'POST') {
      if (url.pathname === '/api/ai-assistant') {
        return aiAssistantPost({ request, env });
      }
      if (url.pathname === '/api/quiz-generate') {
        return quizGeneratePost({ request, env });
      }
      if (url.pathname === '/api/simulator-generate') {
        return simulatorGeneratePost({ request, env });
      }
    }

    if (url.pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Fall back to static assets (SPA)
    return env.ASSETS.fetch(request);
  }
};
