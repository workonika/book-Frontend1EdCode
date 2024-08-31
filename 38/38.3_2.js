import React, {useState, useMemo} from 'react';
import star_empty from './star_empty.svg';
import star_filled from './star_filled.svg';

export const Star = ({ isFilled, onClick, mouseOver, mouseOut }) => {
    
    const source = isFilled ? star_filled : star_empty;

    return (
        <img src={source} onClick={onClick} onMouseOver={mouseOver} onMouseOut={mouseOut} />
    );
}

export const StarRating = ({ amount = 1 }) => {

    const starList = useMemo(() => new Array(amount).fill(Star), []);
    const [isRatingPutDown, setIsRatingPutDown] = useState(false);

    const [rateStar, setRateStar] = useState(null);
    
    const handleStarAction = (idx) => {
        setRateStar(idx)
        setIsRatingPutDown(true);
    };

    const handleMouseOver = (idx) => { 
        if (isRatingPutDown) 
            return; 
        setRateStar(idx) 
    };

    const handleMouseOut = () => {
        if (isRatingPutDown) 
            return; 
        setRateStar(null); 
    }

    return (
        <>
            {
                starList.map((Star, idx) => (
                    <Star key={`${idx}-${idx}`} isFilled={rateStar !== null ? rateStar >= idx : false} 
                        mouseOver={() => handleMouseOver(idx)}
                        mouseOut={handleMouseOut}
                        onClick={() => handleStarAction(idx)} />
                ))
            }
        </>
    );
}