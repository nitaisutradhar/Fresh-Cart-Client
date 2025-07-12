import { Button } from '@/components/ui/button';
import Footer from '@/pages/shared/Footer';
import Navbar from '@/pages/shared/Navbar';
import React from 'react';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <main className="pt-10 min-h-screen">
                {/* Routed pages */}
                <Outlet />
                {/* Outlet renders the child routes */}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;