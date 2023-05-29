import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Welcome({ auth, templates }: PageProps<{ auth: Object|null, templates: Object }>) {
    return (
        <>
            <Head title="Welcome" />
            <h1> Hello Email Templates</h1>
        </>
    );
}
