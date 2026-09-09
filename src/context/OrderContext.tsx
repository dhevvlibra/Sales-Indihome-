import React, { createContext, useContext, useState } from 'react';

export interface SelectedPackageForOrder {
  packageName: string;
  speed: string;
  price: string;
  categoryLabel?: string;
  customNote?: string;
  upspeedInfo?: string;
}

interface OrderContextType {
  isModalOpen: boolean;
  selectedPackage: SelectedPackageForOrder | null;
  openOrderModal: (pkg: SelectedPackageForOrder) => void;
  closeOrderModal: () => void;
}

const OrderContext = createContext<OrderContextType>({
  isModalOpen: false,
  selectedPackage: null,
  openOrderModal: () => {},
  closeOrderModal: () => {},
});

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<SelectedPackageForOrder | null>(null);

  const openOrderModal = (pkg: SelectedPackageForOrder) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsModalOpen(false);
  };

  return (
    <OrderContext.Provider
      value={{
        isModalOpen,
        selectedPackage,
        openOrderModal,
        closeOrderModal,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderModal = () => useContext(OrderContext);
