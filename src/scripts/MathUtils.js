export default class MathUtils {
    lerp = (start, end, amt) =>
        (1 - amt) * start + amt * end

    clamp = (num, min, max) =>
        num <= min ? min : num >= max ? max : num

    range = (value, low1, high1, low2, high2) =>
        low2 + (high2 - low2) * (value - low1) / (high1 - low1)
}