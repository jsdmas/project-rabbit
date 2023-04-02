import { createMapper, getStatement } from "mybatis-mapper";
import DBPool from "../helper/DBPool";
import { RuntimeException } from "../helper/ExceptionHelper";
class PostService {

    constructor() {
        createMapper(["./server/mappers/postMapper.xml"]);
    }

    async getList(params) {
        let dbcon = null;
        let data = null;
        try {
            dbcon = await DBPool.getConnection();
            let sql = getStatement("postMapper", "getPost", params);
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
    }

    /** 전체 데이터 수 조회 */
    async getCount() {
        let dbcon = null;
        let postCount = 0;
        try {
            dbcon = await DBPool.getConnection();
            let sql = getStatement('postMapper', 'selectCountAll');
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
    }
}

const postService = new PostService();

export default postService;