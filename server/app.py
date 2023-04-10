from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
import jwt
import datetime
from dotenv import load_dotenv
import os
from flask_mail import Mail, Message
from bson.objectid import ObjectId
from flask_cors import CORS
import json
from general_quiz import general_bp

app = Flask(__name__)

CORS(app)

load_dotenv()
bcrypt = Bcrypt(app)
app.register_blueprint(general_bp)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

app.config.from_pyfile('Mailconfig.py')
mail = Mail(app)

mongo_uri = os.environ.get('DATABASE_URL')
client = MongoClient(mongo_uri)
db = client.Quiz_App

# user starts
user_collection = db.users
front_url = "http://localhost:3000/"

#Create token
def create_token(user_email,user_id):
    payload = {'user_id': str(user_id),'user_email': str(user_email), 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)}
    token = jwt.encode(payload, app.config['SECRET_KEY'])
    return token

#Login
@app.route('/login', methods=['POST'])
def login():
    user = user_collection.find_one({'email': request.json['email']})
    if user and bcrypt.check_password_hash(user['password'], request.json['password']):
        if user['isverified']:
            token = create_token(user['email'],str(user['_id']))
            return jsonify({'token': token,'message':'User Loggedin Successfully','user_id':str(user['_id']),'user_email':str(user['email']),'isverified':str(user['isverified'])}), 200
        else:
            return jsonify({'message':'Please verify your email to login'})
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

#Signup 
@app.route('/signup', methods=['POST'])
def signup():
    user = user_collection.find_one({'email': request.json['email']})
    if user:
        return jsonify({'message': 'User already exists'}), 400
    else:
        password = bcrypt.generate_password_hash(request.json['password']).decode('utf-8')
        data = {
           'email': request.json['email'], 
           'password': password,
           'phone':request.json['phone'],
           'name':request.json['name'],
           'isverified':False,
           'profile_pic':request.json["profile_pic"]
           }
        user_id = user_collection.insert_one(data)
        token = create_token(request.json['email'],str(user_id.inserted_id))

        # send_verification_email(request.json['email'], token)

        return jsonify({'token': token,'message':'User created Successfully'}), 201

#Send verification mail
def send_verification_email(email, token):
    msg = Message('Confirm Your Email Address', recipients=[email])
    verify_link = request.url_root + 'verify/' + token
    msg.body = f'Please click on this link to verify your email address: {verify_link}'
    mail.send(msg)

#Verify mail
@app.route('/verify/<token>')
def verify_email(token):
    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        user_email = payload['user_email']
        user_collection.update_one({'email': user_email}, {'$set': {'isverified': True}})
        return jsonify({'email':user_email,'_id':str(payload['user_id'])}),200
    
    except jwt.ExpiredSignatureError:
        return jsonify({'message':'Confirmation link has expired.'}), 400
    
    except (jwt.DecodeError, jwt.InvalidTokenError):
        return jsonify({'message':'Invalid confirmation link.'}), 400

#Resend verify mail
@app.route('/resendverifymail',methods=['POST'])
def resendverifyMail():
    try:
        email =  request.json['email']
        user = user_collection.find_one({'email': request.json['email']})
        userid = str(user['_id'])
        token = create_token(email,userid)
        # send_verification_email(email,token)
        return jsonify({'message':'Resend verification mail successfull'}), 200 
    except:
        return jsonify({'message':'Error while sending the verification mail'}), 400
    
#Forgotpassword   
@app.route('/forgotpassword',methods=['POST'])
def forgotpassword():
    try:
        user = user_collection.find_one({'email': request.json['email']})
        if user:
            token = create_token(request.json['email'],str(user['_id']))
            send_forgotpassword_email(request.json['email'],token)
            return jsonify({'message':'Change password link send to your email'}), 200
        else:
            return jsonify({'message':'No User Found!'}), 404
    except:
        return jsonify({'message':'Error while sending the change password link'}), 400

