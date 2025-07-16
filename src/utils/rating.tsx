import type { Theme } from "@mui/material";
import { Star, StarHalf, StarBorder } from "@mui/icons-material";

export function countStar(reviews: { rating: number }[]): number {
    const n = reviews.length;
    const sum = reviews.reduce((acc: number, curr) => acc + curr.rating, 0);
    return n > 0 ? sum / n : 0;
}

export function renderStars(rating: number, theme: Theme, size = 20) {
    const stars = [];
    const rounded = Math.round(rating * 2) / 2;
    for (let i = 1; i <= 5; i++) {
        if (rounded >= i) {
            stars.push(<Star key={i} sx={{ color: '#FFD700', fontSize: size }} />);
        } else if (rounded + 0.5 === i) {
            stars.push(<StarHalf key={i} sx={{ color: '#FFD700', fontSize: size }} />);
        } else {
            stars.push(<StarBorder key={i} sx={{ color: theme.palette.grey[400], fontSize: size }} />);
        }
    }
    return stars;
}