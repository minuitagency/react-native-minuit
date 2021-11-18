export const orderStatus = {
  PENDING: {
    isSuccess: (status) =>
      ["PREPARATION_IN_PROGRESS", "READY_TO_PICKUP", "DELIVERY_IN_PROGRESS", "DELIVERED"].includes(
        status
      ),
  },
  PREPARATION_IN_PROGRESS: {
    isSuccess: (status) =>
      ["READY_TO_PICKUP", "DELIVERY_IN_PROGRESS", "DELIVERED"].includes(status),
  },
  READY_TO_PICKUP: {
    isSuccess: (status) =>
      ["DELIVERY_IN_PROGRESS", "DELIVERED"].includes(status),
  },
  DELIVERY_IN_PROGRESS: {
    isSuccess: (status) => ["DELIVERED"].includes(status),
  },
  DELIVERED: {
    isSuccess: (status) => ["DELIVERED"].includes(status),
  },
  CANCELLED: {
    isSuccess: (status) => [].includes(status),
  },
};
