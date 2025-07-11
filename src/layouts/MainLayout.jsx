import { Button } from '@/components/ui/button';
import Footer from '@/pages/shared/Footer';
import Navbar from '@/pages/shared/Navbar';
import React from 'react';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <main className="pt-20 min-h-screen">
                {/* Routed pages */}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;