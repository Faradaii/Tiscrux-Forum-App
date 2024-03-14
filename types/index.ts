export interface User {
  id: string
  name: string
  email: string
  avatar: string
}

export interface Token {
  name: string
  email: string
  password: string
}

export interface ThreadBase {
  id: string
  title: string
  body: string
  category: string
  createdAt: string
  ownerId: string
  upVotesBy: string[]
  downVotesBy: string[]
}

export interface Threads extends ThreadBase {
  totalComments: number
}

export interface Comment {
  id: string
  content: string
  createdAt: string
  upVotesBy: string[]
  downVotesBy: string[]
  owner: User
}

export interface Thread extends ThreadBase {
  owner: Omit<User, 'email'>
  comments: Comment[]
}

export interface LeaderboardData {
  user: User
  score: number
}

export interface Vote {
  id: string
  userId: string
  voteType: number
}

export interface VoteThread extends Vote {
  threadId: string
}

export interface VoteComment extends Vote {
  commentId: string
}

interface Response {
  status: string
  message: string
  data: object
}

export interface VoteResponse extends Response {
  data: VoteComment | VoteThread
}

export interface ThemeType {
  theme: string
  toggleTheme: () => void
}

export interface LoadingBarAction {
  type: string
  payload?: any
}