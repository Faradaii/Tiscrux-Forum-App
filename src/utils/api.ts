import type { LeaderboardData, Thread, Threads, User, VoteResponse, ThreadDetailComment } from '../../types';

const api = (() => {
  const BASE_URL: string = 'https://forum-api.dicoding.dev/v1';

  function putAccessToken (token: string): void {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken (): string | null {
    return localStorage.getItem('accessToken');
  }

  async function _fetchWithAuth (url: string, options: RequestInit = {}): Promise<Response> {
    return await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`
      }
    });
  }

  async function register ({ email, name, password }:
  { email: string, name: string, password: string }): Promise<User> {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        name,
        password
      })
    });

    const responseJson = await response.json();
    const { status, message }: { status: string, message: string | undefined } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { user } } = responseJson;

    return user;
  }

  async function login ({ email, password }: { email: string, password: string }): Promise<string> {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const responseJson = await response.json();
    const { status, message }: { status: string, message: string | undefined } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { token } } = responseJson;

    return token;
  }

  async function getOwnProfile (): Promise<User> {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    const { status, message }: { status: string, message: string | undefined } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { user } } = responseJson;
    return user;
  }

  async function getAllUsers (): Promise<User[]> {
    const response = await fetch(`${BASE_URL}/users`);

    const responseJson = await response.json();

    const { status, message }: { status: string, message: string | undefined } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { users } } = responseJson;

    return users;
  }

  async function getAllThreads (): Promise<Threads[]> {
    const response = await fetch(`${BASE_URL}/threads`);

    const responseJson = await response.json();

    const { status, message }: { status: string, message: string | undefined } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { threads } } = responseJson;

    return threads;
  }

  async function getThreadDetail (id: string): Promise<Thread> {
    const response = await fetch(`${BASE_URL}/threads/${id}`);

    const responseJson = await response.json();

    const { status, message }: { status: string, message: string | undefined } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { detailThread } } = responseJson;

    return detailThread;
  }

  async function createThread ({ title, body = '', category = '' }:
  { title: string, body: string, category: string }): Promise<Threads> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        body,
        category
      })
    });

    const responseJson = await response.json();

    const { status, message }: { status: string, message: string | undefined } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { thread } } = responseJson;

    return thread;
  }

  async function createComment ({ threadId, content = '' }: { threadId: string, content: string }): Promise<ThreadDetailComment> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content
      })
    });

    const responseJson = await response.json();

    const { status, message }: { status: string, message: string | undefined } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { comment } } = responseJson;

    return comment;
  }

  async function getLeaderboards (): Promise<LeaderboardData[]> {
    const response = await fetch(`${BASE_URL}/leaderboards`);

    const responseJson = await response.json();

    const { status, message }: { status: string, message: string | undefined } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { leaderboards } } = responseJson;

    return leaderboards;
  }

  async function upvoteThread (id: string): Promise<VoteResponse> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/up-vote`, {
      method: 'POST'
    });

    const responseJson = await response.json();

    return responseJson;
  }

  async function downvoteThread (id: string): Promise<VoteResponse> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/down-vote`, {
      method: 'POST'
    });

    const responseJson = await response.json();

    return responseJson;
  }

  async function neutralvoteThread (id: string): Promise<VoteResponse> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/neutral-vote`, {
      method: 'POST'
    });

    const responseJson = await response.json();

    const { status, message }: { status: string, message: string | undefined } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson;
  }

  async function upvoteThreadComment (threadId: string, commentId: string):
  Promise<VoteResponse> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, {
      method: 'POST'
    });

    const responseJson = await response.json();

    const { status, message }: { status: string, message: string | undefined } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson;
  }
  async function downvoteThreadComment (threadId: string, commentId: string):
  Promise<VoteResponse> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, {
      method: 'POST'
    });

    const responseJson = await response.json();

    const { status, message }: { status: string, message: string | undefined } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson;
  }

  async function neutralvoteThreadComment (threadId: string, commentId: string):
  Promise<VoteResponse> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`, {
      method: 'POST'
    });

    const responseJson = await response.json();

    const { status, message }: { status: string, message: string | undefined } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson;
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    createThread,
    getThreadDetail,
    getLeaderboards,
    createComment,
    upvoteThread,
    downvoteThread,
    neutralvoteThread,
    upvoteThreadComment,
    downvoteThreadComment,
    neutralvoteThreadComment
  };
})();

export default api;
