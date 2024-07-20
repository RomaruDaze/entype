import time
import random

def generate_random_word():
    words = ["apple", "banana", "orange", "grape", "strawberry", "blueberry",
             "kiwi", "mango", "peach", "pineapple", "watermelon", "cherry",
             "pear", "plum", "apricot", "blackberry", "raspberry", "cantaloupe"]
    
    # ランダムな単語を選択
    return random.choice(words)

def calculate_typing_speed():
    input("準備ができたらEnterキーを押してください...")

    # 開始時刻を記録
    start_time = time.time()
    elapsed_time = 0
    correct_entries = 0
    
    while elapsed_time < 60:  # 1分間のタイピング練習
        # ランダムな単語を生成
        target_word = generate_random_word()
        print(f"以下の単語をできるだけ早く入力してください:\n{target_word}")

        user_input = ""
        word_start_time = time.time()

        while user_input != target_word and elapsed_time < 60:
            user_input = input("単語を入力してください: ")
            word_end_time = time.time()
            elapsed_time = word_end_time - start_time

            if user_input == target_word:
                print("正しく入力されました。")
                correct_entries += 1
            else:
                print("入力が正しくありません。もう一度試してください。")

            elapsed_time = word_end_time - start_time

        if elapsed_time >= 60:
            break

    # 1分間での正しい入力数を表示
    print(f"1分間で正しく入力された単語の数: {correct_entries}")

calculate_typing_speed()