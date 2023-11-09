import { headers } from 'next/headers';

export default function getSession(): GithubSession | null {
    if (process.env.NODE_ENV == 'production') {
        const headersList = headers()
        const session: GithubSession | null = headersList.get('X-MS-CLIENT-PRINCIPAL-ID') ? {
            id: headersList.get('X-MS-CLIENT-PRINCIPAL-ID'),
            idp: headersList.get('X-MS-CLIENT-PRINCIPAL-IDP'),
            token: headersList.get('X-MS-TOKEN-GITHUB-ACCESS-TOKEN'),
        } : null;
        return session;
    } else {
        return {
            id: '5',
            idp: null,
            token: null
        }
    }
}
