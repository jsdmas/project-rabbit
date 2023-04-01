import { createMapper, getStatement } from "mybatis-mapper";
import DBPool from "../helper/DBPool";
import { RuntimeException } from "../helper/ExceptionHelper";
class PostService {

    constructor() {
        createMapper(["./server/mappers/postMapper.xml"]);
    }

    async getList(params) {
        console.log(params);
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
}

const postService = new PostService();

export default postService;