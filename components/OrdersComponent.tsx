"use client"

import React, { useState } from 'react'
import { MY_ORDERS_QUERYResult } from '@/sanity.types'
import { TableBody, TableCell, TableRow } from './ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import PriceFormatter from './PriceFormatter'
import { format } from 'date-fns'
import { Eye, Trash2 } from 'lucide-react'
import OrderDetailDialog from './OrderDetailDialog'
import toast from 'react-hot-toast'

const OrdersComponent = ({orders}:{orders:MY_ORDERS_QUERYResult}) => {
  const [selectedOrder, setSelectedOrder] = useState <MY_ORDERS_QUERYResult[number] | null>(null)
  
  const handleDelete = () => {
    toast.error("Delete method applied for Admin")
  }
  
  return (
    <>
      <TableBody>
        <TooltipProvider>
            {orders.map((order) => (
              <Tooltip key={order?.orderNumber}>
                <TooltipTrigger asChild>
                  <TableRow className="cursor-pointer hover:bg-blue-50 transition-colors duration-150 border-b border-gray-200">
                    <TableCell className="font-semibold text-gray-900">
                      #{order.orderNumber?.slice(-10) ?? "N/A"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-gray-600">
                      {order?.orderDate && format(new Date(order.orderDate), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell className="font-medium text-gray-900">
                      {order.customerName}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-gray-600">
                      {order.email}
                    </TableCell>
                    <TableCell>
                      <PriceFormatter amount={order?.totalPrice} className="text-blue-600 font-bold"/>
                    </TableCell>
                    <TableCell>
                      {order?.status && (
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${
                          order.status === "paid" 
                            ? "bg-green-100 text-green-700 border border-green-200" 
                            : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            order.status === "paid" ? "bg-green-500" : "bg-yellow-500"
                          }`}></span>
                          {order?.status.charAt(0).toUpperCase() + order?.status.slice(1)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-gray-600">
                      {order?.invoice?.number || (
                        <span className="text-gray-400">No invoice</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors duration-150 group"
                          title="View Details"
                        >
                          <Eye size={18} className="text-gray-600 group-hover:text-blue-600 transition-colors" />
                        </button>
                        <button
                          onClick={(event) => {
                            event.stopPropagation()
                            handleDelete()
                          }}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors duration-150 group"
                          title="Delete Order"
                        >
                          <Trash2 size={18} className="text-gray-600 group-hover:text-red-600 transition-colors" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-900 text-white">
                  <p>Click to see order details</p>
                </TooltipContent>
              </Tooltip>
            ))}
        </TooltipProvider>
      </TableBody>
      <OrderDetailDialog order={selectedOrder} isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} />
    </>
  )
}

export default OrdersComponent