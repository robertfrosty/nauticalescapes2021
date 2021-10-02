import os
import re
import requests, json
import smtplib
from datetime import date
from flask_mysqldb import MySQL
from flask import Blueprint, render_template, url_for, redirect, request, flash, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename

from models import User, Daycation

from charterboats import app, mysql

ALLOWED_EXTENSIONS = ['png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG']

def allowed_file(filename):
	return '.' in filename and \
		filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def load_Weather():
	try:
		a = requests.get("https://api.openweathermap.org/data/2.5/weather?lat=43.047&lon=-79.278&appid=92f110be80c4067f7b841b2eadf6f922&units=metric").json()
		x = a["weather"][0]["main"]

		if x == 'Clouds':
			y = "https://openweathermap.org/img/wn/02d@2x.png"
		elif x == 'Clear':
			y = "https://openweathermap.org/img/wn/01d@2x.png"
		elif x == 'Thunderstorm':
			y = "https://openweathermap.org/img/wn/11d@2x.png"
		elif x == 'Drizzle':
			y = "https://openweathermap.org/img/wn/09d@2x.png"
		elif x == 'Rain':
			y = "https://openweathermap.org/img/wn/10d@2x.png"
		elif x == 'Snow':
			y = "https://openweathermap.org/img/wn/13d@2x.png"
		else:
			if x == 'Mist':
				y = "https://openweathermap.org/img/wn/50d@2x.png"
			elif x == 'Smoke':
				y = "https://openweathermap.org/img/wn/50d@2x.png"
			elif x == 'Haze':
				y = "https://openweathermap.org/img/wn/50d@2x.png"
			elif x == 'Dust':
				y = "https://openweathermap.org/img/wn/50d@2x.png"
			elif x == 'Fog':
				y = "https://openweathermap.org/img/wn/50d@2x.png"
			elif x == 'Sand':
				y = "https://openweathermap.org/img/wn/50d@2x.png"
			elif x == 'Ash':
				y = "https://openweathermap.org/img/wn/50d@2x.png"
			elif x == 'Squall':
				y = "https://openweathermap.org/img/wn/50d@2x.png"
			elif x == 'Tornado':
				y = "https://openweathermap.org/img/wn/50d@2x.png"
		z = round(float(a["main"]["temp"]))
	except:
		y = "https://openweathermap.org/img/wn/02d@2x.png"
		z = "12"

	return y, z

def load_RecentLocation():
	cur = mysql.connection.cursor()
	cur.execute("SELECT location, lat, lng FROM advents ORDER BY date_s DESC LIMIT 1")
	tmpInfo = cur.fetchone()

	tmpInfo = tmpInfo[0]

	cur.close()

	return tmpInfo

def load_Advents(val=0, lim=9999):
	cur = mysql.connection.cursor()
	cur.execute("SELECT * FROM advents ORDER BY id ASC LIMIT %s, %s", [val, lim])
	tmpInfo = cur.fetchall()

	cur.close()

	final = []

	for x in tmpInfo:
		x = list(x)
		x[3] = {"dir" : x[3], "files" : sorted(os.listdir("static/images/advents/" + x[3]))}
		final.append(x)

	return final

def load_Messages():
	cur = mysql.connection.cursor()
	cur.execute("SELECT * FROM messages")
	tmpInfo = cur.fetchall()

	cur.close()

	return tmpInfo

def load_Emergencies():
	cur = mysql.connection.cursor()
	cur.execute("SELECT * FROM emergencies")
	tmpInfo = cur.fetchall()

	cur.close()

	return tmpInfo

def load_userContent(userid):
	cur = mysql.connection.cursor()
	cur.execute("SELECT * FROM users WHERE id = %s", [userid])
	tmpInfo = cur.fetchall()
	username = tmpInfo[0][1]
	password = tmpInfo[0][2]

	cur.close()

	return User(userid, username, password)

def load_Daycations():
	dayc_list = []
	cur = mysql.connection.cursor()
	cur.execute("SELECT * FROM type")
	tmpInfo = cur.fetchall()

	for a in range(len(tmpInfo)):
		x = Daycation(tmpInfo[a][0], tmpInfo[a][1], tmpInfo[a][2], tmpInfo[a][3], tmpInfo[a][4], tmpInfo[a][5], tmpInfo[a][6], tmpInfo[a][7], tmpInfo[a][8], tmpInfo[a][9])
		dayc_list.append(x)

	cur.close()

	return dayc_list

