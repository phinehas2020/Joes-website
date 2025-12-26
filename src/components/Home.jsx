import Hero from './Hero';
import ProductGrid from './ProductGrid';
import About from './About';
import Process from './Process';
import { MarqueeBanner } from './Marquee';

const Home = () => {
    return (
        <>
            <Hero />
            <MarqueeBanner
                items={['Handcrafted', 'Heritage', 'Sustainable', 'Timeless', 'Artisanal', 'Since 1984']}
                separator="•"
                speed={40}
            />
            <ProductGrid />
            <About />
            <MarqueeBanner
                items={['Premium Materials', 'Traditional Joinery', 'Hand-Rubbed Finish', 'Lifetime Warranty']}
                separator="/"
                speed={30}
                className="bg-[#FAF9F6] text-[#1A1A1A]"
            />
            <Process />
        </>
    );
};

export default Home;
