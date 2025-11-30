'use client';

import { useState, useEffect } from 'react';

export interface Order {
  id: string;
  date: string;
  total: number;
  items: Array<{
    name: string;
    brand: string;
    price: number;
    quantity: number;
  }>;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
}

export function useOrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('orderHistory');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save orders to localStorage whenever orders change
  useEffect(() => {
    localStorage.setItem('orderHistory', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (newOrder: Omit<Order, 'id' | 'date' | 'status'>) => {
    const order: Order = {
      ...newOrder,
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString(),
      status: 'pending',
    };
    
    setOrders(prev => [order, ...prev]);
    return order;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  const getTotalSpent = () => {
    return orders.reduce((total, order) => total + order.total, 0);
  };

  const getOrderCount = () => {
    return orders.length;
  };

  return {
    orders,
    addOrder,
    updateOrderStatus,
    getOrderById,
    getTotalSpent,
    getOrderCount,
  };
}