#Send forgotpassword mail
def send_forgotpassword_email(email, token):
    msg = Message('Change your password', recipients=[email])
    verify_link = front_url + 'changepassword/' + token
    msg.body = f'Please click on this link to change your password: {verify_link}'
    mail.send(msg)

#Change the password
@app.route('/changepassword/<token>', methods=['GET','POST'])
def forgotpassword_link(token):
    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
    
    except jwt.ExpiredSignatureError:
        return jsonify({'message':'Confirmation link has expired.'}), 400
    
    except (jwt.DecodeError, jwt.InvalidTokenError):
        return jsonify({'message':'Invalid confirmation link.'}), 400
    
    if request.method == 'POST':
        try:
            user_email = payload['user_email']
            user = user_collection.find_one({'email': user_email})
            if bcrypt.check_password_hash(user['password'], request.json['password']):
                return jsonify({'message':'Old password canot be your new password'}), 400
            else:
                password = bcrypt.generate_password_hash(request.json['password']).decode('utf-8')
                user_collection.update_one({'email': user_email}, {'$set': {'password': password}})
                return jsonify({'message':'Password changed successfully'}), 200
        except:
            return jsonify({'message':'Error while updating the password'}), 400
    
    return jsonify({'message':'Change Password'})

# Change Password
@app.route('/change_password/<email>', methods=['PUT'])
def change_password(email):
    user_email = email
    user = user_collection.find_one({'email': user_email})
    if user and bcrypt.check_password_hash(user['password'], request.json['old_password']):
        if bcrypt.check_password_hash(user['password'], request.json['new_password']):
            return jsonify({'message':'Old password cant be your new password'})
        else:
            new_password = bcrypt.generate_password_hash(request.json['new_password']).decode('utf-8')
            user_collection.update_one({'email': user_email}, {'$set': {'password': new_password}})
            return jsonify({'message': 'Password changed successfully'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

        
#Get user profile
@app.route('/profile/<email>',methods=["GET"])
def profile(email):
    try:
        user = user_collection.find_one({'email':email},{'_id':0})
        return jsonify({'message':'Profile got successfully','user':str(user)}), 200
    except:
        return jsonify({'message':'Error while geting the user'}), 400
    
# Update user profile
@app.route('/update_profile/<email>', methods=["PUT"])
def update_profile(email):
    try:
        user = user_collection.find_one({'email': email})
        if not user:
            return jsonify({'message': 'User not found'}), 404

        user_collection.update_one({'email': email}, {'$set': request.json})

        return jsonify({'message': 'Profile updated successfully'}), 200
    except:
        return jsonify({'message': 'Error while updating the user'}), 400

#Get user name   
@app.route('/get_name', methods=['POST'])
def get_name():
    email = request.json['email']
    user = user_collection.find_one({'email': email})
    if user:
        name = user['name']
        profile_pic = user['profile_pic']
        return jsonify({'name': name,'profile_pic':profile_pic}), 200
    else:
        return jsonify({'message': 'User not found'}), 404

#Quiz starts
quiz_collection = db.quiz

#Add Quiz
@app.route('/addquiz',methods=['POST'])
def addquiz():
    try:
        quiz_data = request.json['Quiz']
        quiz_id = quiz_collection.insert_one(quiz_data)

        return jsonify({'message':'Quiz added Successfully','quiz_id':str(quiz_id.inserted_id)}), 200
    except:
        return jsonify({'message':'Error while adding Quiz'})

#Get Quiz
@app.route('/quiz/<quiz_id>', methods=['GET'])
def get_quiz(quiz_id):
    try:
        quiz = quiz_collection.find_one({'_id': quiz_id})

        if quiz:
            return jsonify({'message':'Quiz got successfully','Quiz':quiz}), 200
        
        else:
            return jsonify({'message':'No quiz found','Quiz':quiz}), 404
        
    except:
        return jsonify({'message':'Error while getting the quiz'}), 400

#Update quiz
@app.route('/updatequiz/<quiz_id>',methods=['PUT','GET'])
def update_quiz(quiz_id):    
    if request.method == 'PUT':
        quiz = request.json['Quiz']
        try:
            update_quiz = quiz_collection.update_one({'_id':quiz_id}, {'$set': quiz})
            return jsonify({'message':'Quiz got updated successfully'}), 200
        except:
            return jsonify({'message':'Error while updating the quiz'}), 400
        
    try:
        quiz = quiz_collection.find_one({'_id':quiz_id})
        if quiz:
            return jsonify({'message':'Quiz got successfully','Quiz':str(quiz)}), 200
        else:
            return jsonify({'message':'No quiz found'}), 404
    except:
        return jsonify({'message':'Error while retrying the Quiz'}), 400
    
#Delete quiz
@app.route('/deletequiz/<quiz_id>', methods=['DELETE'])
def delete_quiz(quiz_id):
    try:
        result = quiz_collection.delete_one({'_id': quiz_id})
        print(result.deleted_count)
        if result.deleted_count > 0:
            return jsonify({'message': 'Quiz deleted successfully'}), 200
        else:
            return jsonify({'message': 'No quiz found with the given ID'}), 404
    except:
        return jsonify({'message': 'Error while deleting quiz'}), 500

#Get all Quiz of email
@app.route('/editquiz/<email>', methods=['GET'])
def get_user_quiz(email):
    try:
        quizzes = quiz_collection.find({'user_email': email})
        if quizzes:
            quiz_list = []
            for quiz in quizzes:
                quiz['_id'] = str(quiz['_id'])
                quiz_list.append(quiz)
            if quiz_list:
                return jsonify({'message': f'Quizzes retrieved successfully for {email}', 'Quizzes': quiz_list}), 200
            else:
                return jsonify({'message': f'No quizzes found for {email}'}), 404
        else:
            return jsonify({'message': f'Error while getting the quizzes'}), 400
    except:
        return jsonify({'message':'Error while getting the quizzes'}), 400

    
#score starts
score_collection = db.score

# Update or add score
@app.route('/score', methods=['POST'])
def add_score():
    try:
        # Get score data from request
        score_data = request.json['Score']

        # Query score collection for existing document with matching user email and quiz id
        existing_score = score_collection.find_one({
            'user_email': score_data['user_email'],
            'quiz_id': score_data['quiz_id']
        })

        if existing_score:
            # If document exists, update score and time values
            score_collection.update_one({
                '_id': existing_score['_id']
            }, {
                '$set': {
                    'score': score_data['score'],
                    'time': score_data['time'],
                    'max_score':score_data['max_score'],
                    'max_time':score_data['max_time'],
                    'name':score_data['name'],
                    'profile_pic':score_data['profile_pic']
                }
            })

            message = 'Score updated successfully'
        else:
            # If document doesn't exist, insert new document for user's score
            score_id = score_collection.insert_one(score_data)

            message = 'Score added successfully'

        return jsonify({'message': message}), 200
    except:
        return jsonify({'message': 'Error while adding score'}), 400

    
#Get score
@app.route('/leaderboard/<quiz_id>',methods=['GET'])
def leaderboard(quiz_id):
    try:
        score = score_collection.find({'quiz_id': quiz_id},{'_id': 0}).sort([('score', -1), ('time', 1)])
        if score:
            score_list = []
            for scores in score:
                score_list.append(scores)

            return jsonify({'message':'leaderboard got successfully','scores':str(score_list)}), 200
        
        else:
            return jsonify({'message':'No quiz found'}), 404
        
    except:
        return jsonify({'message':'Error while getting the leaderboard'}), 400
    

#data collection
data_collection = db.data

@app.route('/get_profile_image',methods=['GET'])
def get_profile_image():
    document = data_collection.find_one({"_id": "Images"},{"_id":0})
    if document:
        return jsonify({"message":"Success","data":document})
    else:
        return jsonify({"message":"No document found with the id 'Profile_Image'"})

if __name__ == '__main__':
 app.run(debug=True)
