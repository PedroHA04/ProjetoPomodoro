export function formatSecondsToMinuts(seconds: number) {
    const minuts = String(Math.floor(seconds / 60)).padStart(2, '0')
    const seconsMod = String(Math.floor(seconds % 60)).padStart(2, '0');
    return `${minuts}:${seconsMod}`
}