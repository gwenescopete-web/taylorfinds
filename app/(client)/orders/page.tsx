import Container from '@/components/Container'
import OrdersComponent from '@/components/OrdersComponent'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getMyOrders } from '@/sanity/queries'
import { auth } from '@clerk/nextjs/server'
import { FileX, ShoppingBag, Package, TrendingUp, Clock } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const OrdersPage = async() => {
    const {userId} = await auth()
    if (!userId) {
        return redirect("/")
    }
    const orders = await getMyOrders(userId)
    
    // Calculate stats
    const totalOrders = orders?.length || 0
    const totalSpent = orders?.reduce((sum, order) => sum + (order.totalPrice || 0), 0) || 0
    const pendingOrders = orders?.filter(order => order.status === 'pending')?.length || 0
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
            <Container>
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-shop-btn-dark-blue to-shop-royal-blue rounded-2xl shadow-lg">
                            <ShoppingBag className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-shop-btn-dark-blue to-shop-royal-blue">
                                My Orders
                            </h1>
                            <p className="text-gray-600 mt-1">Track and manage your order history</p>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    {(orders?.length ?? 0) > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">Total Orders</p>
                                        <h3 className="text-3xl font-bold text-shop-btn-dark-blue mt-1">
                                            {totalOrders}
                                        </h3>
                                    </div>
                                    <div className="p-3 bg-blue-100 rounded-xl">
                                        <Package className="w-6 h-6 text-shop-btn-dark-blue" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">Total Spent</p>
                                        <h3 className="text-3xl font-bold text-green-600 mt-1">
                                            ${totalSpent.toFixed(2)}
                                        </h3>
                                    </div>
                                    <div className="p-3 bg-green-100 rounded-xl">
                                        <TrendingUp className="w-6 h-6 text-green-600" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">Pending Orders</p>
                                        <h3 className="text-3xl font-bold text-orange-600 mt-1">
                                            {pendingOrders}
                                        </h3>
                                    </div>
                                    <div className="p-3 bg-orange-100 rounded-xl">
                                        <Clock className="w-6 h-6 text-orange-600" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {orders?.length ? (
                    <Card className="w-full shadow-2xl border-0 rounded-3xl overflow-hidden bg-white">
                        <CardHeader className="bg-gradient-to-r from-shop-btn-dark-blue to-shop-royal-blue text-white p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold">Order History</h2>
                                    <p className="text-blue-100 text-sm mt-1">
                                        View all your past and current orders
                                    </p>
                                </div>
                                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                                    <Package className="w-4 h-4" />
                                    <span className="text-sm font-semibold">{totalOrders} Orders</span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <ScrollArea>
                                <Table>
                                    <TableHeader>
                                        <TableRow className="hover:bg-transparent border-b-2 border-gray-200">
                                            <TableHead className="w-[100px] md:w-auto font-bold text-gray-700">
                                                Order Number 
                                            </TableHead>
                                            <TableHead className="hidden md:table-cell font-bold text-gray-700">
                                                Date
                                            </TableHead>
                                            <TableHead className="font-bold text-gray-700">Customer</TableHead>
                                            <TableHead className="hidden md:table-cell font-bold text-gray-700">
                                                Email
                                            </TableHead>
                                            <TableHead className="font-bold text-gray-700">Total</TableHead>
                                            <TableHead className="font-bold text-gray-700">Status</TableHead>
                                            <TableHead className="hidden md:table-cell font-bold text-gray-700">
                                                Invoice Number
                                            </TableHead>
                                            <TableHead className="text-center font-bold text-gray-700">
                                                Action
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <OrdersComponent orders={orders}/>
                                </Table>
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="relative overflow-hidden">
                        {/* Background decorations */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>
                        </div>

                        {/* Empty state card */}
                        <div className="relative bg-white rounded-3xl shadow-2xl p-12 text-center border border-gray-100">
                            {/* Icon with gradient background */}
                            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-full mb-6 relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-shop-btn-dark-blue/10 to-shop-royal-blue/10 rounded-full animate-pulse"></div>
                                <FileX className="h-16 w-16 text-gray-400 relative z-10" />
                            </div>

                            {/* Title */}
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">
                                No Orders Yet
                            </h2>

                            {/* Description */}
                            <p className="mt-2 text-base text-gray-600 max-w-md mx-auto mb-8">
                                It looks like you haven&apos;t placed any orders yet. Start shopping to see your orders here and track your purchases!
                            </p>

                            {/* CTA Button */}
                            <Button 
                                asChild 
                                className="bg-gradient-to-r from-shop-btn-dark-blue to-shop-royal-blue hover:from-shop-royal-blue hover:to-shop-btn-dark-blue text-white font-bold px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                            >
                                <Link href="/shop" className="flex items-center gap-2">
                                    <ShoppingBag className="w-5 h-5" />
                                    Start Shopping Now
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default OrdersPage