"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoomId = void 0;
const createRoomId = (user1Id, user2Id) => {
    return [user1Id, user2Id].sort().join('-');
};
exports.createRoomId = createRoomId;
