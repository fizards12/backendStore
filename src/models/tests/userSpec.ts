import { userOperations } from '../users';


const users = new userOperations();

describe("Users", () => {
  describe("Check defined", () => {
    it('should have an index method', () => {
      expect(users.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(users.read).toBeDefined();
    });

    it('should have a create method', () => {
      expect(users.create).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(users.delete).toBeDefined();
    });
  })

  describe("Check worked correct", () => {
    it('create method should add a user', async () => {
      const result = await users.create({
        first_name: 'Ahmed',
        last_name: 'Sameh',
        password: '164253'
      });
      expect(result).toEqual([{
        id: 1,
        first_name: 'Ahmed',
        last_name: 'Sameh',
        password: '164253'
      }]);
    });

    it('index method should return a list of users', async () => {
      const result = await users.index();
      expect(result).toEqual([{
        id: 1,
        first_name: 'Ahmed',
        last_name: 'Sameh',
        password: '164253'
      }]);
    });

    it('show method should return the correct user', async () => {
      const result = await users.read(1);
      expect(result).toEqual([{
        id: 1,
        first_name: 'Ahmed',
        last_name: 'Sameh',
        password: '164253'
      }]);
    });
    
    xit('delete method should remove the user', async () => {
      await users.delete(1);
      const result = await users.index();
      expect(result).toEqual([]);
    });
  });
  
  afterAll((done) => {
    done();
  });
});