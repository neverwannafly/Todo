class UsersController < ApplicationController

  def create
    @user = User.new user_params
    @user.token = generate_token
    @user.role = Role.find(params[:user][:role_id])
    if @user.role && @user.role.authenticate(params[:user][:role_token])
      if @user.save
        render json: {
          :success => true,
          :user => {
            :id => @user.id,
            :name => @user.name,
            :email => @user.email,
            :token => @user.token,
            :username => @user.username,
          }
        }
      else
        render json: {
          :success => false,
          :error => @user.errors.full_messages,
        }
      end
    else
      render json: {
        :success => false,
        :error => "Invalid access token or Role ID",
      }
    end
  end

  def profile
    @user = User.find(params[:id])
  end

  def upload
    @user = User.find(params[:id])
    @user.resume.attach(params[:user][:resume])
    @user.save
    redirect_to upload_path, notice: "Resume uploaded Successfully!"
  end

  def fetch
    users = User.where "username like ?", "%#{params[:query]}%"
    render json: users
  end

private

  def user_params
    params.require(:user).permit(:password, :password_confirmation, :email, :name, :username)
  end

end
