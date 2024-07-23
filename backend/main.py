import time

def calculate_lps_and_accuracy(text, typed_text, start_time, end_time):
    total_time = end_time - start_time
    lps = len(typed_text) / total_time if total_time > 0 else 0

    correct_chars = sum(1 for a, b in zip(text, typed_text) if a == b)
    accuracy = (correct_chars / len(text)) * 100 if len(text) > 0 else 0

    return lps, accuracy

def main():
    text = "The quick brown fox jumps over the lazy dog"
    print("Type the following text:")
    print(text)
    
    input("Press Enter to start...")
    start_time = time.time()
    
    typed_text = input("Start typing: ")
    end_time = time.time()
    
    lps, accuracy = calculate_lps_and_accuracy(text, typed_text, start_time, end_time)
    
    print(f"Letters per second (LPS): {lps:.2f}")
    print(f"Typing accuracy: {accuracy:.2f}%")

if __name__ == "__main__":
    main()