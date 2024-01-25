export const createRoomId = (user1Id: string, user2Id: string): string => {
    return [user1Id, user2Id].sort().join('-');
}