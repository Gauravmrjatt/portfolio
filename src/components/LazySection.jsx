import { useInView } from 'react-intersection-observer';

const LazySection = ({ children }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    return (
        <div ref={ref}>
            {inView ? children : null}
        </div>
    );
};
export default LazySection;