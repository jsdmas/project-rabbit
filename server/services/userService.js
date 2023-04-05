import { createMapper, getStatement } from "mybatis-mapper";
import DBPool from "../helper/DBPool";

class UserService {
    constructor() {
        createMapper(["./server/mappers/userMapper.xml"]);
    }


};

const userService = new UserService();

export default userService;