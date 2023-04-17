import { createMapper, getStatement } from "mybatis-mapper";
import DBPool from "../helper/DBPool";
import { RuntimeException, BadRequestException } from "../helper/ExceptionHelper";
class ThreadService {

    constructor() {
        createMapper(["./server/mappers/threadMapper.xml"]);
    }
    /** 전체 데이터 수 조회 */
    async getCount(params) {
        let dbcon = null;
        let postCount = 0;
        console.debug("getCount");
        console.log(params);
        try {
            dbcon = await DBPool.getConnection();
            let sql = getStatement('threadMapper', 'selectCountAll', params);
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
        console.debug("getList");
        console.debug(params);
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
        console.debug("getThread");
        console.debug(params);
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
        console.debug("getThreadComment");
        console.debug(params);
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

    async updateThread(params) {
        let dbcon = null;
        let data = null;
        console.debug("updateThread");
        console.debug(params);
        try {
            dbcon = await DBPool.getConnection();
            let sql = getStatement("threadMapper", "updateThread", params);
            let [{ insertId, affectedRows }] = await dbcon.query(sql);
            if (affectedRows === 0) {
                throw new BadRequestException();
            }
            data = insertId;
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
        console.debug("addThread");
        console.debug(params);
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
        let data = null;
        console.debug("Thread Delete");
        console.debug(params);
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
        return data;

    }

    async patchThreadLike(params) {
        let dbcon = null;
        let data = null;
        console.debug("patchThreadLike");
        console.debug(params);
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
        console.debug("postComment");
        console.debug(params);
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
        console.debug("deleteComment");
        console.debug(params);
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
        console.debug("patchComment");
        console.debug(params);
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
        console.debug("commentLike");
        console.debug(params);
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

// 싱긅톤 생성자 변경하기
const threadService = new ThreadService();

export default threadService;