import React from 'react';
import BannerSection from './BannerSection';
import AdvertisementSection from './AdvertisementSection';
import WhyChooseUsSection from './WhyChooseUsSection';
import TestimonialsSection from './TestimonialSection';
import ProductSection from './ProductSection';

const Home = () => {
    return (
        <div>
            <BannerSection />
            <ProductSection />
            <AdvertisementSection />
            <WhyChooseUsSection />
            <TestimonialsSection />
        </div>
    );
};

export default Home;