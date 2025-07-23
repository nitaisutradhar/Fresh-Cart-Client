import React from 'react';
import BannerSection from './BannerSection';
import AdvertisementSection from './AdvertisementSection';
import WhyChooseUsSection from './WhyChooseUsSection';
import TestimonialsSection from './TestimonialSection';

const Home = () => {
    return (
        <div>
            <BannerSection />
            <AdvertisementSection />
            <WhyChooseUsSection />
            <TestimonialsSection />
        </div>
    );
};

export default Home;