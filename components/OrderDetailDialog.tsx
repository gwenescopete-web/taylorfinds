import { MY_ORDERS_QUERYResult } from '@/sanity.types'
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import PriceFormatter from './PriceFormatter'
import { Package, Calendar, Mail, User, FileText, Download } from 'lucide-react'

interface OrderDetailDialogProps {
  order: MY_ORDERS_QUERYResult[number] | null
  isOpen: boolean
  onClose: () => void
}

const OrderDetailDialog: React.FC<OrderDetailDialogProps> = ({order, isOpen, onClose}) => {
  if(!order) return null
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="w-6 h-6 text-blue-600" />
            Order Details
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">Order #{order?.orderNumber}</p>
        </DialogHeader>

        {/* Customer Information Card */}
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 border border-blue-100 space-y-3">
          <h3 className="font-semibold text-gray-900 mb-4 text-lg">Customer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Customer Name</p>
                <p className="font-medium text-gray-900">{order.customerName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{order.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Order Date</p>
                <p className="font-medium text-gray-900">
                  {order.orderDate && new Date(order.orderDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 capitalize">
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          {order?.invoice && (
            <div className="pt-4 border-t mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-600">
                    Invoice: <span className="font-medium text-gray-900">{order?.invoice?.number}</span>
                  </span>
                </div>
                {order?.invoice?.hosted_invoice_url && (
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href={order.invoice.hosted_invoice_url} target="_blank" className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Invoice
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 border-b">
            <h3 className="font-semibold text-gray-900">Order Items</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Product</TableHead>
                <TableHead className="font-semibold text-center">Quantity</TableHead>
                <TableHead className="font-semibold text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.products?.map((product, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="flex items-center gap-3">
                    {product?.product?.images && (
                      <div className="w-14 h-14 rounded-lg overflow-hidden border-2 border-gray-200 flex-shrink-0">
                        <Image 
                          src={urlFor(product?.product?.images[0]).url()} 
                          alt="productImage" 
                          width={56} 
                          height={56} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <span className="font-medium text-gray-900">{product?.product?.name}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                      {product?.quantity}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <PriceFormatter amount={product?.product?.price} className="text-gray-900 font-semibold" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Order Summary */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
          <div className="space-y-3 max-w-sm ml-auto">
            {order?.amountDiscount !== 0 && (
              <>
                <div className="flex items-center justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <PriceFormatter 
                    amount={(order?.totalPrice as number) + (order?.amountDiscount as number)} 
                    className="font-medium"
                  />
                </div>
                <div className="flex items-center justify-between text-green-600">
                  <span>Discount:</span>
                  <PriceFormatter 
                    amount={order?.amountDiscount} 
                    className="font-medium"
                  />
                </div>
                <div className="border-t pt-3"></div>
              </>
            )}
            <div className="flex items-center justify-between text-lg">
              <span className="font-bold text-gray-900">Total:</span>
              <PriceFormatter 
                amount={order?.totalPrice} 
                className="text-blue-600 font-bold text-xl"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default OrderDetailDialog