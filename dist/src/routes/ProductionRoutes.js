var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { getAllProduction, getProductionById, getProductionByProductId, getProductionByDate, getProductionByAmount, getProductionByProductCategoryId, addProduction, getProductionByProductCategoryName, getProductionByProductName } from '../controllers/ProductionController.js';
import { createNewConnection } from '../database/Db.js';
const router = express.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        if (Object.keys(query).length === 0) {
            return getAllProduction(req, res, yield createNewConnection());
        }
        if (query.id) {
            return getProductionById(req, res, yield createNewConnection());
        }
        else if (query.productId) {
            return getProductionByProductId(req, res, yield createNewConnection());
        }
        else if (query.date) {
            return getProductionByDate(req, res, yield createNewConnection());
        }
        else if (query.amount) {
            return getProductionByAmount(req, res, yield createNewConnection());
        }
        throw new Error(`Bad Request`);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ Message: err.message });
    }
}));
router.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        if (query.name) {
            return getProductionByProductName(req, res, yield createNewConnection());
        }
        else if (query.categoryId) {
            return getProductionByProductCategoryId(req, res, yield createNewConnection());
        }
        throw new Error(`Bad Request`);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ Message: err.message });
    }
}));
router.get("/products/category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        if (query.name) {
            return getProductionByProductCategoryName(req, res, yield createNewConnection());
        }
        throw new Error(`Bad Request`);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ Message: err.message });
    }
}));
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return addProduction(req, res, yield createNewConnection()); }));
export default router;
