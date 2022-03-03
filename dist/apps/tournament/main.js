(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./apps/tournament/src/app.ts":
/*!************************************!*\
  !*** ./apps/tournament/src/app.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express = __webpack_require__(/*! express */ "express");
const tournament_api_1 = __webpack_require__(/*! ./app/api/tournament-api */ "./apps/tournament/src/app/api/tournament-api.ts");
const bodyParser = __webpack_require__(/*! body-parser */ "body-parser");
exports.app = express();
exports.app.use(bodyParser.json());
exports.app.use(bodyParser.urlencoded({ extended: true }));
exports.app.get("/api", (req, res) => {
    res.send({ message: "Welcome to tournament!" });
});
exports.app.post("/api/tournaments", tournament_api_1.postTournament);
exports.app.get("/api/tournaments/:id", tournament_api_1.getTournament);
// app.delete("/api/tournaments/:id", deleteTournament);


/***/ }),

/***/ "./apps/tournament/src/app/api/tournament-api.ts":
/*!*******************************************************!*\
  !*** ./apps/tournament/src/app/api/tournament-api.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getTournament = exports.postTournament = void 0;
const tournament_repository_1 = __webpack_require__(/*! ../repository/tournament-repository */ "./apps/tournament/src/app/repository/tournament-repository.ts");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const tournamentRepository = new tournament_repository_1.TournamentRepository();
const postTournament = (req, res) => {
    const tournamentToAdd = req.body;
    if (tournamentToAdd.name == undefined || tournamentToAdd.name == "") {
        res.status(400);
        res.send({ error: "le champ nom est manquant ou vide" });
    }
    else if (tournamentRepository.tournamentExist(tournamentToAdd.name)) {
        res.status(400);
        res.send({ error: "le nom est déjà pris" });
    }
    else {
        const tournament = {
            id: uuid_1.v4(),
            name: tournamentToAdd.name,
            phases: [],
            participants: [],
        };
        tournamentRepository.saveTournament(tournament);
        res.status(201);
        res.send({ id: tournament.id });
    }
};
exports.postTournament = postTournament;
const getTournament = (req, res) => {
    const id = req.params["id"];
    const tournament = tournamentRepository.getTournament(id);
    res.status(200);
    res.send(tournament);
};
exports.getTournament = getTournament;
// export const deleteTournament = (req: Request, res: Response) => {
//   const id = req.params["id"];
//   const tournament = tournamentRepository.deleteTournament(id);
//   res.status(200);
//   res.send({ id: id });
// };


/***/ }),

/***/ "./apps/tournament/src/app/repository/tournament-repository.ts":
/*!*********************************************************************!*\
  !*** ./apps/tournament/src/app/repository/tournament-repository.ts ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentRepository = void 0;
class TournamentRepository {
    constructor() {
        this.tournaments = new Map();
        // public deleteTournament(tournamentId: string): void {
        //   this.tournaments.delete(tournamentId);
        // }
    }
    saveTournament(tournament) {
        this.tournaments.set(tournament.id, tournament);
    }
    getTournament(tournamentId) {
        return this.tournaments.get(tournamentId);
    }
    tournamentExist(tournamentName) {
        for (let [key, value] of this.tournaments) {
            if (value.name == tournamentName) {
                return true;
            }
        }
        return false;
    }
}
exports.TournamentRepository = TournamentRepository;


/***/ }),

/***/ "./apps/tournament/src/main.ts":
/*!*************************************!*\
  !*** ./apps/tournament/src/main.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __webpack_require__(/*! ./app */ "./apps/tournament/src/app.ts");
const port = process.env.port || 3333;
const server = app_1.app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);


/***/ }),

/***/ 0:
/*!*******************************************!*\
  !*** multi ./apps/tournament/src/main.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/notitou/Bureau/Ynov/api-tournament/apps/tournament/src/main.ts */"./apps/tournament/src/main.ts");


/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ })

/******/ })));
//# sourceMappingURL=main.js.map