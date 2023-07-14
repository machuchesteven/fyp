def verify_digits_presence(text):
    num_digits = sum(1 for char in text if char.isdigit())
    num_letters = sum(1 for char in text if char.isalpha())
    if num_digits >= 3 and num_letters >= 2:
        return True
    return False


def first_dig_position(text):
    first_digit = text.find(next(char for char in text if char.isdigit()))
    return first_digit_pos


def last_dig_position(text):
    last_digit_pos = (
        len(text)
        - text[::-1].find(next(char for char in text[::-1] if char.isdigit()))
        - 1
    )
    return last_digit_pos


def fist_letter_position(text):
    if str(text[0:2]).upper() == "MC":
        text = text[2:]
    first_letter_pos = text.find(next(char for char in text if char.isalpha()))
    return first_letter_pos

def last_letter_position(text):
    last_letter_pos = (
    len(text)
        - text[::-1].find(next(char for char in text[::-1] if char.isalpha()))
        - 1
    )
    return last_letter_pos

def refine_num_plate(text):
    if verify_digits_presence(text):
        first_dig_pos = first_dig_position(text)
        last_dig_pos = last_dig_position(text)
        first_letter_pos = fist_letter_position(text)
        if first_letter_pos < first_dig_pos:
            first_char = first_letter_pos
        else:
            first_char = first_dig_pos
        return text[first_char:]
    return False

 
