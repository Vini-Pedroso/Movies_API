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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var client_1 = require("@prisma/client");
var app = express();
var prisma = new client_1.PrismaClient();
app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.json({ message: "Hello World" });
        return [2 /*return*/];
    });
}); });
// Rotas para usuários
// GET geral de usuários
app.get("/users", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.user.findMany()];
            case 1:
                users = _a.sent();
                res.json(users);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(500).json({ error: 'Erro ao recuperar os usuários' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET específico de usuário
app.get("/users/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { id: id.toString() }
                    })];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ error: 'Usuário não encontrado' })];
                }
                res.json(user);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(500).json({ error: 'Erro ao recuperar o usuário' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// POST de usuário
app.post("/users", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, user, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.user.create({
                        data: {
                            name: name,
                            email: email,
                        },
                    })];
            case 2:
                user = _b.sent();
                res.status(201).json(user);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                console.error(error_3);
                res.status(500).json({ error: 'Erro ao criar o usuário' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// DELETE de usuário
app.delete("/users/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.user.delete({
                        where: { id: id.toString() }
                    })];
            case 2:
                _a.sent();
                res.status(204).end();
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.error(error_4);
                res.status(500).json({ error: 'Erro ao excluir o usuário' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Rotas para filmes
// GET geral de filmes
app.get("/movies", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var movies, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.movie.findMany()];
            case 1:
                movies = _a.sent();
                res.json(movies);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error(error_5);
                res.status(500).json({ error: 'Erro ao recuperar os filmes' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET específico de filme
app.get("/movies/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, movie, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.movie.findUnique({
                        where: { id: id.toString() }
                    })];
            case 2:
                movie = _a.sent();
                if (!movie) {
                    return [2 /*return*/, res.status(404).json({ error: 'Filme não encontrado' })];
                }
                res.json(movie);
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.error(error_6);
                res.status(500).json({ error: 'Erro ao recuperar o filme' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// POST de filme
app.post("/movies", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, year, description, movie, error_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, year = _a.year, description = _a.description;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.movie.create({
                        data: {
                            title: title,
                            year: year,
                            description: description,
                        },
                    })];
            case 2:
                movie = _b.sent();
                res.status(201).json(movie);
                return [3 /*break*/, 4];
            case 3:
                error_7 = _b.sent();
                console.error(error_7);
                res.status(500).json({ error: 'Erro ao criar o filme' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// DELETE de filme
app.delete("/movies/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.movie.delete({
                        where: { id: id.toString() }
                    })];
            case 2:
                _a.sent();
                res.status(204).end();
                return [3 /*break*/, 4];
            case 3:
                error_8 = _a.sent();
                console.error(error_8);
                res.status(500).json({ error: 'Erro ao excluir o filme' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Rotas para avaliações (reviews)
// GET geral de avaliações
app.get("/reviews", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reviews, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.review.findMany()];
            case 1:
                reviews = _a.sent();
                res.json(reviews);
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                console.error(error_9);
                res.status(500).json({ error: 'Erro ao recuperar as avaliações' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET específico de avaliação
app.get("/reviews/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, review, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.review.findUnique({
                        where: { id: id.toString() }
                    })];
            case 2:
                review = _a.sent();
                if (!review) {
                    return [2 /*return*/, res.status(404).json({ error: 'Avaliação não encontrada' })];
                }
                res.json(review);
                return [3 /*break*/, 4];
            case 3:
                error_10 = _a.sent();
                console.error(error_10);
                res.status(500).json({ error: 'Erro ao recuperar a avaliação' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// POST de avaliação
app.post("/reviews", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, rating, comment, userId, movieId, review, error_11;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, rating = _a.rating, comment = _a.comment, userId = _a.userId, movieId = _a.movieId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.review.create({
                        data: {
                            rating: rating,
                            comment: comment,
                            userId: userId,
                            movieId: movieId,
                        },
                    })];
            case 2:
                review = _b.sent();
                res.status(201).json(review);
                return [3 /*break*/, 4];
            case 3:
                error_11 = _b.sent();
                console.error(error_11);
                res.status(500).json({ error: 'Erro ao criar a avaliação' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// DELETE de avaliação
app.delete("/reviews/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.review.delete({
                        where: { id: id.toString() }
                    })];
            case 2:
                _a.sent();
                res.status(204).end();
                return [3 /*break*/, 4];
            case 3:
                error_12 = _a.sent();
                console.error(error_12);
                res.status(500).json({ error: 'Erro ao excluir a avaliação' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.listen(3334, function () { return console.log("Server running on port 3334"); });
