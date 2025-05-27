import { useState } from 'react';
import { Home, Image, User, Building, ListTodo, UserRound,  } from "lucide-react";
import Head from 'next/head';
import { cn } from "@/lib/utils";
import { Button } from "@/components/UI/button";
import PropertyRequest from '@/components/dashboard/propertyRequests';
import AddAdmin from '@/components/dashboard/addAdmin';
import AddArticle from '@/components/dashboard/addArticle';
import AddProjects from '@/components/dashboard/addProjects';
import EmployeeTasks from '@/components/dashboard/EmployeeTasks';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Employees from '@/components/dashboard/Employees';

const Dashboard = ({ employees }) => {
    const [selectedSteps, setSelectedSteps] = useState(1);
    const user = useSelector((state) => state.auth.user);

    const allSidebarItems = [
        {
            id: 1,
            icon: Home,
            label: "الطلبات",
            component: <PropertyRequest employees={employees} />,
            roles: ['admin']
        },
        {
            id: 2,
            icon: ListTodo,
            label: "مهامي",
            component: <EmployeeTasks employeeId={user?._id} />,
            roles: ['employee']
        },
        {
            id: 3,
            icon: UserRound,
            label: "الموظفين",
            component: <Employees />,
            roles: ['admin']
        },
        {
            id: 4,
            icon: Building,
            label: "إضافة مشاريع",
            component: <AddProjects />,
            roles: ['admin']
        },
        {
            id: 5,
            icon: User,
            label: "إضافة أدمن",
            component: <AddAdmin />,
            roles: ['admin']
        },
        {
            id: 6,
            icon: Image,
            label: "إضافة مقال",
            component: <AddArticle />,
            roles: ['admin']
        }
    ];

    // Filter sidebar items based on user role
    const sidebarItems = allSidebarItems.filter(item => 
        item.roles.includes(user?.type)
    );

    // If no items are available for the user's role, show a message
    if (sidebarItems.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl">لا يوجد لديك صلاحيات للوصول إلى لوحة التحكم</p>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Aqar Misr | لوحة التحكم</title>
                <meta name="description" content="لوحة التحكم" />
            </Head>
            <main>
            <div className="flex min-h-screen">
                {/* Main content area */}
                <div className="flex-grow">
                    {sidebarItems.find(item => item.id === selectedSteps)?.component}
                </div>

                {/* The sidebar itself */}
                <div className="w-16 md:w-64 border-l bg-background" dir='rtl'>
                    <div className="space-y-4 py-4">
                        <div className="px-3 py-2">
                            <div className="space-y-1">
                                {sidebarItems.map((item) => (
                                    <Button
                                        key={item.id}
                                        variant={selectedSteps === item.id ? "secondary" : "ghost"}
                                        className={cn(
                                            "w-full justify-center md:justify-start gap-2",
                                            selectedSteps === item.id && "bg-secondary"
                                        )}
                                        onClick={() => setSelectedSteps(item.id)}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        <span className="hidden md:inline">{item.label}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </main>
        </>
    );
};

export async function getServerSideProps() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const response = await axios.get(`${baseUrl}/api/employee/getEmployees`);
        return {
            props: {
                employees: response.data.data || []
            }
        };
    } catch (error) {
        console.error('Error fetching employees:', error);
        return {
            props: {
                employees: []
            }
        };
    }
}

export default Dashboard;