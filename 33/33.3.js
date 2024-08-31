export const LengthCm = ({ inchLength }) => {

    const inchCoefficient = 2.54;
    
    return (
        <div>
            Длина в дюймах { inchLength } в сантиметрах составляет { inchCoefficient * inchLength }
        </div>
    );
}