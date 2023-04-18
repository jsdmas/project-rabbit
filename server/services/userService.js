import { createMapper, getStatement } from "mybatis-mapper";
import DBPool from "../helper/DBPool";
import { BadRequestException } from "../helper/ExceptionHelper";

class UserService {
    constructor() {
        createMapper(["./server/mappers/userMapper.xml"]);
    }

    async createAcount(params) {
        let dbcon = null;
        let insertId = {};
        console.debug("createAcount");
        console.debug(params);
        try {
            dbcon = await DBPool.getConnection();
            let sql = getStatement("userMapper", "createUser", params);
            let [result] = await dbcon.query(sql);
            if (result.affectedRows === 0) {
                throw new BadRequestException();
            }
            insertId = { user_id: result.insertId };
        } catch (error) {
            throw error
        } finally {
            if (dbcon) { dbcon.release(); }
        }
        return insertId;
    }

    async emailExists(params) {
        let dbcon = null;
        let exists = null;
        console.debug("emailExists");
        console.debug(params);
        try {
            dbcon = await DBPool.getConnection();
            let sql = getStatement("userMapper", "isEmailExists", params);
            let [emailResult] = await dbcon.query(sql);
            if (emailResult.affectedRows === 0) {
                throw new BadRequestException();
            }
            [exists] = Object.values(emailResult[0]);
        } catch (error) {
            throw error
        } finally {
            if (dbcon) { dbcon.release(); }
        }
        return Boolean(exists);
    }

    async userExists(params) {
        let dbcon = null;
        let data = null;
        console.debug("userExists");
        console.debug(params);
        try {
            dbcon = await DBPool.getConnection();
            let sql = getStatement("userMapper", "userExists", params);
            let [result] = await dbcon.query(sql);
            if (result.affectedRows === 0) {
                throw new BadRequestException();
            }
            data = result[0];
        } catch (error) {
            throw error
        } finally {
            if (dbcon) { dbcon.release(); }
        }

        return data;
    }

    async userExistsSNSId(params) {
        let dbcon = null;
        let data = null;
        console.debug("userExistsSNSId");
        console.debug(params);
        try {
            dbcon = await DBPool.getConnection();
            let sql = getStatement("userMapper", "userExistsSNSId", params);
            let [result] = await dbcon.query(sql);
            if (result.affectedRows === 0) {
                throw new BadRequestException();
            }

            data = result[0];
        } catch (error) {
            throw error
        } finally {
            if (dbcon) { dbcon.release(); }
        }

        return data;
    }

    async userInfo(params) {
        let dbcon = null;
        let data = null;
        console.debug("userInfo");
        console.debug(params);
        try {
            dbcon = await DBPool.getConnection();
            let sql = getStatement("userMapper", "userInfo", params);
            let [result] = await dbcon.query(sql);
            if (result.affectedRows === 0) {
                throw new BadRequestException();
            }
            data = result[0];
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