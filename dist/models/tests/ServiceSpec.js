"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Services_1 = require("../../services/Services");
const Service = new Services_1.Services();
it('show method should return the correct order', async () => {
    const result = await Service.getByUser(1);
    expect(result).toEqual([{
            id: 1,
            user_id: "1",
            status: "complete"
        }]);
});
