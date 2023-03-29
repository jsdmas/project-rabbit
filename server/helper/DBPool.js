import { createPool } from "mysql2/promise";
import logger from "./LogHelper";

class DBPool {
    static #current = null;

    /**
     * @description DBPool 구성 정보
     * @property {string} host MYSQL 서버 주소 (다른 PC인 경우 IP 주소)
     * @property {number} port MYSQL 포트번호
     * @property {string} user MYSQL의 로그인 할 수 있는 계정이름
     * @property {string} password 비밀번호
     * @property {string} database 사용하고자 하는 데이터베이스 이름
     * @property {number} connectionLimit 최대 커넥션 수
     * @property {number} connectTimeout 커넥션 타임아웃
     * @property {boolean} waitForConnections 커넥션 풀이 다 찬 경우 처리
     */
    static connectionInfo = {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_SCHEMA,
        connectionLimit: process.env.DATABASE_CONNECTION_LIMIT,
        connectTimeout: process.env.DATABASE_CONNECT_TIMEOUT,
        waitForConnections: process.env.DATABASE_WAIT_FOR_CONNECTIONS
    };

    static getInstance() {
        if (DBPool.#current === null) {
            DBPool.#current = new DBPool();
        }
        return DBPool.#current;
    }

    constructor() {
        this.pool = createPool(DBPool.connectionInfo);

        this.pool.on('connection', (connection) => {
            const { threadId } = connection;
            logger.info(` >> DB접속 [threadId=${threadId}]`);
            const oldQuery = connection.query;

            // db query요청을 가로채고 log기록 후 SQL을 수행하도록 재정의
            connection.query = (...args) => {
                // arguments 객체는 배열이 아니기 때문에 Array객체의 slice() 같은 배열의 메소드를 사용할 수 없으나 apply() 메소드를 이용하면 가능하다.
                const queryCmd = oldQuery.apply(connection, args);
                // apply를 사용해 인자 배열을 받아 아래와 같이 가공한 후 log로 저장.
                logger.debug(queryCmd.sql.trim().replace(/\n/g, " ").replace(/ +(?= )/g, " "));
                return queryCmd;
            }
        });

        this.pool.on('acquire', (connection) => {
            logger.info(` >> Connection 임대됨 [threaId=${connection.threadId}]`);
        });

        this.pool.on('release', (connection) => {
            logger.info(` >> Connection 반납됨 [threaId=${connection.threadId}]`);
        });
    }

    /** Connection Pool에서 하나의 데이터베이스 접속 객체를 임대합니다. */
    async getConnection() {
        let dbcon = null;
        try {
            dbcon = await this.pool.getConnection();
        } catch (error) {
            if (dbcon) { dbcon.release(); }
            logger.error(error);
            throw error;
        }
        return dbcon;
    }

    close() {
        this.pool.end();
    }
}

export default DBPool.getInstance();