from random import randint
import json
import sys

protein = ['Yogurt (1 cup)', 'Cooked meat (85g)', 'Cooked fish (100g)',
           '1 whole egg + 4 egg whites', 'Tofu (125g)']
fruit = ['Berries (80g)', 'Apple', 'Orange', 'Banana',
         'Dried Fruit (Handful)', 'Fruit Juice (125ml)']
vegetable = ['Any vegetable (80g)', 'Leafy greens (Any Amount)']
grains = ['Cooked Grain (150g)', 'Whole Grain Bread (1 slice)',
          'Half Large Potato (75g)', 'Oats (250g)', '2 corn tortillas']
protein_snack = ['Soy nuts (30g)', 'Low fat milk (250ml)', 'Hummus (4 Tbsp)',
                 'Cottage cheese (125g)', 'Flavored yogurt (125g)']
taste_enhancer = ['2 TSP (10 ml) olive oil', '2 TBSP (30g) reduced-calorie salad dressing', '1/4 medium avocado',
                  'Small handful of nuts', '1/2 ounce  grated Parmesan cheese', '1 TBSP (20g) jam, jelly, honey, syrup, sugar']
tdee = 0


def calc_tdee(weight, height, age, gender, phys_act):
    if gender == 'Female':
        bmr = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age)
    elif gender == 'Male':
        bmr = 66 + (13.7 * weight) + (5 * height) - (6.8 * age)
    global tdee

    if phys_act == '1':
        tdee = bmr*1.2
    elif phys_act == '2':
        tdee = bmr*1.375
    elif phys_act == '3':
        tdee = bmr*1.55
    elif phys_act == '4':
        tdee = bmr*1.735
    elif phys_act == '5':
        tdee = bmr*1.9
    return tdee


food_dict = {
    "breakfast": {
        "protein": "",
        "fruit": "",
        "grains": ""
    },
    "snack1": {
        "snack": ""
    },
    "lunch": {
        "protein": "",
        "vegetable": "",
        "vegetable2": "",
        "taste_enhancer": "",
        "grains": "",
        "fruit": "",
        "protein2": "",
        "vegetable3": ""
    },
    "snack2": {
        "snack": "",
        "vegetable": ""
    },
    "dinner": {
        "protein": "",
        "vegetable1": "",
        "vegetable2": "",
        "grains": "",
        "taste_enhancer": "",
        "protein2": "",
        "grains2": "",
        "taste_enhancer2": ""
    }
}


def bfcalc(tdee):
    breakfast = food_dict["breakfast"]
    breakfast["protein"] = protein[randint(0, len(protein)-1)]
    breakfast["fruit"] = fruit[randint(0, len(fruit)-1)]

    if tdee >= 2200:
        breakfast["grains"] = grains[randint(0, len(grains)-1)]


def s1calc(tdee):
    snack1 = food_dict["snack1"]
    if tdee >= 1800:
        snack1["snack"] = protein_snack[randint(0, len(protein_snack)-1)]
    else:
        snack1["snack"] = ""


def lcalc(tdee):
    lunch = food_dict["lunch"]
    lunch["protein"] = protein[randint(0, len(protein)-1)]
    lunch["vegetable"] = vegetable[randint(0, len(vegetable)-1)]
    lunch["vegetable2"] = "Leafy greens"
    lunch["taste_enhancer"] = taste_enhancer[randint(0, len(taste_enhancer)-1)]
    lunch["grains"] = grains[randint(0, len(grains)-1)]

    if(tdee >= 1500):
        lunch["fruit"] = fruit[randint(0, len(fruit)-1)]

    if(tdee >= 1800):
        lunch["protein2"] = protein[randint(0, len(protein)-1)]
        lunch["vegetable3"] = vegetable[randint(0, len(vegetable)-1)]


def s2calc(tdee):
    snack2 = food_dict["snack2"]
    snack2["snack"] = protein_snack[randint(0, len(protein_snack)-1)]
    snack2["vegetable"] = vegetable[randint(0, len(vegetable)-1)]


def dcalc(tdee):
    dinner = food_dict["dinner"]
    dinner["protein"] = protein[randint(0, len(protein)-1)]
    dinner["vegetable1"] = "2 vegetables 80g"
    dinner["vegetable2"] = "Leafy Greens"
    dinner["grains"] = grains[randint(0, len(grains)-1)]
    dinner["taste_enhancer"] = taste_enhancer[randint(
        0, len(taste_enhancer)-1)]
    if tdee >= 1500:
        dinner["protein2"] = protein[randint(0, len(protein)-1)]
    if tdee >= 2200:
        dinner["grains2"] = grains[randint(0, len(grains)-1)]
        dinner["taste_enhancer2"] = taste_enhancer[randint(
            0, len(taste_enhancer)-1)]


def generate_plan(weight, height, age, gender, phys_act):
    var = calc_tdee(weight, height, age, gender, phys_act)
    
    bfcalc(var) # generate breakfast
    s1calc(var) # generate snack 1
    lcalc(var) # generate lunch
    s2calc(var) # generate snack 2
    dcalc(var) # generate dinner

    return food_dict


weight = sys.argv[1]
height = sys.argv[2]
age = sys.argv[3]
gender = sys.argv[4]
phys_act = sys.argv[5]

plan = generate_plan(int(weight), int(height), int(age), gender, int(phys_act))
print(json.dumps(plan))

# x = generate_plan(70, 190, 9, 'Male', 4)
# print(json.dumps(x, indent=4, sort_keys=True))


# Input for the generate_plan function:
# weight: weight in kg
# height: height in cm
# age: age in years
# gender: Male or Female
# phys_act: 1,2,3,4,5
# for reference:
# 1 = Sedentary (little or no exercise)
# 2 = Lightly active (1-3 days/week)
# 3 = Moderately active (3-5 days/week)
# 4 = Very active (6-7 days/week)
# 5 = Super active (twice/day)

# Output:
# [breakfast, snack1, lunch, snack2, dinner]
