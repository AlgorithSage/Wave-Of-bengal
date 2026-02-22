import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata = {
    title: 'Admin Dashboard | Wave of Bengal',
    description: 'Admin administration dashboard',
}

export default function AdminLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-sky-light text-ocean-deep">
            <AdminSidebar />
            <main className="flex-1 ml-0 md:ml-64 p-6 lg:p-10 transition-all">
                {children}
            </main>
        </div>
    )
}