main = Blueprint('main', __name__)

@main.route("/")
def homepage():
	images = os.listdir("static/images/hero/")
	daycations = load_Daycations()
	y, z = load_Weather()
	latlong = load_RecentLocation()

	return render_template('homepage.html', images=images, daycations=daycations, latlong=latlong, weat=y, temp=z)

@main.route("/booking")
def booking():
	daycations = load_Daycations()
	y, z = load_Weather()
	latlong = load_RecentLocation()

	return render_template("booking.html", daycations=daycations, latlong=latlong, weat=y, temp=z)

@main.route("/gallery")
def media():
	media_ls = []

	item_ls = os.listdir("static/images/media/")

	for x in item_ls:
		x_dup = x
		x = os.listdir("static/images/media/" + x)

		dict_add = {"header" : x_dup}
		dict_add["content"] = x

		media_ls.append(dict_add)

	y, z = load_Weather()
	latlong = load_RecentLocation()

	return render_template('media.html', media=media_ls, latlong=latlong, weat=y, temp=z)

@main.route("/gallery/<medtype>")
def mediatype(medtype):
	media_ls = []
	medtype = medtype.lower()

	item_ls = os.listdir("static/images/media/")

	if medtype not in item_ls:
		return "Error 404"

	for x in item_ls:
		dict_add = {"header" : x}
		x = os.listdir("static/images/media/" + x)
		x.sort()

		dict_add["content"] = x

		media_ls.append(dict_add)
	for x in media_ls:
		if medtype == x["header"]:
			y, z = load_Weather()
			latlong = load_RecentLocation()
			return render_template("gallery/" + medtype + ".html", mediat=x, latlong=latlong, weat=y, temp=z)

	return "Error 404"

@main.route("/daycations")
def daycations():
	daycations = load_Daycations()
	y, z = load_Weather()
	latlong = load_RecentLocation()
	return render_template('daycations.html', daycations=daycations, latlong=latlong, weat=y, temp=z)

@main.route("/ourcrew")
def ourcrew():
	y, z = load_Weather()
	latlong = load_RecentLocation()
	return render_template('contact/ourcrew.html', latlong=latlong, weat=y, temp=z)

@main.route("/ourboats")
def ourboats():
	y, z = load_Weather()
	latlong = load_RecentLocation()
	return render_template('contact/ourboats.html', latlong=latlong, weat=y, temp=z)

@main.route("/ouradventure")
def ouradventure():
	pins = load_Advents()
	advents = load_Advents(0, 5)
	y, z = load_Weather()
	latlong = load_RecentLocation()
	return render_template('ouradventure.html', pins=pins, advents=advents, latlong=latlong, weat=y, temp=z)

@main.route("/ouradventure_load", methods=['POST'])
def ouradventure_load():
	data = int(request.data)
	advents = load_Advents(data, 5)
	return jsonify(advents)

@main.route("/ouradventure_loadall", methods=['POST'])
def ouradventure_loadall():
	data = int(request.data)
	advents = load_Advents(data, 9999)
	return jsonify(advents)

