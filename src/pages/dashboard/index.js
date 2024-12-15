import { useState } from 'react';
import { Home, MapPin, Image, Video, User, Building } from "lucide-react";
import BasicInfo from '@/components/AddProperty/BasicInfo';
import Head from 'next/head';
import { cn } from "@/lib/utils";
import { Button } from "@/components/UI/button";
import PropertyRequest from '@/components/dashboard/propertyRequests';
import AddAdmin from '@/components/dashboard/addAdmin';
import AddArticle from '@/components/dashboard/addArticle';
import AddProjects from '@/components/dashboard/addProjects';


const Dashboard = () => {
    const [selectedSteps, setSelectedSteps] = useState(1);

    const sidebarItems = [
        {
            id: 1,
            icon: Home,
            label: "الطلبات",
            component: <PropertyRequest />
        },
        {
            id: 2,
            icon: Building,
            label: "إضافة مشاريع",
            component: <AddProjects />
        },
        {
            id: 3,
            icon: User,
            label: "إضافة أدمن",
            component: <AddAdmin />
        },
        {
            id: 4,
            icon: Image,
            label: "إضافة مقال",
            component: <AddArticle />
        }
    ];

    return (
        <>
            <Head>
                <title>Aqar Misr | إضافة عقار</title>
                <meta name="description" content="إضافة عقار" />
            </Head>
            <div className="flex min-h-screen">
                {/* Main content area */}
                <div className="flex-grow">
                    {sidebarItems.find(item => item.id === selectedSteps)?.component}
                </div>

                {/*The sidebar itself */}
                <div className="w-64 border-l bg-background" dir='rtl'>
                    <div className="space-y-4 py-4">
                        <div className="px-3 py-2">
                            <div className="space-y-1">
                                {sidebarItems.map((item) => (
                                    <Button
                                        key={item.id}
                                        variant={selectedSteps === item.id ? "secondary" : "ghost"}
                                        className={cn(
                                            "w-full justify-start gap-2",
                                            selectedSteps === item.id && "bg-secondary"
                                        )}
                                        onClick={() => setSelectedSteps(item.id)}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.label}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
