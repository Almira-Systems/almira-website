import styles from "./carousel.module.scss";

interface CarouselItem {
  element: React.ReactNode;
}

interface CarouselProps {
  items: CarouselItem[];
}

const Carousel = ({ items }: CarouselProps) => {
  return <div className={styles.carousel}>{items.map((i) => i.element)}</div>;
};

export default Carousel;
