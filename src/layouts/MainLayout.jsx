import { Button } from '@/components/ui/button';
import Footer from '@/pages/shared/Footer';
import Navbar from '@/pages/shared/Navbar';
import React from 'react';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
                {/* Outlet renders the child routes */}
                <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;