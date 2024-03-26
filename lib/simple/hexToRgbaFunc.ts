export function hexToRgba(hex: string, alpha: number): string {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
        return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result === null) {
        throw new Error("Invalid hex color string");
    }
    const r = parseInt(result[1]!, 16);
    const g = parseInt(result[2]!, 16);
    const b = parseInt(result[3]!, 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}