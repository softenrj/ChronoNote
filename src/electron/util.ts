export const getRunTimeEnv = (): boolean => {
    return process.env.NODE_ENV === 'development'
}