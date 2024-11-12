export const CookieName ='coinvista_token';
export const UserRole = [
    {
        role: 'user',
        url: '/dashboard/overview'
    },
    {
        role: 'admin',
        url: '/admin'
    }
]

export const formatter = new Intl.NumberFormat('en-US',{
    style:'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits:0
   })