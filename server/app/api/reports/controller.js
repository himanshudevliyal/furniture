import { StatusCodes } from "http-status-codes";
import table from "../../db/models.js"; // where you export UserModel, OrderModel, etc.

const getDashboardData = async (req, res) => {
  try {
    const users = await table.UserModel.getUserStats(req); // user stats
    const orders = await table.OrderModel.getOrderStats(req); // order stats
    const revenue_by_month = await table.OrderModel.getRevenueByMonth(req);
    const new_users_by_month = await table.UserModel.getNewUsersByMonth(req);
    const orders_trend = await table.OrderModel.getOrdersLast7Days(req);
    const products_by_category =
      await table.ProductModel.getProductByCategory(req);
    const top_books = await table.BookModel.getTopBooks(req);

    res.code(StatusCodes.OK).send({
      status: true,
      data: {
        cards: { users, orders },
        charts: {
          revenue_by_month,
          new_users_by_month,
          orders_trend,
          products_by_category,
          top_books,
        },
      },
    });
  } catch (error) {
    throw error;
  }
};

export default {
  getDashboardData: getDashboardData,
};
