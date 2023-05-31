import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

interface PageProps<T> {
    auth: Object | null,
    templates: T
}
interface TemplateObject {
    id: number,
    name: string, 
    source_code: string,
} 
export default function Templates({ auth, templates }: PageProps<TemplateObject[]>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        <div className="flex justify-between items-center">
                        <h1>Template</h1>
                        <Link className='hover:underline' href={`/templates/show`}>Add New</Link>
                        </div>
                        <div>
                            {templates.map((template, index) => (
                                <div className='py-2 px-5' key={index}>
                                    <Link className='hover:underline' href={`/templates/${template.id}/show`}>Show template {template.id}</Link>
                                </div>
                            ))}
                        </div>

                                <div></div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}