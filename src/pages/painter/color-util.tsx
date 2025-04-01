export interface RGB {
    r: number;
    g: number;
    b: number;
}

export const MIN_CONTRAST = 4.5;

export const parseRgb = (color: number): RGB => {
    const r = (color >>> 16) & 0xff;
    const g = (color >>> 8) & 0xff;
    const b = color & 0xff;
    return {r, g, b};
}

export const contrastYiq = (color: number): number => {
    const {r, g, b} = parseRgb(color);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;  return yiq >= 128 ? 0x0 : 0xffffff;
};

export const toRgbStr = (color: number): string => {
    const {r, g, b} = parseRgb(color);
    return `rgb(${r}, ${g}, ${b})`;
}

export const invert = (color: number): number => color ^ 0xffffff;

export const luminance = ({r, g, b}: RGB): number => {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow( (v + 0.055) / 1.055, 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export const contrast = (rgb1: number, rgb2: number) => {
    var lum1 = luminance(parseRgb(rgb1));
    var lum2 = luminance(parseRgb(rgb2));
    var brightest = Math.max(lum1, lum2);
    var darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}
