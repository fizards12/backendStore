import { Services } from '../../services/Services';
const Service = new Services();

it('show method should return the correct order', async () => {
    const result = await Service.getByUser(1);
    expect(result).toEqual([{
        id: 1,
        user_id: "1",
        status: "complete"
    }]);
});