@main.route('/addadventure', methods=['POST'])
@login_required
def addadventure():
	form = request.form
	td = form["date"]

	cur = mysql.connection.cursor()
	cur.execute("SELECT * FROM advents WHERE date_s = %s", [td])
	if cur.rowcount != 0:
		return "Same Date As Adventure In Timeline"
	cur.close()

	lat = form["lat"]
	long = form["long"]
	location = form["location"]
	desc = form["description"]
	yt = None
	if form["youtube"]:
		yt = form["youtube"]
	instagram = None
	if form["instagram"]:
		instagram = form["instagram"]
	twitch = None
	if form["facebook"]:
		twitch = form["facebook"]

	if request.method == 'POST':
		files = request.files
		flag = False
		for num, file in enumerate(files):
			file = request.files[file]
			if file.filename == '':
				flag = True
				continue
			if file and allowed_file(file.filename):
				filename = secure_filename(file.filename)
				if not os.path.exists("/home/nate/charterboats/static/images/advents/" + td):
					os.makedirs("/home/nate/charterboats/static/images/advents/" + td)
				file.save("/home/nate/charterboats/static/images/advents/" + td + "/" + str(num) + filename)
				continue
			else:
				return "Filetype Not Allowed"
	else:
		return "Get"

	cur = mysql.connection.cursor()
	cur.execute("INSERT INTO advents (date_s, med_folder, yt, instagram, twitch, location, lat, lng, descr) VALUES (%s, %s, IFNULL(%s, 'https://www.youtube.com'), IFNULL(%s, 'https://www.youtube.com'), IFNULL(%s, 'https://www.youtube.com'), %s, %s, %s, %s)", [td, td, yt, instagram, twitch, location, lat, long, desc])
	mysql.connection.commit()
	cur.close()

	return redirect(url_for('main.admin'))

@main.route("/contact")
def contactus():
	y, z = load_Weather()
	latlong = load_RecentLocation()
	return render_template("contact.html", latlong=latlong, weat=y, temp=z)

@main.route("/contact/sendamessage", methods=["GET", "POST"])
def sendmessage():
	if request.method == 'POST':
		form = request.form

		fname = request.form["fullname"]
		email = request.form["email"]
		mssg = request.form["message"]

		regex = re.compile('[@!#$%^&*()<>?/\|}{~:]')
		if regex.search(mssg) != None:
			return "Please remove special characters and try again."

		sender = "nate@nauticalescapes2021.com"
		receivers = ["alexander.foster.mcculloch@gmail.com"]

		message = """Subject: Test SMTP Email

		Name : {fname}
		Email : {email}
		Message : {mssg}
		""".format(fname=fname, email=email, mssg=mssg)

		with smtplib.SMTP("localhost", 25) as smtp:
			smtp.sendmail(sender, receivers, message)

	y, z = load_Weather()

	return render_template("contact/message.html", weat=y, temp=z)

@main.route("/contact/social")
def social():
	y, z = load_Weather()
	latlong = load_RecentLocation()
	return render_template("contact/social.html", latlong=latlong, weat=y, temp=z)

@main.route("/contact/faq")
def faq():
	y, z = load_Weather()
	latlong = load_RecentLocation()
	return render_template("contact/faq.html", latlong=latlong, weat=y, temp=z)

@main.route("/contact/licensing")
def lic():
	y, z = load_Weather()
	latlong = load_RecentLocation()
	return render_template("contact/lic.html", latlong=latlong, weat=y, temp=z)

@main.route("/contact/booking", methods=["POST"])
def sendbooking():
	if request.method == 'POST':
		form = request.form

		date = request.form["date"]
		occup = request.form["occupants"]
		ammen = request.form["ammenities"]
		fname = request.form["fullname"]
		mobile = request.form["mobile"]
		email = request.form["email"]
		mssg = request.form["descr"]

		regex = re.compile('[@!#$%^&*()<>?/\|}{~:]')
		if regex.search(mssg) != None:
			return "Please remove special characters and try again."
		if regex.search(ammen) != None:
			return "Please remove special characters and try again."

		sender = "nate@nauticalescapes2021.com"
		receivers = ["alexander.foster.mcculloch@gmail.com"]

		message = """Subject: Test SMTP Email

		Daycation / Booking Information

		Daycation Type : Type
		Daycation Date : {date}
		Occupants : {occup}
		Ammenities : {ammen}

		Contact Information

		Name : {fname}
		Email : {email}
		Mobile : {mobile}
		Additional Information : {mssg}
		""".format(fname=fname, email=email, mobile=mobile, mssg=mssg, date=date, occup=occup, ammen=ammen)

		with smtplib.SMTP("localhost", 25) as smtp:
			smtp.sendmail(sender, receivers, message)

	return redirect(url_for('main.homepage'))

