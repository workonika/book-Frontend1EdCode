import React, {useState} from 'react';
import star_empty from './star_empty.svg';
import star_filled from './star_filled.svg';

export const Star = ({ isFilled, onClick }) => {
    
    const source = isFilled ? star_filled : star_empty;

    return (<img src={source} onClick={onClick} />);
}

export const StarRating = ({ amount = 1 }) => {

    const [rateStar, setRateStar] = useState(null);
    
    const handleStarAction = (idx) => setRateStar(idx);

    return (
        <>
            {
                new Array(amount).fill(Star).map((Star, idx) => (
                    <Star key={`${idx}-${idx}`} 
                        isFilled={rateStar !== null ? rateStar >= idx : false}
                        onClick={() => handleStarAction(idx)} />
                ))
            }
        </>
    );
}