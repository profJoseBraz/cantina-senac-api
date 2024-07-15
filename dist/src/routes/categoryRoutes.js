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
import { addCategory, getAllCategories, getCategoriesById, getCategoriesByName } from '../controllers/CategoryController.js';
import { createNewConnection } from '../database/Db.js';
const router = express.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        if (Object.keys(query).length === 0) {
            return getAllCategories(req, res, yield createNewConnection());
        }
        if (query.id) {
            return getCategoriesById(req, res, yield createNewConnection());
        }
        else if (query.name) {
            return getCategoriesByName(req, res, yield createNewConnection());
        }
        throw new Error(`Bad Request`);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ Message: err.message });
    }
}));
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return addCategory(req, res, yield createNewConnection()); }));
export default router;
