// 用户
interface user{
    name: string
    email: string
}

// session
interface GithubSession{
    id: string | null
    idp: string | null
    token: string | null
}
