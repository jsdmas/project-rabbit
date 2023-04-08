import { createMapper, getStatement } from "mybatis-mapper";
import DBPool from "../helper/DBPool";
import { RuntimeException, BadRequestException } from "../helper/ExceptionHelper";
class ThreadService {

    constructor() {
        createMapper(["./server/mappers/threadMapper.xml"]);
    }
    /** 전체 데이터 수 조회 */
    async getCount() {
        let dbcon = null;
        let postCount = 0;
        try {
            dbcon = await DBPool.getConnection();
            let sql = getStatement('threadMapper', 'selectCountAll');
            let [result] = await dbcon.query(sql);
            if (result.length > 0) {
                postCount = result[0].postCount;
            }
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) { dbcon.release(); }
        }

        return postCount;
    };

    async getList(params) {
        let dbcon = null;
        let data = null;
        try {
            dbcon = await DBPool.getConnection();
            let sql = getStatement("threadMapper", "getThreads", params);
            let [result] = await dbcon.query(sql);
            if (result.length === 0) {
                throw new RuntimeException("조회된 데이터가 없습니다.");
            }
            data = result;
        } catch (error) {
            throw error;
        } finally {
            if (dbcon) { dbcon.release(); }
        }

        return data;
    };

    async getThread(params) {
        let dbcon = null;
        let data = null;
        try {
            dbcon = await DBPool.getConnection();
            let sql = getStatement("threadMapper", "getThread", params);
            let [result] = await dbcon.query(sql);
            if (result.length === 0) {
                throw new RuntimeException("조회된 데이터가 없습니다.");
            }
            data = result;
        } catch (error) {
            throw error;
        } finally {
            if (dbcon) { dbcon.release(); }
        }

        return data;
    };

    async getThreadComment(params) {
        let dbcon = null;
        let data = null;
        try {
            dbcon = await DBPool.getConnection();
            let sql = getStatement("threadMapper", "getThreadComment", params);
            let [result] = await dbcon.query(sql);
            if (result.length === 0) {
                data = [];
            } else {
                data = result;
            }
        } catch (error) {
            throw error;
        } finally {
            if (dbcon) { dbcon.release(); }
        }

        return data;
    };

    async addThread(params) {
        let dbcon = null;
        let data = null;
        try {
            dbcon = await DBPool.getConnection();
            let sql = getStatement("threadMapper", "postThread", params);
            let [{ insertId, affectedRows }] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException('저장된 데이터가 없습니다.');
            }
            data = insertId;
        } catch (error) {
            throw error;
        } finally {
            if (dbcon) { dbcon.release(); }
        }
        return data;
    };

    async deleteThread(params) {
        let dbcon = null;
        try {
            dbcon = await DBPool.getConnection();
            let sql = getStatement("threadMapper", "deleteThreadComment", params);
            let [{ affectedRows }] = await dbcon.query(sql);

            sql = getStatement("threadMapper", "deleteThread", params);
            [{ affectedRows }] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException('삭제된 데이터가 없습니다.');
            }
        } catch (error) {
            throw error;
        } finally {
            if (dbcon) { dbcon.release(); }
        }

    }

    async patchThreadLike(params) {
        let dbcon = null;
        let data = null;
        try {
            dbcon = await DBPool.getConnection();
            let sql = getStatement("threadMapper", "incrementLike", params);
            let [result] = await dbcon.query(sql);
            if (result.affectedRows === 0) {
                throw new BadRequestException();
            }
            data = result;
        } catch (error) {
            throw error;
        } finally {
            if (dbcon) { dbcon.release(); }
        }
        return data;
    };

    async postComment(params) {
        let dbcon = null;
        let data = null;
        try {
            dbcon = await DBPool.getConnection();
            let sql = getStatement("threadMapper", "postComment", params);
            let [result] = await dbcon.query(sql);
            if (result.affectedRows === 0) {
                throw new BadRequestException();
            }
            data = result;
        } catch (error) {
            throw error;
        } finally {
            if (dbcon) { dbcon.release(); }
        }
        return data;
    };

    async deleteComment(params) {
        let dbcon = null;
        let data = null;
        try {
            dbcon = await DBPool.getConnection();
            let sql = getStatement("threadMapper", "deleteComment", params);
            let [result] = await dbcon.query(sql);
            if (result.affectedRows === 0) {
                throw new BadRequestException();
            }
            data = result;
        } catch (error) {
            throw error;
        } finally {
            if (dbcon) { dbcon.release(); }
        }
        return data;
    }

    async patchComment(params) {
        let dbcon = null;
        let data = null;
        try {
            dbcon = await DBPool.getConnection();
            let sql = getStatement("threadMapper", "patchComment", params);
            let [result] = await dbcon.query(sql);
            if (result.affectedRows === 0) {
                throw new BadRequestException();
            }
            data = result;
        } catch (error) {
            throw error;
        } finally {
            if (dbcon) { dbcon.release(); }
        }
        return data;
    }

    async commentLike(params) {
        let dbcon = null;
        let data = null;
        try {
            dbcon = await DBPool.getConnection();
            let sql = getStatement("threadMapper", "commentLike", params);
            let [result] = await dbcon.query(sql);
            if (result.affectedRows === 0) {
                throw new BadRequestException();
            }
            data = result;
        } catch (error) {
            throw error;
        } finally {
            if (dbcon) { dbcon.release(); }
        }
        return data;
    }
}

const threadService = new ThreadService();

export default threadService;