@main.route("/login", methods=['GET', 'POST'])
def login():
	if current_user.is_authenticated:
		return redirect(url_for('main.homepage'))
	else:
		if request.method == 'POST':
			username = request.form.get("username")
			cur = mysql.connection.cursor()
			cur.execute("SELECT * FROM users WHERE username = %s", [username])
			if cur.rowcount == 0:
				return "NOT IN DATABASE"
				#flash("Username not in database")
				#return redirect(url_for('main.homepage'))
			cur.close()

			cur = mysql.connection.cursor()
			cur.execute("SELECT id FROM users WHERE username = %s", [username])
			(thisUserId, ) = cur.fetchone()
			cur.close()

			cur = mysql.connection.cursor()
			cur.execute("SELECT password FROM users WHERE id = %s", [thisUserId])
			(passCheck, ) = cur.fetchone()
			cur.close()

			password = request.form.get("password")

			if not check_password_hash(passCheck, password):
				return "Wrong Password"
				#flash("Incorrect Password")
				#return redirect(url_for('main.homepage'))

			user = load_userContent(thisUserId)

			login_user(user)

			return redirect(url_for('main.homepage'))

		else:
			return render_template("admin/login.html")

@main.route("/signup", methods=['GET', 'POST'])
def signup():
	if request.method == 'POST':
		username = request.form.get("username")
		password = request.form.get("password")
		pass_hash = generate_password_hash(password)

		cur = mysql.connection.cursor()
		cur.execute("INSERT INTO users (username, password) VALUES (%s, %s)", [username, pass_hash])
		mysql.connection.commit()
		cur.close()

		return redirect(url_for('main.homepage'))
	else:
		return render_template("admin/signup.html")

@main.route("/logout")
@login_required
def logout():
	logout_user()
	return redirect(url_for('main.homepage'))

@main.route("/trip_check", methods=['POST'])
def trip_check():
	data = request.get_json()
	cur = mysql.connection.cursor()
	date= data["date_s"]
	cur.execute("SELECT * FROM trips WHERE date = %s", [date])
	tmp = cur.rowcount
	cur.close()
	if tmp > 0:
		return jsonify(status="False")
	else:
		return jsonify(status="True")

@main.route("/book_trip", methods=["POST"])
def  book_trip():
	if request.method == 'POST':
		form = request.form
		date = form["charter_date"]
		occup = form["charter_occup"]
		type = form["charter_type"]

		cur = mysql.connection.cursor()
		cur.execute("INSERT INTO trips (type, date, days, occup, location, status) VALUES (%s, %s, 1, %s, 'Port Colborne, Ontario, Canada', 'Started')", [type, date, occup])

		mysql.connection.commit()
		cur.close()

		return redirect(url_for('main.homepage'))

@main.route("/admin")
@login_required
def admin():
	emergencies = load_Emergencies()
	messages = load_Messages()
	y, z = load_Weather()
	latlong = load_RecentLocation()
	return render_template("admin/admin.html", messages=messages, emergencies=emergencies, latlong=latlong, weat=y, temp=z)

@main.route("/admin", methods=["POST"])
@login_required
def admin_post():
	if request.method == 'POST':
		if request.form["location"] == '':
			return "Please enter what type of images you have uploaded"
		files = request.files
		flag = False
		for num, file in enumerate(files):
			file = request.files[file]
			if file.filename == '':
				flag = True
				continue
			if file and allowed_file(file.filename):
				filename = secure_filename(file.filename)
				file.save("/home/nate/charterboats/static/images/media/" + request.form["location"] + "/" + str(num) + filename)
				continue
			else:
				return "Some Unkown Error"
		return redirect(url_for('main.admin'))
	else:
		return "Get"

@main.route("/admin_msg", methods=["POST"])
@login_required
def admin_msg():
	if request.method == 'POST':
		cur = mysql.connection.cursor()
		cur.execute("INSERT INTO messages (person, date, msg) VALUES ('Alex', NOW(), %s)", [request.form["message"]])
		mysql.connection.commit()
		cur.close()

		return redirect(url_for('main.admin'))
	else:
		return "GET"

@main.route("/admin_eme", methods=["POST"])
@login_required
def admin_eme():
	if request.method == 'POST':
		cur = mysql.connection.cursor()
		cur.execute("INSERT INTO emergencies (person , date, message) VALUES ('Alex', NOW(), %s)", [request.form["message"]])
		mysql.connection.commit()
		cur.close()

		return redirect(url_for('main.admin'))
	else:
		return "GET"
