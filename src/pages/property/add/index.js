import { useState } from 'react';
import { Home, MapPin, Image, Video, User } from "lucide-react";
import BasicInfo from '@/components/AddProperty/BasicInfo';
import Head from 'next/head';
import { cn } from "@/lib/utils";
import { Button } from "@/components/UI/button";

const AddProperty = () => {
    const [selected, setSelected] = useState("basic");

    const sidebarItems = [
        {
            id: "basic",
            icon: Home,
            label: "المعلومات الأساسية",
            component: <BasicInfo />
        },
        {
            id: "location",
            icon: MapPin,
            label: "معلومات الموقع"
        },
        {
            id: "gallery",
            icon: Image,
            label: "معرض الصور"
        },
        {
            id: "videos",
            icon: Video,
            label: "الفيديوهات"
        },
        {
            id: "agent",
            icon: User,
            label: "معلومات الوكيل"
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
                <div className="flex-1">
                    <BasicInfo />
                </div>

                {/* Sidebar (hidden for now)*/}
                <div className="w-64 border-l bg-background hidden" dir='rtl'>
                    <div className="space-y-4 py-4">
                        <div className="px-3 py-2">
                            <div className="space-y-1">
                                {sidebarItems.map((item) => (
                                    <Button
                                        key={item.id}
                                        variant={selected === item.id ? "secondary" : "ghost"}
                                        className={cn(
                                            "w-full justify-start gap-2",
                                            selected === item.id && "bg-secondary"
                                        )}
                                        onClick={() => setSelected(item.id)}
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

export default AddProperty;
