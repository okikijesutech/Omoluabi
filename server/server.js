"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const openai_1 = __importDefault(require("openai"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY || "",
});
app.post("/api/generate-text", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { prompt } = req.body; // Explicitly type the request body
    try {
        const response = yield openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Use a supported model
            messages: [{ role: "user", content: prompt }], // Update to match the expected format
            max_tokens: 100,
            temperature: 0.7,
        });
        res.json({ text: (_b = (_a = response.choices[0].message) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.trim() }); // Adjust to match the response format of the new model
    }
    catch (error) {
        console.error("Error generating text:", error); // Add logging for debugging
        res.status(500).json({ error: "Failed to fetch the meaning" });
    }
}));
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
