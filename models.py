from flask_login import UserMixin

class User(UserMixin):
	def __init__(self, id, username, password):
		self.id = id
		self.username = username
		self.password = password

class Daycation():
	def __init__(self, id, img, name, price, occup, text1, text2, times, food, wine):
		self.id = id
		self.img = img
		self.name = name
		self.price = price
		self.occup = occup
		self.text1 = text1
		self.text2 = text2
		self.times = times
		self.food = food
		self.wine = wine
