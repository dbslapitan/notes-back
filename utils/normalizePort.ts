export default function NormalizePort(port: string) {
    const portToInt = Number(port);
    return isNaN(portToInt) ? 8080 : portToInt;
}