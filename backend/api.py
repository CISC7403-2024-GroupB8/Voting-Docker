from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import psycopg2
import logging
import time

# 配置日志记录
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def get_db_connection():
    conn = psycopg2.connect(
        # host="localhost",
        # 以docker-compose中配置的數據庫命名為host
        host="postgres_db",
        database="voting_system",
        user="voter",
        password="12345678",
    )
    return conn


app = Flask(__name__)
CORS(app)


# print 所有 votes 表中的數據
def fetch_data():
    # 獲取數據庫連接
    conn = get_db_connection()
    cur = conn.cursor()

    # 執行查詢語句
    cur.execute("SELECT * FROM votes;")

    # 獲取所有結果
    rows = cur.fetchall()

    # 打印結果
    for row in rows:
        print(row)

    # 關閉游標和連接
    cur.close()
    conn.close()


@app.route("/")
def home():
    return "Welcome to the Voting API!"


@app.route("/vote", methods=["POST"])
def vote():
    data = request.get_json()
    option = data["option"]  # 获取投票选项（'cats'或'dogs'等）

    # 连接数据库并更新投票数据
    # votes 是初始化的表
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "UPDATE votes SET vote_number = vote_number + 1, last_vote = NOW() WHERE name = %s",
        (option,),
    )
    conn.commit()

    # 记录投票日志
    logger.info(f"Vote received for {option} at {time.strftime('%Y-%m-%d %H:%M:%S')}")

    cur.close()
    conn.close()

    return jsonify({"message": "Vote successfully recorded."})


@app.route("/results", methods=["GET"])
def get_results():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM votes;")
    results = cur.fetchall()
    cur.close()
    conn.close()

    total_votes = sum(row[1] for row in results)
    result_data = []
    for row in results:
        option_name = row[0]
        vote_number = row[1]
        percentage = (vote_number / total_votes) * 100 if total_votes > 0 else 0
        last_vote = row[2]
        result_data.append(
            {
                "option": option_name,
                "vote_number": vote_number,
                "percentage": percentage,
                "last_vote": last_vote,
            }
        )

    print("result_data:", result_data)
    return jsonify(result_data)


if __name__ == "__main__":
    # print("啟動API服務器中...")
    app.run(host="0.0.0.0", port=8000, debug=False)
