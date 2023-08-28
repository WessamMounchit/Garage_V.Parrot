export const handleModalOpen = (setSelectedItem, setIsUpdateModalOpen, item) => {
  setSelectedItem({ ...item });
  setIsUpdateModalOpen(true);
};