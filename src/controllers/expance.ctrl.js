const query = require("../utils/query");
const jwt = require("../utils/jwt");
var md5 = require("md5");
class ExpanceController {
  welcomeExpance = async (req, res) => {
    res.send("Wellcome to Expance App");
  };

  signupfunc = async (req, res) => {
    try {
      const UserDbModel = req.User;
      const data = req.body;
      delete data.confirm
      data.password = md5(data.password)
      const resultdata = await query.insertdata(UserDbModel, data);
      res.json({ status: 200, message: "Signup successfully", resultdata });
    } catch (error) {
      res.json({ message: error });

    }
  };
  loginFunc = async (req, res) => {
    try {
      const UserDbModel = req.User;
      const data = req.body;
      delete data.confirm
      data.password = md5(data.password)
      let resultdata = await query.findOne(UserDbModel, data);
      const token = await jwt.jwtTokenCreate(resultdata)
      let resData = {
        user_id: resultdata._id,
        name: resultdata.name,
        email: resultdata.email,
        token: token
      }
      res.json({ status: 200, message: "login successfully", data: resData });
    } catch (error) {
      res.json({ message: error });

    }
  };
  addCategoryFunc = async (req, res) => {
    try {
      const CategoryDbModel = req.Category;
      const data = req.body;
      const resultdata = await query.insertdata(CategoryDbModel, data);
      res.json({ status: 200, message: "Category Added successfully", resultdata });
    } catch (error) {
      res.json({ message: error });

    }
  };
  getCategoryFunc = async (req, res) => {
    try {
      const CategoryDbModel = req.Category;
      const resultdata = await query.find(CategoryDbModel, {});
      res.json({ status: 200, data: resultdata });
    } catch (error) {
      res.json({ message: error });

    }
  };
  addExpanseFunc = async (req, res) => {
    try {
      const ExpanseDbModel = req.Expanse;
      const data = req.body;
      data.createdAt = new Date()
      const resultdata = await query.insertdata(ExpanseDbModel, data);
      res.json({ status: 200, message: "Expanse Added successfully", resultdata });
    } catch (error) {
      res.json({ message: error });

    }
  };
  getExpanseFunc = async (req, res) => {
    try {
      const ExpanseDbModel = req.Expanse;
      const data = req.body;
      let filterQuery = {}
      if (data.startDate) {
        filterQuery['createdAt'] = {
          $gte: new Date(data.startDate),
          $lt: new Date(data.endDate)
        }

      }
      const resultdata = await query.findViaAggregate(ExpanseDbModel, data, filterQuery);
      res.json({ status: 200, data: resultdata });
    } catch (error) {
      res.json({ message: error });

    }
  };
}
const expanceCtrl = new ExpanceController();
module.exports = expanceCtrl;