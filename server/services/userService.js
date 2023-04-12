import { createMapper, getStatement } from "mybatis-mapper";
import DBPool from "../helper/DBPool";
import { BadRequestException } from "../helper/ExceptionHelper";

class UserService {
    constructor() {
        createMapper(["./server/mappers/userMapper.xml"]);
    }

    async createAcount(params) {
        let dbcon = null;
        let data = null;
        let exists = null;
        console.debug("createAcount");
        console.debug(params);
        try {
            dbcon = await DBPool.getConnection();
            let sql = getStatement("userMapper", "isEmailExists", params);
            let [emailResult] = await dbcon.query(sql);
            if (emailResult.affectedRows === 0) {
                throw new BadRequestException();
            }

            [exists] = Object.values(emailResult[0]);

            if (Boolean(exists)) {
                throw new BadRequestException(409, "이미 사용중인 이메일입니다.");
            }

            sql = getStatement("userMapper", "createUser", params);
            let [result] = await dbcon.query(sql);
            if (result.affectedRows === 0) {
                throw new BadRequestException();
            }

        } catch (error) {
            throw error
        } finally {
            if (dbcon) { dbcon.release(); }
        }
        return data;
    }

};

const userService = new UserService();

export default userService;